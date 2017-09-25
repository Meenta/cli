exports.command = 'environment <command>'
exports.desc = 'Manage Environment'
exports.builder = function (yargs) {
  return yargs.commandDir('environment')
}
exports.handler = function (argv) {
	console.log('here we are');
}
