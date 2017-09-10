// my-module.js
const request = require('request');
const _ = require('underscore');
const db = require('../common/db');

exports.command = 'login <token> [secret]'
exports.describe = 'Login to Meenta with username and password.'
exports.builder = {}

exports.handler = function (argv) {
  console.log(`setting ${argv.token} to ${argv.secret}`)

	var params = {
		form:{
			token: argv.token,
			secret: argv.secret
		}
	};

	request.post('http://localhost:4000/v1/authentication', params, function (err, res, body) {

		if (res.statusCode === 403) {
			console.log('Invalid key/secret');
		} else {
			var data = JSON.parse(body);

			var doc = {
				key: 'token',
				token: data.token
			};

			db.saveActiveUser(doc, function(err, data) {
				if (err) return console.log('Unable to save session');

				console.log('Session enabled.');
			})
		}

	})

}
