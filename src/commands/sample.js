exports.command = 'sample <command>'
exports.desc = 'Manage Samples'
exports.builder = function (yargs) {
  return yargs.commandDir('sample')
}
exports.handler = function (argv) {
	console.log('here we are');
}
