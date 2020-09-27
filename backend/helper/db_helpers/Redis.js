const Redis_ = require("redis");

class Redis {
	constructor() {
		this._initialize();
	}

	_initialize = () => {
		this.redis = Redis_.createClient(process.env.REDIS_URL, {
			retry_strategy: this._retryStrategy,
		});
		this.redis.on("connect", () =>
			console.log("Redis connection established.")
		);
		this.redis.on("error", (e) => console.log(e));
	};

	_retryStrategy = (options) => {
		if (options.error && options.error.code === "ECONNREFUSED") {
			return new Error("The server refused the connection");
		}
		if (options.total_retry_time > 1000 * 60 * 60) {
			return new Error("Retry time exhausted");
		}
		if (options.attempt > 10) {
			// End reconnecting with built in error
			return undefined;
		}
		// reconnect after
		return Math.min(options.attempt * 100, 3000);
	};

	updateTaskList = (taskId, createdAt) => {
		this.redis.zadd(["tasklists", createdAt, taskId], (err, res) => {});
	};

	removeFromTaskList = (taskId) => {
		this.redis.zrem("tasklists", taskId, (err, res) => {});
	};

	getTaskList = () =>
		new Promise((resolve, reject) => {
			this.redis.zcard("tasklists", (number) => {
				this.redis.zrevrange("tasklists", 0, number, (err, res) => {
					if (err) resolve(false);
					else resolve(res);
				});
			});
		});

	addTask = (task) => {
		let { taskId, createdAt } = task;
		this.redis.hmset(taskId, task, (err, res) => {
			if (res) {
				this.updateTaskList(taskId, createdAt);
			}
		});
	};

	deleteTask = (taskId) =>
		new Promise((resolve, reject) => {
			this.redis.del(taskId, (err, res) => {
				if (res) {
					this.removeFromTaskList(taskId);
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});

	updateTask = (task) => {
		let { taskId } = task;
		this.redis.hmset(taskId, task, (err, res) => {});
	};

	getTask = (taskId) =>
		new Promise((resolve, reject) => {
			this.redis.hgetall(taskId, (err, hash) => {
				if (hash) {
					resolve(hash);
				} else {
					resolve(false);
				}
			});
		});

	getAllTask = () =>
		new Promise(async (resolve, reject) => {
			let taskList = await this.getTaskList();
			if (!taskList) {
				reject("Error: Redis fetch failed");
			} else {
				for (let i = 0; i < taskList.length; i++) {
					this.redis.hgetall(taskList[i], (err, hash) => {
						err ? (taskList[i] = null) : (taskList[i] = hash);
					});
				}
				resolve(taskList);
			}
		});
}

module.exports = Redis;
