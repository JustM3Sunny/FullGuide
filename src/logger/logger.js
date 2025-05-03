/**
 * src/logger/logger.js
 *
 * A simple logging utility for Node.js applications.
 * Provides basic logging functionalities with different levels.
 */

const levels = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  FATAL: 4,
};

const levelStrings = {
  [levels.DEBUG]: 'DEBUG',
  [levels.INFO]: 'INFO',
  [levels.WARN]: 'WARN',
  [levels.ERROR]: 'ERROR',
  [levels.FATAL]: 'FATAL',
};

let currentLevel = levels.INFO; // Default log level

/**
 * Sets the current logging level.
 * @param {string} levelString - The logging level as a string (e.g., 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL').
 */
function setLevel(levelString) {
  const levelStringUpper = levelString.toUpperCase();
  if (levelStrings[levels[levelStringUpper]] !== undefined) {
    currentLevel = levels[levelStringUpper];
  } else {
    console.warn(`Invalid log level: ${levelString}. Using default level: INFO.`);
  }
}

/**
 * Logs a message to the console with the specified level.
 * @param {number} level - The logging level (e.g., levels.DEBUG, levels.INFO).
 * @param {string} message - The message to log.
 * @param  {...any} args - Additional arguments to log.
 */
function log(level, message, ...args) {
  if (level >= currentLevel) {
    const timestamp = new Date().toISOString();
    const levelString = levelStrings[level];
    console.log(`${timestamp} [${levelString}] ${message}`, ...args);
  }
}

/**
 * Logs a debug message.
 * @param {string} message - The message to log.
 * @param  {...any} args - Additional arguments to log.
 */
function debug(message, ...args) {
  log(levels.DEBUG, message, ...args);
}

/**
 * Logs an info message.
 * @param {string} message - The message to log.
 * @param  {...any} args - Additional arguments to log.
 */
function info(message, ...args) {
  log(levels.INFO, message, ...args);
}

/**
 * Logs a warning message.
 * @param {string} message - The message to log.
 * @param  {...any} args - Additional arguments to log.
 */
function warn(message, ...args) {
  log(levels.WARN, message, ...args);
}

/**
 * Logs an error message.
 * @param {string} message - The message to log.
 * @param  {...any} args - Additional arguments to log.
 */
function error(message, ...args) {
  log(levels.ERROR, message, ...args);
}

/**
 * Logs a fatal message.
 * @param {string} message - The message to log.
 * @param  {...any} args - Additional arguments to log.
 */
function fatal(message, ...args) {
  log(levels.FATAL, message, ...args);
}

module.exports = {
  setLevel,
  debug,
  info,
  warn,
  error,
  fatal,
  levels, // Export the levels for easy access
};