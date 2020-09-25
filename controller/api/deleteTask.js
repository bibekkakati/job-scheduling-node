const router = require("express").Router();

router.delete("/", (req, res) => {
	res.status(200).send({
		ok: true,
		status: "Delete",
	});
});

module.exports = router;
