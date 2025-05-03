const { v4: uuidv4 } = require('uuid');
const logger = require('../logger/logger');
const memory = require('../memory/memory');
const tools = require('../tools');

class Agent {
  constructor(name) {
    this.id = uuidv4();
    this.name = name;
    this.memory = memory;
    this.tools = tools; // Use the imported tools
    logger.info(`Agent ${this.name} initialized with ID: ${this.id}`);
  }

  async processInput(input) {
    logger.info(`Agent ${this.name} received input: ${input}`);

    // Example: Check if the input requires a tool
    if (input.includes('calculate')) {
      const expression = input.split('calculate ')[1];
      return this.useTool('calculator', expression);
    } else if (input.includes('search')) {
      const query = input.split('search ')[1];
      return this.useTool('search', query);
    } else {
      return `Agent ${this.name} says: Processing input - ${input}`;
    }
  }

  addTool(toolName, toolFunction) {
    this.tools[toolName] = toolFunction;
    logger.info(`Tool ${toolName} added to agent ${this.name}`);
  }

  async useTool(toolName, input) {
    if (!this.tools[toolName]) {
      logger.error(`Tool ${toolName} not found.`);
      return `Error: Tool ${toolName} not found.`;
    }
    try {
      logger.info(`Agent ${this.name} is using tool ${toolName} with input: ${input}`);
      const result = await this.tools[toolName](input);
      logger.info(`Tool ${toolName} returned: ${result}`);
      return result;
    } catch (error) {
      logger.error(`Error using tool ${toolName}: ${error.message}`);
      return `Error: ${error.message}`;
    }
  }
}

module.exports = Agent;