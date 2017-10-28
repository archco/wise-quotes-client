const expect = require('chai').expect;

// test target.
const WiseQuotesClient = require('../index.js');
let wqc = new WiseQuotesClient();

describe('WiseQuotesClient', () => {
  describe('constructor', () => {
    it('Has property "option".', () => {
      expect(wqc).have.property('option');
    });

    it('Has property "quotes".', () => {
      expect(wqc).have.property('quotes');
    });
  });

  describe('#status', () => {
    it('It\'s getter. and it will return string.', () => {
      expect(wqc.status).to.be.a('string');
    });
  });

  describe('#read', () => {
    it('Returns quote as object.', () => {
      expect(wqc.read(0)).to.be.a('object');
    });
  });

  describe('#all', () => {
    it('Returns all quotes to array.', () => {
      let quotes = wqc.all();
      expect(quotes).to.be.a('array');
      expect(quotes).to.be.not.empty;
    });
  });

  describe('#random', () => {
    it('Returns random quote to object.', () => {
      expect(wqc.random()).to.be.a('object');
    });
  });

  describe('#retrieveByTagName', () => {
    it('Returns quotes that has given tag name.', () => {
      let quotes = wqc.retrieveByTagName('inspiration');
      expect(quotes).to.be.not.empty;
      expect(quotes[0].tags).to.be.include('inspiration');
    });
  });
});

describe('Option Test', () => {
  describe('language', () => {
    it('Set a single language as string.', () => {
      let wqc = new WiseQuotesClient({ language: 'ko' });
      expect(wqc.random().language).to.equal('ko');
    });

    it('Set multiple languages as array.', () => {
      let wqc = new WiseQuotesClient({ language: ['ko', 'en'] });
      expect(wqc.random().language).to
        .satisfy(lang => lang == 'ko' || lang == 'en');
    });
  });

  describe('includedTags', () => {
    it('Set quotes that has given tags.', () => {
      let wqc = new WiseQuotesClient({ includedTags: ['love', 'inspiration'] });
      expect(wqc.random().tags).to
        .satisfy(tags => tags.includes('love') || tags.includes('inspiration'));
    });
  });

  describe('excludedTags', () => {
    it('Set quotes that does not has given tags.', () => {
      let wqc = new WiseQuotesClient({ excludedTags: ['love', 'inspiration'] });
      expect(wqc.random().tags).to
        .satisfy(tags => !tags.includes('love') && !tags.includes('inspiration'));
    });
  });
});
