require('dotenv').config();
const Agent = require('./agent/agent');
const logger = require('./logger/logger');

async function main() {
  const agentName = process.env.AGENT_NAME || 'MyAgent';
  let agent;

  try {
    agent = new Agent(agentName);
    logger.info(`Agent "${agentName}" initialized successfully.`); // Added log for successful initialization
  } catch (error) {
    logger.error(`Failed to initialize agent: ${error.message}`, { error }); // Improved error logging with object
    return; // Exit if agent initialization fails
  }

  const inputs = [
    'Hello, Agent!',
    'calculate 5 * 5',
    'search Node.js',
  ];

  for (const [index, input] of inputs.entries()) { // Using for...of loop with index
    try {
      const response = await agent.processInput(input);
      logger.info(`Response ${index + 1}: ${response}`);
    } catch (error) {
      logger.error(`Error processing input "${input}": ${error.message}`, { error }); // Improved error logging with object
    }
  }
}

main().catch(error => { // Added global error handling for main function
  logger.fatal(`Unhandled error in main: ${error.message}`, { error }); // Log fatal error and exit
  process.exit(1); // Exit process with error code
});