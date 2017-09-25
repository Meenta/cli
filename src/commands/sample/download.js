const _ = require('underscore')
const transport = require('../../common/transport')
const fs = require('fs')

exports.command = 'download <id> <file> [dest]'
exports.describe = 'Download a sample data file'
exports.builder = {}

exports.handler = function (argv) {

	// Check that we have the [dest] folder before starting.
	if (argv.dest) {
		if (!fs.existsSync(argv.dest))
			return console.log('Invalid Destination. Please check the dest.')
	}

	transport.download('v1/sample/-' + argv.id + '/data', argv.file, argv.dest).then(result => {

		console.log(result.msg)
		console.log('Local File', result.file, result.fullPath)

	}).catch(reason => {

		console.log(reason)

	})

}
