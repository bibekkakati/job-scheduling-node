const Singleton_queue = require("../queue_helpers/Singleton");
const Singleton_worker = require("../../worker/Singleton");
const EnqueueTask = require("../task_helpers/EnqueueTask");
const Singleton = require("../db_helpers/Singleton");
const taskQueue = Singleton_queue.getQueue();
const workerPool = Singleton_worker.getPool();
const db = Singleton.getDb();

const invokeWorker = () => {
	const uTask = taskQueue.dequeue;
	workerPool.executeTask(uTask, (err, result, task) => {
		if (err) {
			if (task.halt < 2 && task.halt >= 0) {
				task.halt = task.halt++;
				task.priorityLevel = 10;
				task.status = "Queue";
				EnqueueTask(task);
				db.updateTask(task);
			} else {
				task.priorityLevel = 1;
				task.status = "Abort";
				db.updateTask(task);
			}
		} else if (result) {
			db.deleteTask(task.taskId);
		}
		invokeWorker();
	});
};

module.exports = {
	invokeWorker,
};
