const CreateTask = require("../../helper/task_helpers/CreateTask");
const EnqueueTask = require("../../helper/task_helpers/EnqueueTask");
const router = require("express").Router();
const Singleton = require("../../helper/db_helpers/Singleton");
const db = Singleton.getDb();

router.post("/", async (req, res) => {
	let priorityLevel;
	try {
		priorityLevel = parseInt(req.body.priorityLevel);
		if (isNaN(priorityLevel)) priorityLevel = 1;
	} catch (error) {
		priorityLevel = 1;
	}

	const task = CreateTask(priorityLevel);
	task.status = "Queue";
	await db.addTask(task);
	const done = EnqueueTask(task);

	if (done) {
		return res.status(200).send({
			ok: true,
			task,
		});
	}
	return res.status(401).send({
		ok: false,
		error: "Enqueue Failed",
	});
});

module.exports = router;
