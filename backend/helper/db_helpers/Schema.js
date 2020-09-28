const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
	taskId: {
		type: String,
		required: true,
	},
	priorityLevel: {
		type: Number,
		required: true,
	},
	halt: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
	},
	createdAt: {
		type: Number,
	},
	timeInMs: {
		type: Number,
	},
});

TaskSchema.post("init", function (doc) {
	doc._original = doc.toObject();
});

module.exports = Task = mongoose.model("myTask", TaskSchema);
