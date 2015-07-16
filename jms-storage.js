



function storage (cmd, source, branch, data, next) {


	console.log('storage method', cmd, source, branch, data);

}

storage.hapiMethod = function () {
	return [
		'storage',
		storage,
		{
		 	cache: {
		 		segment: 'storage',
		 		expiresIn: 2000
		 	}
		}
	];
}



module.exports = storage;