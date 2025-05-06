// src/config/config.js
import dotenv from 'dotenv';

dotenv.config();

const config = {
  apiKey: process.env.API_KEY || 'default_api_key',
  logLevel: process.env.LOG_LEVEL || 'info',
};

// Validate API Key
if (config.apiKey === 'default_api_key') {
  console.warn("API_KEY is using the default value. Please set it in your environment variables.");
}

// Validate Log Level
const validLogLevels = ['info', 'warn', 'error', 'debug', 'trace'];
if (!validLogLevels.includes(config.logLevel)) {
  console.error(`Invalid LOG_LEVEL: ${config.logLevel}.  Defaulting to 'info'. Valid levels are: ${validLogLevels.join(', ')}`);
  config.logLevel = 'info';
}


export default config;