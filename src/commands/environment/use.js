const _ = require('underscore');
const db = require('../../common/db');

exports.command = 'set <environment>'
exports.describe = 'Set Current Environment'
exports.builder = {}

// This will change the current pointer for the { env: 'current' }
exports.handler = function (argv) {

	var data = null;

	if (argv.environment === 'prod') {
		var data = {  _id: 'current', env: argv.environment, domain: 'https://api.meenta.io' }
	}

	if (argv.environment === 'dev') {
		var data = { _id: 'current', env: argv.environment, domain: 'http://localhost:4000' }
	}

	if (argv.environment === 'demo') {
		var data = {  _id: 'current', env: argv.environment, domain: 'https://demo.meenta.io' }
	}

	if (!data) return console.log('Invalid environment')

	db.changeEnvironment(data, function(err, data) {
		if (err) return console.log('Unable to set the environment')

		console.log('Current Environment set to ' + argv.environment )
	})

}
