const Mongodb = require("./Database");

const Singleton = (function () {
	var instance;

	function createInstance() {
		var db = new Mongodb();
		return db;
	}

	return {
		getDb: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		},
	};
})();

module.exports = Singleton;
