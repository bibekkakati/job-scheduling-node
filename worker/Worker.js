const { parentPort } = require("worker_threads");

(() => {
	parentPort.on("message", ({ data, port }) => {
		const timer = data.timeInMs;
		setTimeout(() => port.postMessage(true), timer);
	});
})();
