const _ = require('underscore')
const transport = require('../common/transport')
const db = require('../common/db')

exports.command = 'whoami'
exports.describe = 'Get the current session information'
exports.builder = {}

exports.handler = function (argv) {

	// Setup the promises.
	const p1 = db.getEnvironment()
	const p2 = db.getSession()

	Promise.all([ p1, p2 ]).then(function(results) {

		console.log('Environment:', results[0])
		console.log('Session:', results[1])

	}).catch(reason => {
		console.log(reason)
	})

}
