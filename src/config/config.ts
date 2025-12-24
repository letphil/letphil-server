import dotenv from 'dotenv';

dotenv.config();

interface IConfig {
  PORT: string | number;
  APP_MODE: 'PROD' | 'DEV';
  DB_NAME: string;
  MONGO_URI?: string;
}

const config: IConfig = {
  PORT: process.env.PORT || 8888,
  APP_MODE: (process.env.APP_MODE as 'PROD' | 'DEV') || 'DEV',
  DB_NAME: process.env.DB_NAME || 'letphil-db',
};

const MONGO_URI =
  (process.env[`${config.APP_MODE}_MONGO_URI`] || 'DEV_MONGO_URI') +
  config.DB_NAME;

config['MONGO_URI'] = MONGO_URI;

export default config;
