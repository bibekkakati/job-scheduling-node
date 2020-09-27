const url = "http://localhost:8082";

const getTasks = () =>
	new Promise((resolve, reject) => {
		fetch(`${url}/api/task`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				resolve(data);
			})
			.catch((e) => {
				resolve(false);
			});
	});
const createTask = (priorityLevel) =>
	new Promise((resolve, reject) => {
		fetch(`${url}/api/task/c`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				priorityLevel,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				resolve(data);
			})
			.catch((e) => {
				resolve(false);
			});
	});

const abortTask = (taskId) =>
	new Promise((resolve, reject) => {
		fetch(`${url}/api/task/a/${taskId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				resolve(data);
			})
			.catch((e) => {
				resolve(false);
			});
	});

const deleteTask = (taskId) =>
	new Promise((resolve, reject) => {
		fetch(`${url}/api/task/d/${taskId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				resolve(data);
			})
			.catch((e) => {
				resolve(false);
			});
	});

const rescheduleTask = (taskId) =>
	new Promise((resolve, reject) => {
		fetch(`${url}/api/task/r/${taskId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				resolve(data);
			})
			.catch((e) => {
				resolve(false);
			});
	});

module.exports = {
	getTasks,
	createTask,
	abortTask,
	deleteTask,
	rescheduleTask,
};
