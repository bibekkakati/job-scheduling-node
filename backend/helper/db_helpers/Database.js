const mongoose = require("mongoose");
const Task = require("./Schema");

class Db {
	constructor() {
		this._initialize();
	}

	_initialize = () => {
		mongoose
			.connect(process.env.DB_URL, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log("MongoDB connected successfully.");
			})
			.catch((err) => console.log(err));
	};

	addTask = (task) =>
		new Promise((resolve, reject) => {
			Task(task)
				.save()
				.then((res) => {
					resolve(true);
				})
				.catch((e) => {
					console.log(e);
					resolve(false);
				});
		});

	deleteTask = (taskId) =>
		new Promise((resolve, reject) => {
			Task.remove({ taskId: taskId }).then((res) => {
				res.deletedCount ? resolve(true) : resolve(false);
			});
		});

	updateTask = (task) => {
		return new Promise((resolve, reject) => {
			Task.updateOne({ taskId: task.taskId }, { $set: task })
				.then((res) => {
					resolve(true);
				})
				.catch((e) => {
					console.log(e);
					resolve(false);
				});
		});
	};

	getTask = (taskId) =>
		new Promise((resolve, reject) => {
			Task.findOne({ taskId: taskId })
				.then((res) => {
					resolve({
						taskId: res.taskId,
						priorityLevel: res.priorityLevel,
						halt: res.halt,
						status: res.status,
						createdAt: res.createdAt,
						timeInMs: res.timeInMs,
					});
				})
				.catch((e) => resolve(false));
		});

	getAllTask = () =>
		new Promise(async (resolve, reject) => {
			Task.find()
				.then((res) => {
					resolve(res);
				})
				.catch((e) => resolve([]));
		});
}

module.exports = Db;
