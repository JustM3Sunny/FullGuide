// src/config/config.js
require('dotenv').config();

module.exports = {
  apiKey: process.env.API_KEY || 'default_api_key',
  logLevel: process.env.LOG_LEVEL || 'info',
  // Add other configuration variables here
};