const logger = require('../logger/logger');

let agentState = {
  currentTask: null,
  previousTasks: [],
  context: {},
};

function updateState(newState) {
  logger.info(`Updating agent state: ${JSON.stringify(newState)}`);
  agentState = { ...agentState, ...newState };
  return agentState;
}

function getState() {
  return agentState;
}

module.exports = {
  updateState,
  getState,
};