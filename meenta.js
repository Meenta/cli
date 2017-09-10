#!/usr/bin/env node

var argv = require('yargs')
	.commandDir('src/commands')
  .option('h', {
    alias: 'help',
    description: 'display help message'
  })
	.demandCommand()
  .help()
	.wrap(90)
  .version('0.0.1', 'version', 'Beta version of CLI.') // the version string.
  .alias('version', 'v')
  .example('meenta login <key> <secret>', 'Login into account using with username and password.')
	.example('meenta sample list', 'Get a list of all the samples.')
	.example('meenta sample download 101 test.txt', 'Download all the files for a given sample.')
	.example('meenta sample upload ./file.txt', 'Upload the file.txt to SAMPLE.')
  .epilog('for more information visit https://meenta.io/cli')
  .showHelpOnFail(true, 'whoops, something went wrong! run with --help')
  .argv;
