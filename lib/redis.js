var redis = require('redis');



module.exports = function jmsRedisStorage (server) {

	var storageConfig = server.settings.app.storage;

	console.log(storageConfig );

	var client = redis.createClient(
		storageconfig.redis.port,
		storageconfig.redis.host,
		{
			parser: 'javascript'
		});


	client.select(storageconfig.redis.database, function() {
		server.log.info('redis', 'using db ' + storageconfig.redis.database);
	});

	client.on('error', function (err) {
		server.log.error('redis', 'error');

		throw err;
	});

	client.on('ready', function () {
		server.log.info('redis', 'ready');
	});

	client.on('connect', function () {
		server.log.info('redis', 'connect');
	});


	return {

	}

}