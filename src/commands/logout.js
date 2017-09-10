//
var request = require('request');
var _ = require('underscore');

exports.command = 'logout'
exports.describe = 'Logout of account.'
exports.builder = {}

exports.handler = function (argv) {
  console.log(`Logout of account for current user.`)
}
