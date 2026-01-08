const { Command } = require('commander');
const figlet = require('figlet');

const createService = require('./create-service');
const listServices = require('./list-services');
const removeService = require('./remove-service');

const program = new Command();

program
  .name(figlet.textSync('LetPhil Server Manager'))
  .description('CLI to manage services')
  .version('1.0.0');

program
  .command('create-service <service-name>')
  .description('Create a new service')
  .action(createService);

program
  .command('list-services')
  .description('List all existing services')
  .action(listServices);

program
  .command('remove-service <service-name>')
  .description('Remove an existing service')
  .action(removeService);

program
  .command('help', { isDefault: true })
  .description('Display help information')
  .action(program.outputHelp);

program.parse(process.argv);
