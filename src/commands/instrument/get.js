const _ = require('underscore');
const transport = require('../../common/transport');

exports.command = 'get <id>';
exports.describe = 'Get a specific instrument details';
exports.builder = {}

exports.handler = function (argv) {

	transport.get('v1/instrument/-' + argv.id).then(result => {

		console.log(result)

	}).catch(reason => {
		console.log(reason);
	})

}
