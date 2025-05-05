/**
 * src/memory/memory.js
 *
 * This module provides a simple in-memory storage mechanism for agents.
 * It's designed to be lightweight and easily replaceable with more persistent
 * storage solutions like databases or file systems.
 *
 * This is a basic implementation and can be extended to include features like:
 *  - Time-to-live (TTL) for stored data
 *  - Different storage strategies (e.g., LRU cache)
 *  - Integration with external storage systems
 */

class Memory {
  constructor() {
    this.store = new Map(); // Internal Map to hold the data
  }

  /**
   * Stores a key-value pair in memory.
   *
   * @param {string} key - The key to store the value under.
   * @param {any} value - The value to store.
   * @returns {Promise<void>}
   */
  set(key, value) {
    if (typeof key !== 'string') {
      return Promise.reject(new TypeError('Key must be a string.'));
    }
    this.store.set(key, value);
    return Promise.resolve();
  }

  /**
   * Retrieves a value from memory based on its key.
   *
   * @param {string} key - The key to retrieve the value for.
   * @returns {Promise<any | undefined>} The value associated with the key, or undefined if the key is not found.
   */
  get(key) {
    if (typeof key !== 'string') {
      return Promise.reject(new TypeError('Key must be a string.'));
    }
    const value = this.store.get(key);
    return Promise.resolve(value);
  }

  /**
   * Deletes a key-value pair from memory.
   *
   * @param {string} key - The key to delete.
   * @returns {Promise<void>}
   */
  delete(key) {
    if (typeof key !== 'string') {
      return Promise.reject(new TypeError('Key must be a string.'));
    }
    this.store.delete(key);
    return Promise.resolve();
  }

  /**
   * Clears all data from memory.
   * @returns {Promise<void>}
   */
  clear() {
    this.store.clear();
    return Promise.resolve();
  }

  /**
   * Checks if a key exists in memory.
   *
   * @param {string} key - The key to check.
   * @returns {Promise<boolean>} True if the key exists, false otherwise.
   */
  has(key) {
    if (typeof key !== 'string') {
      return Promise.reject(new TypeError('Key must be a string.'));
    }
    return Promise.resolve(this.store.has(key));
  }

  /**
   * Returns all keys currently stored in memory.
   *
   * @returns {Promise<string[]>} An array of keys.
   */
  keys() {
    return Promise.resolve(Array.from(this.store.keys()));
  }

  /**
   * Returns the number of items stored in memory.
   *
   * @returns {Promise<number>} The number of items.
   */
  size() {
    return Promise.resolve(this.store.size);
  }
}

module.exports = Memory;