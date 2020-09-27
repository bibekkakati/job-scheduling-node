const { parentPort } = require("worker_threads");

(() => {
	parentPort.on("message", ({ task, port }) => {
		const timer = task.timeInMs;
		setTimeout(() => port.postMessage(true), timer);
	});
})();
