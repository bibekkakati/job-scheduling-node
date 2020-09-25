const express = require("express");
const router = express.Router();

// ALL AUTH SERVICE API'S
const createTask = require("../api/createTask");
const abortTask = require("../api/abortTask");
const deleteTask = require("../api/deleteTask");
const rescheduleTask = require("../api/rescheduleTask");

router.use("/c", createTask);
router.use("/a", abortTask);
router.use("/d", deleteTask);
router.use("/r", rescheduleTask);

module.exports = router;
