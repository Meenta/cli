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

	return new Promise((resolve, reject) => {
		var p1 = db.getEnvironment()
		p1.then(env => {
			if (!env.auth) return console.log('Login Required')
			var params = header(env.auth)

			var url = env.api.domain + '/' + route
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

	return new Promise((resolve, reject) => {

		if (!fs.existsSync(file)) {
			reject(Error('Upload file not found.'))
		} else {

			var p1 = db.getEnvironment()
			p1.then(env => {

				if (!env.auth) return console.log('Login Required')

				var options = _.extend({
					url: env.api.domain + '/' + route,
					formData: {
						file: fs.createReadStream(file),
					}
				}, header(env.auth))

				if (verbose === true) console.log('header: ', options);

				var r = request.post(options, function(err, res, body) {
					if (verbose === true) console.log('statusCode', res.statusCode);

					if (res.statusCode !== 201) {
						if (res.statusCode === 404) reject(new Error('File missing'))
						if (res.statusCode === 401) reject(new Error('No Permission'))
						if (res.statusCode === 500) reject(new Error('API Error'))
					} else {
						var data = JSON.parse(body);
						resolve(data)
					}
				})

			}).catch(err => {
				console.log('Failed', err)
			})

		}

	})

}

exports.download = function(route, file, dest, verbose) {

	return new Promise((resolve, reject) => {

		var p1 = db.getEnvironment()
		p1.then(env => {

			if (!env.auth) return console.log('Login Required')

			var options = header(env.auth)
			var url = env.api.domain + route + '/' + file;

			// Setup a new path.
			var filename = file + '.download'

			// If we have a dest argument, then append.
			if (dest) filename = path.join(dest, filename)

			// Setup a local write stream
			var local = fs.createWriteStream(filename)

			request.get(url, options)
				.pipe(local)
				.on('close', function() {
					resolve({ msg: 'Find download complete', file: filename })
				})

		}).catch(err => {
			console.log('Failed', err)
		})

	})
}
