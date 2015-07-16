



function storage (cmd, source, branch, data, next) {


	console.log('storage method', cmd, source, branch, data);

	next(null, +new Date())

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