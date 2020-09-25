const CreateTask = require("../../helper/task_helpers/CreateTask");
const ExecuteTask = require("../../helper/task_helpers/ExecuteTask");
const router = require("express").Router();

router.post("/", (req, res) => {
	let priorityLevel;
	try {
		priorityLevel = parseInt(req.body.priorityLevel);
		if (isNaN(priorityLevel)) priorityLevel = 1;
	} catch (error) {
		priorityLevel = 1;
	}

	const task = CreateTask(priorityLevel);

	const done = ExecuteTask(task);

	if (done) {
		return res.status(200).send({
			ok: true,
			status: "Create",
		});
	}
	return res.statusCode(401).send({
		ok: false,
		error: "Enqueue Failed",
	});
});

module.exports = router;
