const Singleton_queue = require("../queue_helpers/Singleton");
const Singleton_worker = require("../../worker/Singleton");
const EnqueueTask = require("../task_helpers/EnqueueTask");

const invokeWorker = () => {
	const taskQueue = Singleton_queue.getQueue();
	const workerPool = Singleton_worker.getPool();
	const task = taskQueue.dequeue;
	workerPool.executeTask(task, (err, result, task) => {
		if (err) {
			if (task.halt < 2 && task.halt >= 0) {
				task.halt = task.halt++;
				task.priorityLevel = 10;
				EnqueueTask(task);
			}
		} else if (result) {
			//TODO: mark the task success in database
		}
	});
};

module.exports = {
	invokeWorker,
};
