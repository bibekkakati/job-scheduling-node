const router = require("express").Router();
const Singleton = require("../../helper/db_helpers/Singleton");
const redis = Singleton.getRedis();

router.delete("/:id", async (req, res) => {
	let taskId = req.params.id;
	if (taskId) {
		let res = await redis.deleteTask(taskId);
		return res.status(200).send({
			ok: res,
		});
	}
	return res.status(401).send({
		ok: false,
		error: "Deletion failed",
	});
});

module.exports = router;
