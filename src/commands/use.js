const _ = require('underscore')
const transport = require('../common/transport')
const db = require('../common/db')

exports.command = 'use [which]'
exports.describe = 'Change environment'
exports.builder = {}

exports.handler = function (argv) {

	db.setEnvironment(argv.which).then(function(data) {
		console.log('Changed the env', data.desc, data.api);
	}).catch(reason => {
		console.log(reason)
	})

}
