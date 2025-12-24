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

  const coreDir = path.join(__dirname, '..', 'src', 'core');

  // const srcDir = path.join(__dirname, '..', 'src');

  if (fs.existsSync(serviceDir)) {
    console.log(`Service ${serviceName} already exists.`);
    process.exit(1);
  }

  fs.mkdirSync(serviceDir);

  fs.writeFileSync(
    path.join(serviceDir, `${lowercaseServiceName}.controller.ts`),
    `// Controller for ${serviceName} service
import BaseController from '../../core/controllers/base.controller';
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
import ${lowercaseServiceName}Controller from './${lowercaseServiceName}.controller';

const router = Router();

// Define your user routes here
router
  .route('/')
  .get(${lowercaseServiceName}Controller.list.bind(${lowercaseServiceName}Controller))
  .post(${lowercaseServiceName}Controller.create.bind(${lowercaseServiceName}Controller));

router
  .route('/:id')
  .get(${lowercaseServiceName}Controller.getById.bind(${lowercaseServiceName}Controller))
  .put(${lowercaseServiceName}Controller.update.bind(${lowercaseServiceName}Controller))
  .delete(${lowercaseServiceName}Controller.delete.bind(${lowercaseServiceName}Controller));

export default router;
  `,
  );

  fs.writeFileSync(
    path.join(serviceDir, `${lowercaseServiceName}.model.ts`),
    `import { Schema, Model, model } from 'mongoose';

interface I${serviceName} {
  // Define your model interface here
} 

// ${serviceName} data model
const ${serviceName}Schema = new Schema({
  // Define your schema fields here
});

const ${serviceName}Model: Model<I${serviceName}> = model<I${serviceName}>('${serviceName}', ${serviceName}Schema);

export default ${serviceName}Model;
  `,
  );

  const registry = fs.readFileSync(path.join(coreDir, 'registry.ts'), 'utf-8');

  const importStatement = `import ${serviceName} from '../services/${lowercaseServiceName}/${lowercaseServiceName}.controller';\n`;

  const updatedRegistry = registry
    .replace(
      /(\/\/ ---------------- Services Import --------------------\n)/,
      `$1${importStatement}`,
    )
    .replace(
      /(\/\/ ------------- Services Registration -----------------\n)/,
      `$1appRegistry.register('${lowercaseServiceName}', ${serviceName});\n`,
    );

  fs.writeFileSync(path.join(coreDir, 'registry.ts'), updatedRegistry);

  console.log(`Service ${serviceName} created successfully.`);
}

module.exports = createService;
