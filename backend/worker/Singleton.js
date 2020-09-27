const { WorkerPool } = require("./Pool");

const Singleton = (function () {
	var instance;

	function createInstance() {
		var pool = new WorkerPool(__dirname + "/Worker.js", 4);
		return pool;
	}

	return {
		getPool: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		},
	};
})();

module.exports = Singleton;
