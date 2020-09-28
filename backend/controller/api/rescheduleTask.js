const router = require("express").Router();
const EnqueueTask = require("../../helper/task_helpers/EnqueueTask");
const Singleton = require("../../helper/db_helpers/Singleton");
const db = Singleton.getDb();

router.post("/:id", async (req, res) => {
	let taskId = req.params.id;
	if (taskId) {
		let obj = await db.getTask(taskId);
		if (obj) {
			obj.status = "Queue";
			obj.priorityLevel = 1;
			await db.updateTask(obj);
			const done = EnqueueTask(obj);

			if (done) {
				return res.status(200).send({
					ok: true,
				});
			}
		}
		return res.status(200).send({
			ok: false,
		});
	}
	return res.status(401).send({
		ok: false,
		error: "Reschedule request failed",
	});
});

module.exports = router;
