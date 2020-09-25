const { EventEmitter } = require("events");
const { Worker, MessageChannel } = require("worker_threads");

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

	// terminate and re-initialize worker
	terminateAndReinitializeWorker(workerToTerminate) {
		workerToTerminate.terminate();
		const worker = new Worker(this.script, {});
		this.pool.push({
			status: WORKER_STATUS.IDLE,
			worker,
		});
	}

	// Return one idle worker from the pool
	getIdleWorker() {
		const idleWorker = this.pool.find(
			(w) => w.status === WORKER_STATUS.IDLE
		);
		if (idleWorker) return idleWorker.worker;
		return null;
	}

	/**
	 * Set worker's status to idle
	 * @param {Worker} worker
	 */
	setWorkerIdle(worker) {
		const currWorker = this.pool.find((w) => w.worker === worker);
		if (currWorker) {
			currWorker.status = WORKER_STATUS.IDLE;
		}
	}

	/**
	 * Set worker's status to busy
	 * @param {Worker} worker
	 */
	setWorkerBusy(worker) {
		const currWorker = this.pool.find((w) => w.worker === worker);
		if (currWorker) {
			currWorker.status = WORKER_STATUS.BUSY;
		}
	}

	/**
	 * Run worker script with the provided argument
	 * @param {*} data
	 * @param {Function} cb
	 */
	executeTask(getTask, cb) {
		const worker = this.getIdleWorker();

		if (worker !== null) {
			const data = getTask();
			if (data) {
				this.setWorkerBusy(worker);
				const { port1, port2 } = new MessageChannel();
				worker.postMessage({ task, port: port1 }, [port1]);
				port2.once("message", (result) => {
					this.setWorkerIdle(worker);
					cb(null, result, data);
				});
				port2.once("error", (err) => {
					this.setWorkerIdle(worker);
					cb(err, null, data);
				});
			}
			return true;
		}
	}
};
