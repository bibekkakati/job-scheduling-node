const router = require("express").Router();
const Singleton = require("../../helper/db_helpers/Singleton");
const db = Singleton.getDb();

router.get("/", async (req, res) => {
	let data = await db.getAllTask();
	if (data.length) {
		return res.status(200).send({
			ok: true,
			data,
		});
	}
	return res.status(200).send({
		ok: false,
	});
});

module.exports = router;
