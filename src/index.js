require('dotenv').config();
const Agent = require('./agent/agent');
const logger = require('./logger/logger');

async function main() {
  const agentName = process.env.AGENT_NAME || 'MyAgent';
  let agent;

  try {
    agent = new Agent(agentName);
  } catch (error) {
    logger.error(`Failed to initialize agent: ${error.message}`, error);
    return; // Exit if agent initialization fails
  }

  const inputs = [
    'Hello, Agent!',
    'calculate 5 * 5',
    'search Node.js',
  ];

  try {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      try {
        const response = await agent.processInput(input);
        logger.info(`Response ${i + 1}: ${response}`);
      } catch (error) {
        logger.error(`Error processing input "${input}": ${error.message}`, error);
      }
    }
  } catch (error) {
    logger.error(`An unexpected error occurred: ${error.message}`, error);
  }
}

main();