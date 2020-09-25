const { invokeWorker } = require("./Handlers");

const events = require("events");
const eventEmitter = new events.EventEmitter();

eventEmitter.on("invoke_worker", invokeWorker);

const EmitEvent = (event) => {
	switch (event) {
		case "invoke_worker":
			eventEmitter.emit("invoke_worker");
			break;
	}
};

module.exports = EmitEvent;
