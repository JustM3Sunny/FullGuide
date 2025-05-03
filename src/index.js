require('dotenv').config();
const Agent = require('./agent/agent');
const logger = require('./logger/logger');

async function main() {
  const agentName = process.env.AGENT_NAME || 'MyAgent'; // Use environment variable for agent name
  const agent = new Agent(agentName);

  const inputs = [
    'Hello, Agent!',
    'calculate 5 * 5',
    'search Node.js',
  ];

  try {
    for (const [index, input] of inputs.entries()) {
      const response = await agent.processInput(input);
      logger.info(`Response ${index + 1}: ${response}`);
    }
  } catch (error) {
    logger.error(`An error occurred: ${error.message}`, error); // Include the error object for better debugging
  }
}

main();