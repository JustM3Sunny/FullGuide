/**
 * @file agentState.js
 * @description Manages the state of an agent, including its current task,
 * available tools, and any relevant data.  This module provides a centralized
 * location for managing agent-specific information.
 */

/**
 * Represents the state of an agent.
 * @typedef {object} AgentState
 * @property {string} currentTask - The task the agent is currently working on.
 * @property {object} availableTools - An object containing the tools the agent can use, keyed by tool name.
 * @property {object} data - Any relevant data the agent needs to perform its tasks.
 * @property {string} status - The current status of the agent (e.g., 'idle', 'working', 'waiting').
 */

/**
 * Creates a new agent state object.
 * @param {string} initialTask - The initial task for the agent.
 * @param {object} initialTools - The initial set of tools available to the agent.
 * @param {object} initialData - The initial data for the agent.
 * @returns {AgentState} A new agent state object.
 */
function createAgentState(initialTask = '', initialTools = {}, initialData = {}) {
  return {
    currentTask: initialTask,
    availableTools: initialTools,
    data: initialData,
    status: 'idle',
  };
}

/**
 * Updates the agent's state.
 * @param {AgentState} state - The current agent state.
 * @param {object} updates - An object containing the updates to apply to the state.
 * @returns {AgentState} The updated agent state.
 */
function updateAgentState(state, updates) {
  return {
    ...state,
    ...updates,
  };
}

/**
 * Adds a tool to the agent's available tools.
 * @param {AgentState} state - The current agent state.
 * @param {string} toolName - The name of the tool.
 * @param {function} toolFunction - The tool function.
 * @returns {AgentState} The updated agent state.
 */
function addToolToAgent(state, toolName, toolFunction) {
  if (state.availableTools[toolName]) {
    console.warn(`Tool "${toolName}" already exists. Overwriting.`);
  }

  return updateAgentState(state, {
    availableTools: {
      ...state.availableTools,
      [toolName]: toolFunction,
    },
  });
}

/**
 * Removes a tool from the agent's available tools.
 * @param {AgentState} state - The current agent state.
 * @param {string} toolName - The name of the tool to remove.
 * @returns {AgentState} The updated agent state.
 */
function removeToolFromAgent(state, toolName) {
  const { [toolName]: removedTool, ...remainingTools } = state.availableTools; // Destructure to remove the tool
  return updateAgentState(state, { availableTools: remainingTools });
}


/**
 * Gets a tool from the agent's available tools.
 * @param {AgentState} state - The current agent state.
 * @param {string} toolName - The name of the tool to get.
 * @returns {function|undefined} The tool function, or undefined if the tool is not found.
 */
function getToolFromAgent(state, toolName) {
  return state.availableTools[toolName];
}


module.exports = {
  createAgentState,
  updateAgentState,
  addToolToAgent,
  removeToolFromAgent,
  getToolFromAgent,
};