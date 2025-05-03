const logger = require('../logger/logger');

async function calculate(expression) {
  try {
    logger.info(`Calculating expression: ${expression}`);
    // Basic validation to prevent arbitrary code execution
    if (!/^[0-9+\-*/(). ]+$/.test(expression)) {
      throw new Error('Invalid expression. Only numbers and basic operators are allowed.');
    }
    // eslint-disable-next-line no-eval
    const result = eval(expression);
    logger.info(`Calculation result: ${result}`);
    return result.toString();
  } catch (error) {
    logger.error(`Error calculating expression: ${error.message}`);
    return `Error: ${error.message}`;
  }
}

module.exports = calculate;