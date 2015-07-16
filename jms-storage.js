/**
 *
 * @param cmd
 * @param source
 * @param branch
 * @param data
 * @param next
 *
 * @returns {storage}
 */
function storage (cmd, source, branch, data, next) {

	if (!storage.engine) {
		try {
			storage.engine = require('./lib/' + storage.settings.engine)(this)
		} catch (e) {
			throw Error('No storage engine for "' + storage.settings.engine +'"')
		}
	}

	if (!storage.engine[cmd]) {
		throw Error('Method "' + cmd +'" not implemented in storage engine "' + storage.settings.engine +'"')
	}

	storage.engine[cmd](source, branch, data, next);

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