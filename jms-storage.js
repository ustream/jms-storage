/**
 *
 *
 * @returns {storage}
 */
function storage (storageConfig, logUtil) {


	if (!storage.engine) {

		var config = {};

		if (this.settings && this.settings.app && this.settings.app.storage) {
			config = this.settings.app.storage;
		} else if (storageConfig) {
			config = storageConfig
		}

		var log = function () {};

		if (this.log) {
			log = this.log;
		} else if (logUtil) {
			log = logUtil
		}

		try {
			storage.engine = require('./lib/' + storage.settings.engine)(config, log)
		} catch (e) {
			throw Error('No storage engine for "' + storage.settings.engine +'"')
		}
	}

	var cmd = arguments[0],
		source = arguments[1],
		branch = arguments[2],
		next = arguments[arguments.length - 1],
		data = Array.prototype.slice.call(arguments, 3);

	data.pop();

	if (!storage.engine[cmd]) {
		throw Error('Method "' + cmd +'" not implemented in storage engine "' + storage.settings.engine +'"')
	}

	storage.engine[cmd].apply(storage.engine, [source, branch].concat(data, [next]));

	return storage;
}

storage.settings = {
	engine: 'none'
}

/**
 *
 * @param engine
 *
 * @returns {storage}
 */
storage.use = function (engine) {
	storage.settings.engine = engine;
	return storage;
}

module.exports = storage;