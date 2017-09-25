const _ = require('underscore')
const transport = require('../common/transport')
const db = require('../common/db')

exports.command = 'debug'
exports.describe = 'Show the current db'
exports.builder = {}

exports.handler = function (argv) {
	db.get({});
}
