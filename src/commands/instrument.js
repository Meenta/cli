exports.command = 'instrument <command>'
exports.desc = 'Manage Instruments'
exports.builder = function (yargs) {
  return yargs.commandDir('instrument')
}
exports.handler = function (argv) {
	console.log('here we are');
}
