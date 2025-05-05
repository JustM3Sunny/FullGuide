/**
 * examples/agent_example.js
 *
 * This file provides a basic example of how to structure a simple agent in Node.js.
 * It focuses on the core logic of decision-making and action execution,
 * without relying on external AI libraries or services.
 *
 * This example demonstrates a hypothetical "Task Manager" agent that can:
 * 1. Receive a task description.
 * 2. Break down the task into smaller sub-tasks.
 * 3. Execute each sub-task using pre-defined "tools".
 * 4. Report the final result.
 *
 * Note: This is a simplified illustration and does not include actual AI capabilities.
 * It serves as a foundation for building more complex agents.
 */

/**
 * Represents a simple tool that the agent can use to perform actions.
 */
class Tool {
  /**
   * @param {string} name - The name of the tool.
   * @param {function(string): string} execute - The function that performs the tool's action.  Takes a task string and returns a result string.
   */
  constructor(name, execute) {
    if (typeof name !== 'string' || !name) {
      throw new Error('Tool name must be a non-empty string.');
    }
    if (typeof execute !== 'function') {
      throw new Error('Tool execute must be a function.');
    }

    this.name = name;
    this.execute = execute;
  }
}

/**
 * Represents the agent.
 */
class Agent {
  /**
   * @param {string} name
   */
  constructor(name) {
    if (typeof name !== 'string' || !name) {
      throw new Error('Agent name must be a non-empty string.');
    }
    this.name = name;
    this.tools = {}; // A dictionary to store available tools.
    this.taskQueue = []; // A queue to hold tasks.
  }

  /**
   * Adds a tool to the agent's repertoire.
   * @param {Tool} tool - The tool to add.
   */
  addTool(tool) {
    if (!(tool instanceof Tool)) {
      throw new Error('Invalid tool.  Must be an instance of the Tool class.');
    }
    if (this.tools[tool.name]) {
      console.warn(`Tool with name ${tool.name} already exists. Overwriting.`);
    }
    this.tools[tool.name] = tool;
  }

  /**
   * Receives a task and adds it to the task queue.
   * @param {string} taskDescription - A description of the task.
   */
  receiveTask(taskDescription) {
    if (typeof taskDescription !== 'string' || !taskDescription) {
      console.warn('Received an empty or invalid task description. Ignoring.');
      return;
    }
    this.taskQueue.push({ description: taskDescription, status: 'pending' });
    console.log(`${this.name}: Received task: ${taskDescription}`);
  }

  /**
   * Processes the task queue.
   * @async
   */
  async processTasks() {
    while (this.taskQueue.length > 0) {
      const task = this.taskQueue.shift();
      task.status = 'processing';
      console.log(`${this.name}: Processing task: ${task.description}`);

      // Simulate breaking down the task into sub-tasks.
      const subTasks = this.breakDownTask(task.description);

      // Execute each sub-task.  Use Promise.all to execute in parallel.
      const results = await Promise.all(this.executeSubTasks(subTasks));

      // Combine the results.
      const finalResult = this.combineResults(results);

      task.status = 'completed';
      task.result = finalResult;
      console.log(`${this.name}: Task completed. Result: ${finalResult}`);
    }
  }

  /**
   * Simulates breaking down a task into smaller sub-tasks.
   * In a real-world scenario, this would involve more complex logic.
   * @param {string} taskDescription - The description of the task.
   * @returns {string[]} - An array of sub-task descriptions.
   */
  breakDownTask(taskDescription) {
    console.log(`${this.name}: Breaking down task: ${taskDescription}`);
    // Simple example: Split the task description into words.
    return taskDescription.split(' ');
  }

  /**
   * Executes each sub-task using available tools.
   * @param {string[]} subTasks - An array of sub-task descriptions.
   * @returns {Promise<string>[]} - An array of Promises, each resolving to the result of a sub-task.
   */
  executeSubTasks(subTasks) {
    return subTasks.map(async (subTask) => {
      console.log(`${this.name}: Executing sub-task: ${subTask}`);

      // Find a suitable tool for the sub-task (very basic example).
      const tool = this.findToolForTask(subTask);

      if (tool) {
        try {
          const result = await tool.execute(subTask); // Await the tool execution
          console.log(`${this.name}: Sub-task completed with tool: ${tool.name}. Result: ${result}`);
          return result;
        } catch (error) {
          console.error(`${this.name}: Error executing tool ${tool.name} for sub-task ${subTask}:`, error);
          return `Error executing ${tool.name} for ${subTask}: ${error.message}`; // Return an error message
        }
      } else {
        console.log(`${this.name}: No tool found for sub-task: ${subTask}`);
        return `No tool found for: ${subTask}`;
      }
    });
  }

  /**
   * Finds a suitable tool for a given task.
   * This is a very basic example and would require more sophisticated logic in a real-world scenario.
   * @param {string} task - The task to find a tool for.
   * @returns {Tool | null} - The tool to use, or null if no suitable tool is found.
   */
  findToolForTask(task) {
    const lowerCaseTask = task.toLowerCase(); // Convert to lowercase once for efficiency

    if (lowerCaseTask.includes('calculate')) {
      return this.tools['calculator'];
    }
    if (lowerCaseTask.includes('search')) {
      return this.tools['searchEngine'];
    }
    return null;
  }

  /**
   * Combines the results from the sub-tasks into a final result.
   * @param {string[]} results - An array of results from each sub-task.
   * @returns {string} - The final result.
   */
  combineResults(results) {
    console.log(`${this.name}: Combining results: ${results}`);
    // Simple example: Join the results with a space.
    return results.join(' ');
  }
}

// Example Usage:

// Create some tools.
const calculatorTool = new Tool('calculator', async (task) => { // Make the execute function async
  // Simulate a calculation.
  console.log("Performing calculation");
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async operation
  return `Calculated result for ${task}`;
});

const searchEngineTool = new Tool('searchEngine', async (task) => { // Make the execute function async
  // Simulate a search.
  console.log("Performing search");
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate async operation
  return `Search results for ${task}`;
});

// Create an agent.
const myAgent = new Agent('TaskMaster');

// Add the tools to the agent.
myAgent.addTool(calculatorTool);
myAgent.addTool(searchEngineTool);

// Give the agent a task.
myAgent.receiveTask('Calculate the area of a circle and search for its properties.');

// Process the tasks.
myAgent.processTasks();