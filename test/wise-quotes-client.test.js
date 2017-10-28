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
});
