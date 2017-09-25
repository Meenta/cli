const _ = require('underscore');
const transport = require('../../common/transport');

exports.command = 'upload <id> <file>'
exports.describe = 'Upload a sample data file'
exports.builder = {}

exports.handler = function (argv) {

	transport.upload('v1/sample/-' + argv.id + '/data', argv.file).then(result => {
		console.log(result)
	}).catch(reason => {
		console.log('Unable to upload', reason.message);
	})

}
