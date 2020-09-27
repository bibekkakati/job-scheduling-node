const Singleton = require("../../worker/Singleton");
const workerPool = Singleton.getPool();

const AbortTask = (taskId) => {
	return workerPool.abortTask(taskId);
};

module.exports = AbortTask;
