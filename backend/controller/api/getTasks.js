const router = require("express").Router();
const Singleton = require("../../helper/db_helpers/Singleton");
const redis = Singleton.getRedis();

router.get("/", async (req, res) => {
	let data = await redis.getTaskList();
	if (data) {
		return res.status(200).send({
			ok: true,
			data: res,
		});
	}
	return res.status(200).send({
		ok: false,
	});
});

module.exports = router;