const EmitEvent = require("../event_helpers/Emitters");
const Singleton = require("../queue_helpers/Singleton");

const EnqueueTask = (task) => {
	const taskQueue = Singleton.getQueue();
	const res = taskQueue.enqueue(task);

	if (res === null) {
		return false;
	}
	EmitEvent("invoke_worker");
	return true;
};

module.exports = EnqueueTask;
