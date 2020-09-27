const Redis = require("./Redis");

const Singleton = (function () {
	var instance;

	function createInstance() {
		var redis = new Redis();
		return redis;
	}

	return {
		getRedis: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		},
	};
})();

module.exports = Singleton;
