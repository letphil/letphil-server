const fs = require('fs');
const path = require('path');

const servicesDir = path.join(__dirname, '..', 'src', 'services');
// const coreDir = path.join(__dirname, '..', 'src', 'core');

function listServices() {
  fs.readdir(servicesDir, (err, files) => {
    if (err) {
      console.error('Error reading services directory:', err);
      process.exit(1);
    }

    const serviceNames = files.filter((file) => {
      const servicePath = path.join(servicesDir, file);
      return fs.statSync(servicePath).isDirectory();
    });

    console.log('Registered Services:');
    serviceNames.forEach((serviceName) => {
      console.log(`- ${serviceName}`);
    });
  });
}

module.exports = listServices;

// fs.readdir(servicesDir, (err, files) => {
//   if (err) {
//     console.error('Error reading services directory:', err);
//     process.exit(1);
//   }

//   const serviceNames = files.filter((file) => {
//     const servicePath = path.join(servicesDir, file);
//     return fs.statSync(servicePath).isDirectory();
//   });

//   console.log('Registered Services:');
//   serviceNames.forEach((serviceName) => {
//     console.log(`- ${serviceName}`);
//   });
// });
