var redis = require('redis');



module.exports = function jmsRedisStorage (storageConfig, log) {

	var client = redis.createClient(
		storageConfig.redis.port,
		storageConfig.redis.host,
		{
			parser: 'javascript'
		}
	);

	client.select(storageConfig.redis.database, function() {
		log(['info', 'redis'], 'using db ' + storageConfig.redis.database);
	});

	client.on('error', function (err) {
		log(['error', 'redis'], 'error');

		throw err;
	});

	client.on('ready', function () {
		log(['info','redis'], 'ready');
	});

	client.on('connect', function () {
		log(['info','redis'], 'connect');
	});

	return {

		/**
		 *
		 * @param source
		 * @param branch
		 * @param data
		 * @param next
		 */
		getMap: function (source, branch, data, next) {

			/*
			 storage.hmget(
			 ['map', moduleRequest.source, moduleRequest.stage].join(':'),
			 modulelist,
			 onMapResult
			 .bind(null, request, reply, moduleRequest)
			 );
			 */

			var hash = ['map', source, branch].join(':');

			log(['verbose','redis'], 'hmget hash ' + hash + ' keys ' + data.join(','));
			client.hmget(hash, data, next);
		},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param key
		 * @param value
		 * @param next
		 */
		setMap: function (source, branch, key, value, next) {

			/*

			 storage.hset(['map',sourceId,stage].join(':'), module.originalModule, module.module)

			 */

			var hash = ['map', source, branch].join(':');
			log(['verbose','redis'], 'hset hash ' + hash + ' key ' + key + ' value ' + value);
			client.hset(hash, key, value, next);
		},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param data
		 * @param next
		 */
		getModules: function (source, branch, data, next) {
			/*

			 storage.hmget(
			 ['source', moduleRequest.source, moduleRequest.stage].join(':'),
			 modules,

			 );
			 */

			var hash = ['source', source, branch].join(':');

			log(['verbose','redis'], 'hmget hash ' + hash + ' keys ' + data.join(','));
			client.hmget(hash, data, next);
		},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param data
		 * @param next
		 */
		setModules: function (source, branch, data, next) {

			var hash = ['source', source, branch].join(':');

			log(['verbose','redis'], 'hmset hash ' + hash);
			client.hmset(hash, data, next);
		},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param key
		 * @param next
		 */
		removeModules: function (source, branch, key, next) {
			var hash = ['source', source, branch].join(':');

			log(['verbose','redis'], 'hdel hash ' + hash + ' key ' + key);
			client.hdel(hash, [key], next);
		},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param name
		 * @param next
		 */
		getVersions:  function (source, branch, name, next) {

			var hash = ['versions', source, branch].join(':');

			log(['verbose','redis'], 'hmget hash ' + hash + 'name ' + name);
			client.hmget(hash, [name], next);
		},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param name
		 * @param versions
		 * @param next
		 */
		setVersions: function (source, branch, name, versions, next) {

			var hash = ['versions', source, branch].join(':');

			log(['verbose','redis'], 'hset hash ' + hash + 'name ' + name);
			client.hset(hash, name, versions, next);
		}

	}

}