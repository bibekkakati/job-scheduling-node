const Singleton = require("../queue_helpers/Singleton");
const { invokeWorker } = require("../worker_helpers/Handlers");

const ExecuteTask = (task) => {
	const ok = invokeWorker(task);
	if (ok) {
		// TODO: mark it as running
		return ok;
	} else {
		const taskQueue = Singleton.getQueue();
		const res = taskQueue.enqueue(task);
		return res;
	}
};

module.exports = ExecuteTask;
