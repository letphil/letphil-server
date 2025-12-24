import app from '../app';
import config from '../config/config';
import startDbConnection from './db/connection';
import logger from './logs/logger';

function appListen() {
  return app.listen(config.PORT, () => {
    logger.info('Server is running on port:', config.PORT);
  });
}

const server = startDbConnection(config.MONGO_URI as string, appListen);

function exitHandler() {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

const unexpectedErrorHandler = (error: any) => {
  logger.info('Unexpected error:', error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close(() => {
      logger.info('Server closed');
    });
  }
});
