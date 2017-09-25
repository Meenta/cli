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
		form: {
			token: argv.token,
			secret: argv.secret
		}
	}

	db.getSetup().then(function(api) {
		console.log('Using', api.domain)

		request.post(api.domain + '/v1/authentication', params, function (err, res, body) {

			if (res.statusCode === 403) {
				console.log('Invalid key/secret');
			} else {
				if (body === 'Invalid token.') {
					console.log('Auth Failed, Reason:', body)
				} else {
					var data = JSON.parse(body);

					var auth = {
						key: 'token',
						token: data.token,
						_id: api.env
					};

					db.setEnvironmentAuth(api.env, auth, function(err, data) {
						if (err) return console.log('Unable to save session');
						console.log('Session enabled.');
					})
				}
			}
		})

	}).catch(reason => {
		console.log('Error', reason)
	})

	return;



}
