const _ = require('underscore');
const transport = require('../../common/transport');

exports.command = 'list'
exports.describe = 'List all samples'
exports.builder = {}

exports.handler = function (argv) {

	transport.get('v1/sample', true).then(results => {

		console.log('Samples:')

		_.each(results.data, function(i) {
			console.log('\t' + i.$id);
		})

	}).catch(err => {

		console.log(err)

	})


}
