import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(), // Use JSON format for structured logger
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({
      filename: 'src/logs/error.log',
      level: 'error',
    }), // Log errors to a file
    new winston.transports.File({ filename: 'src/logs/combined.log' }), // Log all levels to another file
  ],
});

export default logger;
