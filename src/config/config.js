// src/config/config.js
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY;
const logLevel = process.env.LOG_LEVEL;

const config = {
  apiKey: apiKey || 'default_api_key',
  logLevel: logLevel || 'info',
};

export default config;