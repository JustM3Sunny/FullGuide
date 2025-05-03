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
    const searchUrl = 'https://api.example.com/search?q=test query';

    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      global.fetch.mockRestore();
    });

    it('should perform a search and return results', async () => {
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockSearchResults),
      });

      const result = await search('test query');
      expect(result).toEqual(expect.arrayContaining(mockSearchResults.results));
      expect(fetch).toHaveBeenCalledWith(searchUrl);
    });

    it('should handle a search error', async () => {
      global.fetch.mockRejectedValue(new Error('Search failed'));

      const result = await search('test query');
      expect(result).toContain('Search failed');
      expect(fetch).toHaveBeenCalledWith(searchUrl);
    });

    it('should handle a non-200 response', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const result = await search('test query');
      expect(result).toContain('HTTP error! status: 404');
      expect(fetch).toHaveBeenCalledWith(searchUrl);
    });
  });
});