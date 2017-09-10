const _ = require('underscore');
const transport = require('../../common/transport');

exports.command = 'get <id>'
exports.describe = 'Get sample details'
exports.builder = {}

exports.handler = function (argv) {

	transport.get('v1/sample/-' + argv.id).then(result => {

		console.log(result)

	}).catch(reason => {
		console.log(reason);
	})

}
