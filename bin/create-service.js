const fs = require('fs');
const path = require('path');

function createService(serviceName) {
  if (!serviceName) {
    console.log('Please provide a service name.');
    process.exit(1);
  }

  const lowercaseServiceName = serviceName.toLowerCase();

  const serviceDir = path.join(
    __dirname,
    '..',
    'src/services',
    lowercaseServiceName,
  );

  if (fs.existsSync(serviceDir)) {
    console.log(`Service ${serviceName} already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(serviceDir);

  fs.writeFileSync(
    path.join(serviceDir, `${lowercaseServiceName}.controller.ts`),
    `
  // Controller for ${serviceName} service
  import BaseController from '../../core/base.controller';
  import ${serviceName} from './${lowercaseServiceName}.model';
  
  class ${serviceName}Controller extends BaseController {
    constructor() {
      super(${serviceName});
    }
  }
  
  const ${lowercaseServiceName}Controller = new ${serviceName}Controller();
  
  export default ${lowercaseServiceName}Controller;
  `,
  );

  fs.writeFileSync(
    path.join(serviceDir, `${lowercaseServiceName}.routes.ts`),
    `
  import { Router } from 'express';
  
  const router = Router();
  
  // Define your user routes here
  router.get('/', (req, res) => {});
  `,
  );

  fs.writeFileSync(
    path.join(serviceDir, `${lowercaseServiceName}.model.ts`),
    `
  // Users data model
  export default {};
  `,
  );

  console.log(`Service ${serviceName} created successfully.`);
}

module.exports = createService;
