const db = require('./db')
const request = require('request')
const fs = require('fs')
const path = require('path')
const _ = require('underscore')

var header = function(data) {
	return {
		'headers': {
			'authorization': 'Bearer ' + data.token
		}
	}
}

exports.get = function(route, verbose) {

	var p1 = db.getEnvironment()
	var p2 = db.getSession()

	return new Promise((resolve, reject) => {

		Promise.all([ p1, p2 ]).then(function(results) {
			// Get the data.
			var env = results[0]
			var user = results[1]

			if (!user) return console.log('Login Required')
			var params = header(user);

			var url = env.api + route
			if (verbose === true) console.log(url);
			request.get(url, params, function (err, res, body) {
				if (res.statusCode !== 201) {
					if (res.statusCode === 404) reject(new Error('Not found'))
					if (res.statusCode === 401) reject(new Error('No Permission'))
					if (res.statusCode === 500) reject(new Error('API Error'))
				} else {
					var data = JSON.parse(body);
					resolve(data);
				}
			})

		}).catch(err => {
			reject(err)
		})

	})

}

exports.upload = function(route, file, verbose) {

	var p1 = db.getEnvironment()
	var p2 = db.getSession()

	return Promise.all([ p1, p2 ]).then(function(results) {
		// Get the data.
		var env = results[0]
		var user = results[1]

		if (!user) return console.log('Login Required')

		var options = _.extend({
			url: env.api + route,
			formData: {
				file: fs.createReadStream(file),
			}
		}, header(user))

		if (verbose === true) console.log('header: ', options);

		var r = request.post(options, function(err, res, body) {
			if (verbose === true) console.log('statusCode', res.statusCode);

			if (res.statusCode !== 201) {
				if (res.statusCode === 404) callback(new Error('File missing'))
				if (res.statusCode === 401) callback(new Error('No Permission'))
				if (res.statusCode === 500) callback(new Error('API Error'))
			} else {
				var data = JSON.parse(body);
				resolve(data)
			}
		})

	}).catch(err => {
		console.log('Failed', err)
	})

}

exports.download = function(route, file, dest, verbose) {

	var p1 = db.getEnvironment()
	var p2 = db.getSession()

	return Promise.all([ p1, p2 ]).then(function(results) {
		// Get the data.
		var env = results[0]
		var user = results[1]

		if (!user) return console.log('Login Required')

		// Set the header.
		var options = header(user)
		var url = env.api + route + '/' + file;

		// Setup a new path.
		var filename = file + '.download'

		// If we have a dest argument, then append.
		if (dest) filename = path.join(dest, filename);

		// Setup a local write stream
		var local = fs.createWriteStream(filename);

		request.get(url, options)
			.pipe(local)
			.on('close', function() {
				resolve({ msg: 'Find download complete', file: filename })
			});

	}).catch(err => {
		console.log('Failed', err)
	})

}
