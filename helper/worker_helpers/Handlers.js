const Singleton_queue = require("../queue_helpers/Singleton");
const Singleton_worker = require("../../worker/Singleton");
const EnqueueTask = require("../task_helpers/EnqueueTask");
const Singleton = require("../../helper/db_helpers/Singleton");
const taskQueue = Singleton_queue.getQueue();
const workerPool = Singleton_worker.getPool();
const redis = Singleton.getRedis();

const invokeWorker = () => {
	const task = taskQueue.dequeue;
	workerPool.executeTask(task, (err, result, task) => {
		if (err) {
			if (task.halt < 2 && task.halt >= 0) {
				task.halt = task.halt++;
				task.priorityLevel = 10;
				task.status = "Queue";
				EnqueueTask(task);
				redis.updateTask(task);
			} else {
				task.priorityLevel = 0;
				task.status = "Abort";
				redis.updateTask(task);
			}
		} else if (result) {
			redis.deleteTask(task.taskId);
		}
		invokeWorker();
	});
};

module.exports = {
	invokeWorker,
};
