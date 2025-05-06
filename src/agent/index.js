// src/agent/index.js
// This file serves as the entry point for the agent module.
// It exports the Agent class and the agentState object,
// making them accessible to other parts of the application.

const Agent = require('./agent'); // Import the Agent class from agent.js
const agentState = require('./agentState'); // Import the agentState object from agentState.js

module.exports = {
  Agent, // Export the Agent class
  agentState, // Export the agentState object
};

// src/agent/agent.js
const { v4: uuidv4 } = require('uuid');

class Agent {
  constructor(name, description) {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Agent name must be a non-empty string.');
    }
    if (typeof description !== 'string') {
      throw new Error('Agent description must be a string.');
    }

    this.id = uuidv4(); // Generate a unique ID for the agent
    this.name = name; // Assign a name to the agent
    this.description = description; // Assign a description to the agent
    this.memory = []; // Initialize an empty memory array
    this.tools = {}; // Initialize an empty tools object
  }

  // Add a message to the agent's memory
  remember(message) {
    if (typeof message !== 'string') {
      console.warn('Attempted to add non-string message to memory.  Message ignored.');
      return;
    }
    this.memory.push(message);
  }

  // Retrieve the agent's memory
  getMemory() {
    return [...this.memory]; // Return a copy to prevent direct modification
  }

  // Add a tool to the agent
  addTool(name, toolFunction) {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new Error('Tool name must be a non-empty string.');
    }
    if (typeof toolFunction !== 'function') {
      throw new Error(`Tool "${name}" must be a function.`);
    }
    this.tools[name] = toolFunction;
  }

  // Use a tool
  async useTool(name, input) {
    if (typeof name !== 'string' || name.trim() === '') {
      return 'Error: Tool name must be a non-empty string.';
    }
    if (!this.tools[name]) {
      return `Tool "${name}" not found.`;
    }

    try {
      return await this.tools[name](input); // Await the tool function
    } catch (error) {
      console.error(`Error using tool "${name}":`, error);
      return `Error: Tool "${name}" failed to execute. See console for details.`;
    }
  }

  // Get the agent's information
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}

module.exports = Agent;

// src/agent/agentState.js
const agentState = {
  agents: new Map(), // Use a Map for better performance and key handling

  // Add an agent to the state
  addAgent(agent) {
    if (!(agent instanceof Agent)) {
      throw new Error('Only Agent instances can be added.');
    }
    this.agents.set(agent.id, agent);
  },

  // Get an agent by ID
  getAgent(id) {
    if (typeof id !== 'string') {
      console.warn('Agent ID must be a string.');
      return null;
    }
    return this.agents.get(id) || null; // Return null if agent not found
  },

  // Remove an agent by ID
  removeAgent(id) {
    if (typeof id !== 'string') {
      console.warn('Agent ID must be a string.');
      return;
    }
    this.agents.delete(id);
  },

  // List all agents
  listAgents() {
    return Array.from(this.agents.values());
  },
};

module.exports = agentState;

// src/tools/search.js
async function search(query) {
  if (typeof query !== 'string') {
    return 'Error: Search query must be a string.';
  }
  // Simulate a search function (replace with actual search logic)
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async operation
  return `Search results for: ${query} - [Simulated Results]`;
}

module.exports = search;

// src/tools/calculator.js
const { evaluate } = require('mathjs');

async function calculate(expression) {
  if (typeof expression !== 'string') {
    return 'Error: Calculation expression must be a string.';
  }
  try {
    const result = evaluate(expression);
    return result;
  } catch (error) {
    console.error("Calculation error:", error);
    return "Error: Invalid expression.";
  }
}

module.exports = calculate;

// Example usage in index.js or app.js
const { Agent, agentState } = require('./src/agent');
const searchTool = require('./src/tools/search');
const calculatorTool = require('./src/tools/calculator');

const myAgent = new Agent("Assistant", "A helpful assistant.");

myAgent.addTool("search", searchTool);
myAgent.addTool("calculate", calculatorTool);

async function main() {
  // Use the tools
  const searchResult = await myAgent.useTool("search", "Node.js agents");
  console.log(searchResult);

  const calculationResult = await myAgent.useTool("calculate", "2 + 2 * 3");
  console.log(calculationResult);

    // Example of using agentState
    agentState.addAgent(myAgent);
    const retrievedAgent = agentState.getAgent(myAgent.id);
    console.log("Retrieved Agent:", retrievedAgent.getInfo());

    agentState.removeAgent(myAgent.id);
    const agentAfterRemoval = agentState.getAgent(myAgent.id);
    console.log("Agent after removal:", agentAfterRemoval);
}

main();