/**
 * src/tools/search.js
 *
 * This module provides a simple search tool that can be used by other parts of the application.
 * It currently uses a basic in-memory search, but could be extended to use an external search service.
 */

/**
 * Performs a search operation.
 *
 * @param {string} query The search query.
 * @param {Array<string>} data The data to search within.  Each element is a string.
 * @returns {Array<string>} An array of strings that match the query.
 */
function search(query, data) {
  if (!query || !data || !Array.isArray(data)) {
    return []; // Return an empty array if the query or data is invalid.
  }

  const lowerCaseQuery = query.toLowerCase();
  const results = [];

  for (const item of data) {
    if (item && typeof item === 'string' && item.toLowerCase().includes(lowerCaseQuery)) {
      results.push(item);
    }
  }

  return results;
}

/**
 * A simple example dataset for searching.  In a real application, this would likely
 * come from a database or other external source.
 */
const exampleData = [
  "Apple pie recipe",
  "Banana bread instructions",
  "Cherry cheesecake ingredients",
  "Date squares baking tips",
  "Elderflower cordial preparation"
];

/**
 * Executes a search against the example data.  This is primarily for demonstration purposes.
 *
 * @param {string} query The search query.
 * @returns {Array<string>} The search results.
 */
function searchExample(query) {
  return search(query, exampleData);
}

/**
 * Exports the search function and the example search function.
 */
module.exports = {
  search,
  searchExample
};