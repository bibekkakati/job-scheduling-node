const { invokeWorker } = require("../worker_helpers/Handlers");
const Singleton = require("../queue_helpers/Singleton");

const EnqueueTask = (task) => {
	const taskQueue = Singleton.getQueue();
	const res = taskQueue.enqueue(task);
	if (res === null) {
		return false;
	}
	invokeWorker();
	return true;
};

module.exports = EnqueueTask;
