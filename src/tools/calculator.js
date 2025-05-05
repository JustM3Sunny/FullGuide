/**
 * src/tools/calculator.js
 *
 * A simple calculator tool for performing basic arithmetic operations.
 * This module provides functions for addition, subtraction, multiplication,
 * and division.  It's designed to be a standalone utility that can be
 * easily integrated into other applications.
 */

/**
 * Checks if a value is a number.
 * @param {*} value The value to check.
 * @returns {boolean} True if the value is a number, false otherwise.
 */
function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}


/**
 * Adds two numbers together.
 *
 * @param {number} a The first number.
 * @param {number} b The second number.
 * @returns {number} The sum of a and b.
 * @throws {TypeError} If either input is not a number.
 */
function add(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new TypeError('Both inputs must be numbers.');
  }
  return a + b;
}

/**
 * Subtracts one number from another.
 *
 * @param {number} a The number to subtract from.
 * @param {number} b The number to subtract.
 * @returns {number} The result of a - b.
 * @throws {TypeError} If either input is not a number.
 */
function subtract(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new TypeError('Both inputs must be numbers.');
  }
  return a - b;
}

/**
 * Multiplies two numbers together.
 *
 * @param {number} a The first number.
 * @param {number} b The second number.
 * @returns {number} The product of a and b.
 * @throws {TypeError} If either input is not a number.
 */
function multiply(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new TypeError('Both inputs must be numbers.');
  }
  return a * b;
}

/**
 * Divides one number by another.
 *
 * @param {number} a The number to divide.
 * @param {number} b The number to divide by.
 * @returns {number} The result of a / b.
 * @throws {TypeError} If either input is not a number.
 * @throws {Error} If attempting to divide by zero.
 */
function divide(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new TypeError('Both inputs must be numbers.');
  }
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }
  return a / b;
}

/**
 * Performs a calculation based on the provided operator and operands.
 *
 * @param {string} operator The operator to use (+, -, *, /).
 * @param {number} operand1 The first operand.
 * @param {number} operand2 The second operand.
 * @returns {number} The result of the calculation.
 * @throws {Error} If the operator is invalid.
 */
function calculate(operator, operand1, operand2) {
  switch (operator) {
    case '+':
      return add(operand1, operand2);
    case '-':
      return subtract(operand1, operand2);
    case '*':
      return multiply(operand1, operand2);
    case '/':
      return divide(operand1, operand2);
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }
}


module.exports = {
  add,
  subtract,
  multiply,
  divide,
  calculate
};