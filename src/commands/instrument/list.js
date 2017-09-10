const _ = require('underscore');
const transport = require('../../common/transport');

exports.command = 'list'
exports.describe = 'List all instruments.'
exports.builder = {}

exports.handler = function (argv) {

	transport.get('v1/instrument', false).then(results => {

		console.log('Instruments: (' + results.data.length + '):');

		_.each(results.data, function(i) {
			console.log('\t' + i.$id, 'aka: ' + i.nickName);
		})

	}).catch(reason => {
		console.log(reason);
	})

}
