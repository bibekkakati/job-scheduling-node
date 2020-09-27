const { EventEmitter } = require("events");
const { Worker, MessageChannel } = require("worker_threads");
const Singleton = require("../helper/db_helpers/Singleton");
const redis = Singleton.getRedis();

const WORKER_STATUS = {
	IDLE: Symbol("idle"),
	BUSY: Symbol("busy"),
};

module.exports.WorkerPool = class WorkerPool extends EventEmitter {
	constructor(script, size) {
		super();
		this.script = script;
		this.size = size;
		this.pool = [];
		this.workerTaskMap = [];
		this._initialize();
	}

	// Create an initialize workers of the worker pool
	_initialize() {
		for (let i = 0; i < this.size; i++) {
			const worker = new Worker(this.script, {});
			this.pool.push({
				status: WORKER_STATUS.IDLE,
				worker,
			});
			worker.once("exit", () => {
				this.emit(`worker ${worker.threadId} terminated`);
			});
		}
	}

	// abort task
	abortTask(taskId) {
		for (let i = 0; i < this.workerTaskMap; i++) {
			if (this.workerTaskMap[i].task[taskId] === taskId) {
				return this.terminateAndReinitializeWorker(
					this.workerTaskMap[i]
				);
			}
		}
		return false;
	}

	// terminate and re-initialize worker
	terminateAndReinitializeWorker({ task, worker }) {
		worker.terminate();
		task.priorityLevel = 0;
		task.status = "Abort";
		redis.updateTask(task);
		const newWorker = new Worker(this.script, {});
		this.pool.push({
			status: WORKER_STATUS.IDLE,
			worker: newWorker,
		});
		return true;
	}

	// Return one idle worker from the pool
	getIdleWorker() {
		const idleWorker = this.pool.find(
			(w) => w.status === WORKER_STATUS.IDLE
		);
		if (idleWorker) return idleWorker.worker;
		return null;
	}

	// Set worker's status to idle
	setWorkerIdle(worker) {
		const currWorker = this.pool.find((w) => w.worker === worker);
		if (currWorker) {
			currWorker.status = WORKER_STATUS.IDLE;
		}
	}

	// Set worker's status to busy
	setWorkerBusy(worker) {
		const currWorker = this.pool.find((w) => w.worker === worker);
		if (currWorker) {
			currWorker.status = WORKER_STATUS.BUSY;
		}
	}

	// map worker's to task
	mapWorkerTask(worker, task) {
		this.workerTaskMap.push({
			task,
			worker,
		});
	}

	// unmap worker's to task
	unmapWorkerTask(worker, task) {
		const idx = this.workerTaskMap.indexOf({
			task,
			worker,
		});
		if (idx >= 0) this.workerTaskMap.splice(idx, 1);
	}

	// Run worker script with the provided argument
	executeTask(getTask, cb) {
		const worker = this.getIdleWorker();

		if (worker !== null) {
			const task = getTask();
			if (task) {
				task.status = "Run";
				redis.updateTask(task);
				this.setWorkerBusy(worker);
				this.mapWorkerTask(worker, task);
				const { port1, port2 } = new MessageChannel();
				worker.postMessage({ task, port: port1 }, [port1]);
				port2.once("message", (result) => {
					this.unmapWorkerTask(worker, task);
					this.setWorkerIdle(worker);
					cb(null, result, task);
				});
				port2.once("error", (err) => {
					this.unmapWorkerTask(worker, task);
					this.setWorkerIdle(worker);
					cb(err, null, task);
				});
			}
		}
	}
};
