/**
 * src/agent/agent.js
 *
 * This module defines the core Agent class, responsible for managing tasks,
 * interacting with tools, and maintaining state.  It provides a framework
 * for building complex, autonomous systems.
 */

/**
 * Represents a single task for the agent to perform.
 * @typedef {object} Task
 * @property {string} id - A unique identifier for the task.
 * @property {string} description - A human-readable description of the task.
 * @property {string} status - The current status of the task (e.g., "pending", "in_progress", "completed", "failed").
 * @property {object} [result] - The result of the task, if completed.
 * @property {string} [error] - An error message, if the task failed.
 */

/**
 * Represents a tool that the agent can use to perform tasks.
 * @typedef {object} Tool
 * @property {string} name - The name of the tool.
 * @property {string} description - A description of what the tool does.
 * @property {function} execute - A function that executes the tool.  It should accept an object
 *                                 containing arguments and return a Promise that resolves with the result.
 */

class Agent {
  /**
   * Creates a new Agent instance.
   * @param {object} config - Configuration options for the agent.
   * @param {string} config.name - The name of the agent.
   * @param {string} config.description - A description of the agent's purpose.
   */
  constructor(config) {
    if (!config || !config.name || !config.description) {
      throw new Error("Agent configuration must include 'name' and 'description'.");
    }

    this.name = config.name;
    this.description = config.description;
    this.tasks = [];
    this.tools = {};
    this.state = {}; // Internal state for the agent.
    this.taskIdCounter = 0;
  }

  /**
   * Adds a new task to the agent's task list.
   * @param {string} description - A description of the task.
   * @returns {string} The ID of the newly created task.
   */
  addTask(description) {
    if (typeof description !== 'string' || description.trim() === '') {
      throw new Error('Task description must be a non-empty string.');
    }

    const taskId = `task-${this.taskIdCounter++}`;
    const newTask = {
      id: taskId,
      description: description,
      status: "pending",
    };
    this.tasks.push(newTask);
    return taskId;
  }

  /**
   * Retrieves a task by its ID.
   * @param {string} taskId - The ID of the task to retrieve.
   * @returns {Task | undefined} The task object, or undefined if not found.
   */
  getTask(taskId) {
    if (typeof taskId !== 'string' || taskId.trim() === '') {
      return undefined; // Or throw an error, depending on desired behavior
    }
    return this.tasks.find((task) => task.id === taskId);
  }

  /**
   * Updates the status of a task.
   * @param {string} taskId - The ID of the task to update.
   * @param {string} status - The new status of the task.
   */
  updateTaskStatus(taskId, status) {
    if (typeof taskId !== 'string' || taskId.trim() === '') {
      console.warn('Invalid taskId provided to updateTaskStatus.');
      return;
    }
    if (typeof status !== 'string' || status.trim() === '') {
      console.warn('Invalid status provided to updateTaskStatus.');
      return;
    }

    const task = this.getTask(taskId);
    if (task) {
      task.status = status;
    } else {
      console.warn(`Task with ID ${taskId} not found.`);
    }
  }

  /**
   * Adds a tool to the agent's toolset.
   * @param {Tool} tool - The tool to add.
   * @throws {Error} If a tool with the same name already exists.
   */
  addTool(tool) {
    if (!tool || typeof tool.name !== 'string' || tool.name.trim() === '' || typeof tool.execute !== 'function') {
      throw new Error('Tool must have a name and an execute function.');
    }
    if (this.tools[tool.name]) {
      throw new Error(`Tool with name '${tool.name}' already exists.`);
    }
    this.tools[tool.name] = tool;
  }

  /**
   * Executes a tool.
   * @param {string} toolName - The name of the tool to execute.
   * @param {object} args - Arguments to pass to the tool's execute function.
   * @returns {Promise<any>} A Promise that resolves with the result of the tool execution.
   * @throws {Error} If the tool is not found.
   */
  async executeTool(toolName, args) {
    if (typeof toolName !== 'string' || toolName.trim() === '') {
      throw new Error('Tool name must be a non-empty string.');
    }

    const tool = this.tools[toolName];
    if (!tool) {
      throw new Error(`Tool with name '${toolName}' not found.`);
    }

    try {
      return await tool.execute(args);
    } catch (error) {
      console.error(`Error executing tool '${toolName}':`, error);
      throw error; // Re-throw the error to be handled by the caller.
    }
  }

  /**
   * Sets a value in the agent's internal state.
   * @param {string} key - The key to store the value under.
   * @param {any} value - The value to store.
   */
  setState(key, value) {
    if (typeof key !== 'string' || key.trim() === '') {
      console.warn('Invalid key provided to setState.');
      return;
    }
    this.state[key] = value;
  }

  /**
   * Gets a value from the agent's internal state.
   * @param {string} key - The key to retrieve the value for.
   * @returns {any} The value stored under the given key, or undefined if the key is not found.
   */
  getState(key) {
    if (typeof key !== 'string' || key.trim() === '') {
      return undefined;
    }
    return this.state[key];
  }

  /**
   * Returns a copy of all tasks.
   * @returns {Task[]} A new array containing all tasks.
   */
  getAllTasks() {
    return [...this.tasks]; // Returns a shallow copy of the tasks array
  }
}

module.exports = Agent;