const Singleton_queue = require("../queue_helpers/Singleton");
const Singleton_worker = require("./Singleton");
const ExecuteTask = require("../task_helpers/ExecuteTask");

const invokeWorker = (task) => {
	const taskQueue = Singleton_queue.getQueue();
	const workerPool = Singleton_worker.getPool();
	const ok = workerPool.executeTask(task, (err, result, task) => {
		if (err) {
			if (task.halt < 2 && task.halt >= 0) {
				task.halt = task.halt++;
				task.priorityLevel = 10;
				taskQueue.enqueue(task);
			}
		} else if (result) {
			//TODO: mark the task success in database
		}
		const newTask = taskQueue.dequeue();
		ExecuteTask(newTask);
	});
	return ok;
};

module.exports = {
	invokeWorker,
};
