var rewire = require('rewire');
var assert = require('assert');
var sinon = require('sinon');

var mock = require('./util/redis_mock');


suite('redis storage lib', function () {

	var storagelib;

	setup(function () {
		sinon.spy(mock, 'createClient')
		sinon.stub(mock.client, 'select')
		sinon.stub(mock.client, 'on')
		sinon.stub(mock.client, 'hmget')
		sinon.stub(mock.client, 'hmset')
		sinon.stub(mock.client, 'hset')
		sinon.stub(mock.client, 'hdel')
		sinon.stub(mock.client, 'hgetall')
		sinon.stub(mock.client, 'keys')

		storagelib = rewire('../lib/redis');
		storagelib.__set__('redis', mock);
	});

	teardown(function () {
		mock.createClient.restore();
		mock.client.select.restore();
		mock.client.on.restore();
		mock.client.hmget.restore();
		mock.client.hmset.restore();
		mock.client.hset.restore();
		mock.client.hdel.restore();
		mock.client.hgetall.restore();
		mock.client.keys.restore();
	});


	test('redis createClient', function () {

		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		assert(
			mock.createClient.calledOnce,
			'was called'
		)
		assert(
			mock.createClient.calledWith(
				6379,
				'127.0.0.1',
				{
					parser: 'javascript'
				}
			),
			'was called with config arguments'
		)
	});

	test('redis select', function () {
		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		assert(
			mock.client.select.calledOnce,
			'was called'
		)
		assert(
			mock.client.select.calledWith(2),
			'was called with correct database'
		)
	});

	test('getMap', function () {
		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		storage.getMap('test', 'master', [1,2,3], function () {})

		sinon.assert.calledWith(
			mock.client.hmget,
			'map:test:master',
			[1,2,3],
			sinon.match.func
		)
	});

	test('setMap', function () {
		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		storage.setMap('test', 'master', 'abcd', 'efgh', function () {})

		sinon.assert.calledWith(
			mock.client.hset,
			'map:test:master',
			'abcd',
			'efgh',
			sinon.match.func
		)
	});

	test('getModules', function () {
		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		storage.getModules([1,2,3], function () {})

		sinon.assert.calledWith(
			mock.client.hmget,
			'source',
			[1,2,3],
			sinon.match.func
		)
	});

	test('setModules', function () {
		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		storage.setModules([1,2,3], function () {})

		sinon.assert.calledWith(
			mock.client.hmset,
			'source',
			[1,2,3],
			sinon.match.func
		)
	});

	test('removeModules', function () {
		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		storage.removeModules('test', 'master', 'abcdef', function () {})

		sinon.assert.calledWith(
			mock.client.hdel,
			'source',
			['abcdef'],
			sinon.match.func
		)
	});

	test('getVersions', function () {
		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		storage.getVersions('test', 'master', 'abcdef', function () {})

		sinon.assert.calledWith(
			mock.client.hmget,
			'versions:test:master',
			['abcdef'],
			sinon.match.func
		)
	});

	test('setVersions', function () {
		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		storage.setVersions('test', 'master', 'abcdef', 'jsondata', function () {})

		sinon.assert.calledWith(
			mock.client.hset,
			'versions:test:master',
			'abcdef',
			'jsondata',
			sinon.match.func
		)
	});

	test('getAllVersions', function () {
		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		storage.getAllVersions('test', 'master', function () {})

		sinon.assert.calledWith(
			mock.client.hgetall,
			'versions:test:master',
			sinon.match.func
		)
	});

	test('getSourceKeysByStage', function () {
		var storage = storagelib({
			port: 6379,
			host: '127.0.0.1',
			database: 2
		}, function () {})

		storage.getSourceKeysByStage('master', function () {})

		sinon.assert.calledWith(
			mock.client.keys,
			'versions:*:master',
			sinon.match.func
		)
	});

});