var program = require('commander');
var package = require('../package.json');

program
  .version(package.version)
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook')

program
  .command('init')
  .action(function(env) {
    require('./command/init.js')
  });

program
  .command('*')
  .description('deploy the given env')
  .action(function(env) {
    console.log('啥?', env, '? 不会');
  });

program.parse( process.argv )
