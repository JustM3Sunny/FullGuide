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
    it('should perform a search', async () => {
      // Mock the fetch function for testing
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ results: ['result1', 'result2'] }),
        })
      );

      const result = await search('test query');
      expect(result).toContain('result1');
      expect(fetch).toHaveBeenCalledWith('https://api.example.com/search?q=test query');

      // Restore the original fetch function
      global.fetch.mockRestore();
    });

    it('should handle a search error', async () => {
      // Mock the fetch function to reject the promise
      global.fetch = jest.fn(() => Promise.reject(new Error('Search failed')));

      const result = await search('test query');
      expect(result).toContain('Search failed');

      // Restore the original fetch function
      global.fetch.mockRestore();
    });
  });
});