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
		}




	}

}