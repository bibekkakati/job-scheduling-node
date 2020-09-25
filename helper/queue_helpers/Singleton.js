const PriorityQueue = require("./PriorityQueue");

const Singleton = (function () {
	var instance;

	function createInstance() {
		var pq = new PriorityQueue(1, 10);
		return pq;
	}

	return {
		getQueue: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		},
	};
})();

module.exports = Singleton;
