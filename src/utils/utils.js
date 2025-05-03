/**
 * src/utils/utils.js
 *
 * This file contains utility functions for the application.
 * It provides helper functions for common tasks such as string manipulation,
 * data validation, and asynchronous operations.
 */

/**
 * Checks if a given string is empty or contains only whitespace.
 *
 * @param {string} str The string to check.
 * @returns {boolean} True if the string is empty or contains only whitespace, false otherwise.
 */
function isEmptyString(str) {
  if (!str) {
    return true;
  }
  return str.trim().length === 0;
}

/**
 * Generates a random string of a specified length.
 *
 * @param {number} length The desired length of the random string.
 * @returns {string} A random string.
 */
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Delays execution for a specified number of milliseconds.
 *
 * @param {number} ms The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validates if a given value is a valid email address.
 *
 * @param {string} email The email address to validate.
 * @returns {boolean} True if the email address is valid, false otherwise.
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str The string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalizeFirstLetter(str) {
  if (isEmptyString(str)) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Performs a deep copy of an object.  Handles circular references.
 *
 * @param {any} obj The object to deep copy.
 * @param {WeakMap} seenObjects A WeakMap to track already copied objects (for circular references).
 * @returns {any} A deep copy of the object.
 */
function deepCopy(obj, seenObjects = new WeakMap()) {
  // Check if the object is primitive or null
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // Check if the object has already been copied
  if (seenObjects.has(obj)) {
    return seenObjects.get(obj); // Return the previously copied object
  }

  let copy;

  if (Array.isArray(obj)) {
    copy = [];
    seenObjects.set(obj, copy); // Store the copy before recursion
    for (let i = 0; i < obj.length; i++) {
      copy[i] = deepCopy(obj[i], seenObjects);
    }
  } else {
    copy = {};
    seenObjects.set(obj, copy); // Store the copy before recursion
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopy(obj[key], seenObjects);
      }
    }
  }

  return copy;
}


module.exports = {
  isEmptyString,
  generateRandomString,
  delay,
  isValidEmail,
  capitalizeFirstLetter,
  deepCopy,
};