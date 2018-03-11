const WiseQuotesClient = require('../dist/wise-quotes-client').default;

describe('#WiseQuotesClient', () => {
  const wq = new WiseQuotesClient();

  describe('#constructor', () => {
    it('can construct.', () => {
      expect(wq instanceof WiseQuotesClient).toBeTruthy();
      expect(wq.quotes.length).toBeGreaterThan(0);
    });

    it('set option `language`.', () => {
      const wq = new WiseQuotesClient({language: 'en'});
      expect(wq.quotes.every(q => q.language === 'en')).toBeTruthy();
    });

    it('set option `includedTags`.', () => {
      const wq = new WiseQuotesClient({includedTags: ['inspiration']});
      expect(wq.quotes.length).toBeTruthy();
      expect(wq.quotes.every(q => q.tags.includes('inspiration'))).toBeTruthy();
    });

    it('set option `excludedTags`.', () => {
      const wq = new WiseQuotesClient({excludedTags: ['life']});
      expect(wq.quotes.every(q => !q.tags.includes('life'))).toBeTruthy();
    });
  });

  describe('getter - status', () => {
    it('displaying status of the wise-quotes.', () => {
      expect(typeof wq.status).toBe('string');
    });
  });

  describe('property - quotes', () => {
    it('is array.', () => {
      expect(Array.isArray(wq.quotes)).toBeTruthy();
    });
  });

  describe('#random', () => {
    it('returns random quote as object.', () => {
      const q = wq.random();
      expect(typeof q).toBe('object');
      expect(q).toHaveProperty('author');
      expect(q).toHaveProperty('content');
      expect(q).toHaveProperty('language');
    });
  });

  describe('#filterByTag', () => {
    it('returns quotes that has this tag name.', () => {
      const quotes = wq.filterByTag('love');
      expect(quotes.length).toBeGreaterThan(0);
    });
  });
});
