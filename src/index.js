require('dotenv').config();
const Agent = require('./agent/agent');
const logger = require('./logger/logger');

const agent = new Agent('MyAgent');

async function main() {
  try {
    const input1 = 'Hello, Agent!';
    const response1 = await agent.processInput(input1);
    logger.info(`Response 1: ${response1}`);

    const input2 = 'calculate 5 * 5';
    const response2 = await agent.processInput(input2);
    logger.info(`Response 2: ${response2}`);

    const input3 = 'search Node.js';
    const response3 = await agent.processInput(input3);
    logger.info(`Response 3: ${response3}`);

  } catch (error) {
    logger.error(`An error occurred: ${error.message}`);
  }
}

main();