const router = require("express").Router();

router.post("/", (req, res) => {
	res.status(200).send({
		ok: true,
	});
});

module.exports = router;
