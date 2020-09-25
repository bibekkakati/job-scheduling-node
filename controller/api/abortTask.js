const router = require("express").Router();

router.post("/", (req, res) => {
	res.status(200).send({
		ok: true,
		status: "Abort",
	});
});

module.exports = router;
