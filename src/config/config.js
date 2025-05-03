// src/config/config.js
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY || 'default_api_key';
const logLevel = process.env.LOG_LEVEL || 'info';

const config = {
  apiKey,
  logLevel,
};

export default config;