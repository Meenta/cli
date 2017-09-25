const _ = require('underscore');
const db = require('../../common/db');

exports.command = 'purge'
exports.describe = 'Purge all'
exports.builder = {}

exports.handler = function (argv) {
	db.purge();
}
