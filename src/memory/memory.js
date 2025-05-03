// src/memory/memory.js
const logger = require('../logger/logger');

const memory = [];

function store(data) {
  logger.info(`Storing data in memory: ${JSON.stringify(data)}`);
  memory.push(data);
}

function retrieve(query) {
  logger.info(`Retrieving data from memory with query: ${query}`);
  // Simple search - improve with more sophisticated techniques
  const results = memory.filter(item => JSON.stringify(item).includes(query));
  logger.info(`Retrieved data: ${JSON.stringify(results)}`);
  return results;
}

module.exports = {
  store,
  retrieve,
};