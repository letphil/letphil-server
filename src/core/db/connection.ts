import mongoose from 'mongoose';

import logger from '../logs/logger';

function startDbConnection(uri: string, appListen: () => unknown) {
  let server: any;

  mongoose
    .connect(uri)
    .then(() => {
      server = appListen();
      logger.info('DATABASE CONNECTION: successful');
    })
    .catch((err) => {
      logger.error('DATABASE CONNECTION: error:', err);
    });

  return server;
}

export default startDbConnection;
