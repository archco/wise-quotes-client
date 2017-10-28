const Quotes = require('../data/quotes.json');

class WiseQuotesClient {
  constructor(option = {}) {
    this.option = Object.assign(this.getDefaultOption(), option);
    this.quotes = this._filteredQuotes();
  }

  get status() {
    return `language: ${this.option.language} count: ${this.quotes.length}`;
  }

  getDefaultOption() {
    return {
      language: 'all',
      includedTags: [],
      excludedTags: [],
    };
  }

  read(index) {
    return this.quotes[index];
  }

  all() {
    return this.quotes;
  }

  random() {
    let index = this._getRandomInt(0, this.quotes.length);
    return this.quotes[index];
  }

  retrieveByTagName(name) {
    return this.quotes.filter(quote => quote.tags.includes(name));
  }

  /**
   * returns a random integer between two values.
   *
   * @param  {Number} min  the next integer greater than min if min isn't an integer
   * @param  {Number} max  less than (but not equal to)
   * @return {Number} integer min =< value < max
   */
  _getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  _filteredQuotes() {
    // filtering by language.
    let quotes = this._filteringByLanguages(Quotes);

    // filtering by tags. (inculude or exclude)
    quotes = this._filteringByTags(quotes);

    return quotes;
  }

  _filteringByLanguages(quotes) {
    if (this.option.language == 'all') {
      return quotes;
    } else if (typeof this.option.language == 'string') {
      return this._quotesByLang(quotes, this.option.language);
    } else if (Array.isArray(this.option.language)) {
      let qs = [];

      this.option.language.forEach(lang => {
        qs = qs.concat(this._quotesByLang(quotes, lang));
      });

      return qs;
    } else {
      return quotes;
    }
  }

  _filteringByTags(quotes) {
    quotes = this._includingTags(quotes);
    quotes = this._exculdingTags(quotes);
    return quotes;
  }

  _quotesByLang(quotes, lang) {
    return quotes.filter(quote => quote.language == lang);
  }

  _includingTags(quotes) {
    if (!this.option.includedTags.length) return quotes;
    let qs = [];

    this.option.includedTags.forEach(tag => {
      qs = qs.concat(quotes.filter(q => q.tags.includes(tag)));
    });

    return qs;
  }

  _exculdingTags(quotes) {
    if (!this.option.excludedTags.length) return quotes;
    let qs = quotes;

    this.option.excludedTags.forEach(tag => {
      qs = qs.filter(q => !q.tags.includes(tag));
    });

    return qs;
  }
}

module.exports = WiseQuotesClient;
