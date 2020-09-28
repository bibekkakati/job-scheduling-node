const router = require("express").Router();
const AbortTask = require("../../helper/task_helpers/AbortTask");

router.post("/:id", (req, res) => {
	let taskId = req.params.id;
	if (taskId) {
		let aborted = AbortTask(taskId);
		if (aborted) {
			return res.status(200).send({
				ok: true,
			});
		} else {
			return res.status(200).send({
				ok: false,
			});
		}
	}
	return res.status(401).send({
		ok: false,
		error: "Abort request failed",
	});
});

module.exports = router;
