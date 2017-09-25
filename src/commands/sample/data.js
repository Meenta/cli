const _ = require('underscore');
const transport = require('../../common/transport');

exports.command = 'files <id>'
exports.describe = 'Get a list of all data files'
exports.builder = {}

exports.handler = function (argv) {

	transport.get('v1/sample/-' + argv.id + '/data').then(results => {

		console.log('Sample Data Files:')

		// Loop and dump out the data.
		var i = 1;
		_.each(results, function(file) {
			console.log('\t', i + '. ', file.Key, '( ' +file.Size + ' kb )');
			i++;
		})

	}).catch(err => {
		console.log(err.message);
	})

}
