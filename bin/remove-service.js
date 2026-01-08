const fs = require('fs');
const path = require('path');

function removeService(serviceName) {
  serviceName = (serviceName[0].toUpperCase() + serviceName.slice(1)).trim();

  const coreDir = path.join(__dirname, '..', 'src', 'core');

  if (!serviceName) {
    console.log('Please provide a service name to remove.');
    process.exit(1);
  }

  const lowercaseServiceName =
    serviceName[0].toLowerCase() + serviceName.slice(1);

  const serviceDir = path.join(
    __dirname,
    '..',
    'src/services',
    lowercaseServiceName,
  );

  if (!fs.existsSync(serviceDir)) {
    console.log(`Service ${serviceName} does not exist.`);
    process.exit(1);
  }

  // Recursively delete the service directory
  fs.rmSync(serviceDir, { recursive: true, force: true });

  console.log(`Service ${serviceName} has been removed.`);

  const registry = fs.readFileSync(path.join(coreDir, 'registry.ts'), 'utf-8');

  const importLine = `import ${serviceName} from '../services/${lowercaseServiceName}/${lowercaseServiceName}.controller';\n`;
  let updatedRegistry = registry.replace(importLine, '');
  const registrationLine = `appRegistry.register('${lowercaseServiceName}', ${serviceName});\n`;
  updatedRegistry = updatedRegistry.replace(registrationLine, '');

  fs.writeFileSync(path.join(coreDir, 'registry.ts'), updatedRegistry);
}

module.exports = removeService;
