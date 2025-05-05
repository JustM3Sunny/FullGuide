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
 * @throws {Error} If the provided level string is invalid.
 */
function setLevel(levelString) {
  const levelStringUpper = levelString.toUpperCase();
  const newLevel = levels[levelStringUpper];

  if (newLevel === undefined) {
    throw new Error(`Invalid log level: ${levelString}. Valid levels are: ${Object.keys(levels).join(', ')}`);
  }

  currentLevel = newLevel;
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
 * Creates a logging function for a specific level.
 * @param {number} level - The logging level.
 * @returns {function(string, ...any): void} - The logging function.
 */
const createLogger = (level) => {
  return (message, ...args) => {
    log(level, message, ...args);
  };
};

const debug = createLogger(levels.DEBUG);
const info = createLogger(levels.INFO);
const warn = createLogger(levels.WARN);
const error = createLogger(levels.ERROR);
const fatal = createLogger(levels.FATAL);


module.exports = {
  setLevel,
  debug,
  info,
  warn,
  error,
  fatal,
  levels, // Export the levels for easy access
};