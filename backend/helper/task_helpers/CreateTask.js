const { v1: uuidv1 } = require("uuid");

const CreateTask = (priorityLevel) => {
	const taskId = uuidv1();
	const task = {
		taskId,
		priorityLevel,
		halt: 0,
		status: "Create",
		createdAt: Date.now(),
		timeInMs: 5000,
	};
	return task;
};

module.exports = CreateTask;
