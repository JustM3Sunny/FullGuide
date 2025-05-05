/**
 * @module tools
 * @description This module exports a collection of tools that can be used by other parts of the application.
 * Currently, it includes a calculator and a search tool.
 *
 * @example
 * // myNewTool.js
 * module.exports = {
 *   doSomething: (input) => {
 *     // Implement the tool's logic here
 *     return `Result of doing something with ${input}`;
 *   }
 * };
 *
 * // index.js (this file)
 * const calculator = require('./calculator');
 * const search = require('./search');
 * const myNewTool = require('./myNewTool');
 *
 * module.exports = {
 *   calculator,
 *   search,
 *   myNewTool,
 * };
 *
 * @description
 * The tools exported here are designed to be called by a central orchestration system.
 * This system is responsible for determining which tool to use based on the user's input or the current task.
 *
 * The orchestration system should:
 * 1. Receive user input or a task description.
 * 2. Analyze the input to determine which tool is most appropriate.
 * 3. Call the selected tool with the necessary parameters.
 * 4. Process the tool's output and return it to the user or use it for further processing.
 *
 * Each tool should be designed to be modular and reusable, with a clear and well-defined interface.
 * This allows the orchestration system to easily call and integrate different tools as needed.
 *
 * **Error Handling:**
 * Each tool should handle its own errors gracefully and return informative error messages to the orchestration system.
 * The orchestration system should then handle these errors appropriately, such as by logging them or displaying them to the user.  Consider using try/catch blocks and custom error classes.
 *
 * **Input Validation:**
 * Each tool should validate its input parameters to ensure that they are valid and within the expected range.
 * This helps to prevent errors and ensures that the tool functions correctly. Consider using a validation library like Joi or Zod.
 *
 * **Logging:**
 * Each tool should log important events, such as when it is called, what input parameters it receives, and what output it returns.
 * This helps to debug the tool and track its usage. Consider using a logging library like Winston, Bunyan, or Pino.
 *
 * **Security Considerations:**
 *  - **Input Sanitization:** Sanitize inputs to prevent injection attacks (e.g., XSS, SQL injection).  Use libraries designed for sanitization.
 *  - **Authorization and Authentication:** Implement proper authorization and authentication if tools handle sensitive data. Use established authentication protocols like OAuth 2.0 or JWT.
 *  - **Secrets Management:** Avoid storing sensitive data directly in the code or configuration files. Use environment variables, secure storage mechanisms (e.g., HashiCorp Vault), or dedicated secrets management services.
 *  - **Rate Limiting:** Implement rate limiting to prevent abuse and denial-of-service attacks.
 *  - **Regular Security Audits:** Conduct regular security audits and penetration testing to identify and address vulnerabilities.
 *
 * **Adding a New Tool:**
 * To add a new tool:
 * 1. Create a new file for the tool in the same directory (e.g., 'myNewTool.js').
 * 2. Implement the tool's functionality in that file.
 * 3. Require the tool in this file (e.g., `const myNewTool = require('./myNewTool');`).
 * 4. Add the tool to the module.exports object (e.g., `myNewTool`).
 */

const calculator = require('./calculator');
const search = require('./search');

module.exports = {
  calculator,
  search,
};