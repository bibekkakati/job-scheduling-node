const router = require("express").Router();
const EnqueueTask = require("../../helper/task_helpers/EnqueueTask");
const Singleton = require("../../helper/db_helpers/Singleton");
const redis = Singleton.getRedis();

router.post("/:id", async (req, res) => {
	let taskId = req.params.id;
	if (taskId) {
		let task = await redis.getTask(taskId);
		if (task) {
			const done = EnqueueTask(task);

			if (done) {
				task.status = "Queue";
				redis.updateTask(task);
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
