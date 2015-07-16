var redis = require('redis');



module.exports = function jmsRedisStorage (server) {

	var storageConfig = server.settings.app.storage;

	var client = redis.createClient(
		storageConfig.redis.port,
		storageConfig.redis.host,
		{
			parser: 'javascript'
		}
	);

	client.select(storageConfig.redis.database, function() {
		server.log(['info', 'redis'], 'using db ' + storageConfig.redis.database);
	});

	client.on('error', function (err) {
		server.log(['error', 'redis'], 'error');

		throw err;
	});

	client.on('ready', function () {
		server.log(['info','redis'], 'ready');
	});

	client.on('connect', function () {
		server.log(['info','redis'], 'connect');
	});

	return {

		getmap: function (source, branch, data, next) {

			/*
			 storage.hmget(
			 ['map', moduleRequest.source, moduleRequest.stage].join(':'),
			 modulelist,
			 onMapResult
			 .bind(null, request, reply, moduleRequest)
			 );
			 */

			var hash = ['map', source, branch].join(':');

			server.log(['verbose','redis'], 'hmget hash ' + hash + ' keys ' + data.join(','));
			client.hmget(hash, data, next);
		},

		getmodules: function (source, branch, data, next) {
			/*

			 storage.hmget(
			 ['source', moduleRequest.source, moduleRequest.stage].join(':'),
			 modules,

			 );
			 */

			var hash = ['source', source, branch].join(':');

			server.log(['verbose','redis'], 'hmget hash ' + hash + ' keys ' + data.join(','));
			client.hmget(hash, data, next);
		}




	}

}