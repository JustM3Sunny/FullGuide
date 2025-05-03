/**
 * src/tools/search.js
 *
 * This module provides a search tool that can be used by other parts of the application.
 * It currently uses a basic in-memory search, but could be extended to use an external search service.
 */

/**
 * Performs a search operation.
 *
 * @param {string} query The search query.
 * @param {string[]} data The data to search within.  Each element is a string.
 * @returns {string[]} An array of strings that match the query.
 */
function search(query, data) {
  if (!query || !data || !Array.isArray(data)) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return []; // Return empty array if query is only whitespace
  }

  const results = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (typeof item === 'string') {
      const normalizedItem = item.toLowerCase().trim();
      if (normalizedItem.includes(normalizedQuery)) {
        results.push(item);
      }
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
 * @returns {string[]} The search results.
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