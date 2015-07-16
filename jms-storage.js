



function storage (cmd, source, branch, data, next) {

	console.log(	storage.settings.engine);

	console.log('storage method', cmd, source, branch, data);




	if (!storage.engine) {
		// init engine

		try {
			storage.engine = require('./lib/' + storage.settings.engine)(this)
		} catch (e) {
			throw Error('No storage engine for "' + storage.settings.engine +'"')
		}
	}




	next(null, +new Date())

}

storage.settings = {
}



storage.use = function (engine) {
	storage.settings.engine = engine;

	return storage;
}









module.exports = storage;



/*


 request.server.methods.storage(
 'getmap',
 moduleRequest.source,
 moduleRequest.stage,
 modulelist,
 onMapResult.bind(null, request, reply, moduleRequest)
 )

 storage.hmget(
 ['map', moduleRequest.source, moduleRequest.stage].join(':'),
 modulelist,
 onMapResult
 .bind(null, request, reply, moduleRequest)
 );

 */