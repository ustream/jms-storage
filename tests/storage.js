var rewire = require('rewire');
var assert = require('assert');
var sinon = require('sinon');

var storage = require('../jms-storage')



suite('storage wrapper modul', function () {

	test('engine undefined before first use', function () {

		assert(!storage.engine)

	});

	test('throws on unknown storage engine', function () {

		storage.use('testengine')

		assert.throws(
			function() {
				storage('getTestMethod', [1,2,3], function () {})
			},
			Error
		);
	});

	test('engine loaded on first use', function () {

		storage.use('abstract')

		storage('getModules', [1,2,3], function () {})

		assert(storage.engine);
	});

	test('throws on not implemented method', function () {

		assert.throws(
			function() {
				storage('getTestMethod', [1,2,3], function () {})
			},
			Error
		);
	});
});