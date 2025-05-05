const calculator = require('../src/tools/calculator');
const search = require('../src/tools/search');

describe('Tools', () => {
  describe('Calculator', () => {
    it('should calculate a valid expression', async () => {
      const result = await calculator('2 + 2');
      expect(result).toBe('4');
    });

    it('should handle an invalid expression', async () => {
      const result = await calculator('invalid expression');
      expect(result).toContain('Invalid expression');
    });
  });

  describe('Search', () => {
    const mockSearchResults = { results: ['result1', 'result2'] };
    const baseUrl = 'https://api.example.com/search'; // Define base URL
    const query = 'test query'; // Define the query
    const searchUrl = `${baseUrl}?q=${query}`; // Construct the URL

    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.restoreAllMocks(); // More robust restoration
    });

    it('should perform a search and return results', async () => {
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockSearchResults),
        ok: true, // Add ok: true for successful response
      });

      const result = await search(query);
      expect(result).toEqual(mockSearchResults.results); // Direct comparison
      expect(fetch).toHaveBeenCalledWith(searchUrl);
    });

    it('should handle a search error', async () => {
      const errorMessage = 'Search failed';
      global.fetch.mockRejectedValue(new Error(errorMessage));

      const result = await search(query);
      expect(result).toContain(errorMessage);
      expect(fetch).toHaveBeenCalledWith(searchUrl);
    });

    it('should handle a non-200 response', async () => {
      const status = 404;
      const statusText = 'Not Found';
      global.fetch.mockResolvedValue({
        ok: false,
        status: status,
        statusText: statusText,
      });

      const result = await search(query);
      expect(result).toContain(`HTTP error! status: ${status}`);
      expect(fetch).toHaveBeenCalledWith(searchUrl);
    });

    it('should handle an empty search result', async () => {
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({ results: [] }),
        ok: true,
      });

      const result = await search(query);
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalledWith(searchUrl);
    });
  });
});