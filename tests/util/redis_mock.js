var objectAssign = require('object-assign');
var client = {
	select: function () {},
	hmget: function () {},
	hset: function () {},
	hmset: function () {},
	hdel: function () {},
	hgetall: function () {},
	keys: function () {},
	on: function () {}
}





var RedisMock = function () {
	this.client = objectAssign(this.client, client);
}


RedisMock.prototype.client = {};

RedisMock.prototype.createClient = function () {
	return this.client;
}

module.exports = new RedisMock()