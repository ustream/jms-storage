module.exports = function jmsStorageAbstract (server) {

	return {

		/**
		 *
		 * @param source
		 * @param branch
		 * @param data
		 * @param next
		 */
		getMap: function (source, branch, data, next) {

		},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param key
		 * @param value
		 * @param next
		 */
		setMap: function (source, branch, key, value, next) {},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param data
		 * @param next
		 */
		getModules: function (source, branch, data, next) {

		},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param data
		 * @param next
		 */
		setModules: function (source, branch, data, next) {},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param key
		 * @param next
		 */
		removeModules: function (source, branch, key, next) {},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param name
		 * @param versions
		 * @param next
		 */
		getVersions:  function (source, branch, name, versions, next) {},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param name
		 * @param next
		 */
		setVersions: function (source, branch, name, next) {},

		/**
		 *
		 * @param source
		 * @param branch
		 * @param next
		 */
		getAllVersions: function (source, branch, next) {}
	}

}