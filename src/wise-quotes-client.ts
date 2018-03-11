import Quotes, { Quote } from './quotes';
import { randomInt } from './utils';

interface Options {
  language?: string|string[];
  includedTags?: string[];
  excludedTags?: string[];
}

export default class WiseQuotesClient {
  options: Options;
  quotes: Quote[];

  constructor(options: Options = {}) {
    this.options = {...this.getDefaultOptions(), ...options};
    this.quotes = this.filteredQuotes();
  }

  get status(): string {
    return `language: ${this.options.language} count: ${this.quotes.length}`;
  }

  getDefaultOptions(): Options {
    return {
      language: 'all',
      includedTags: [],
      excludedTags: [],
    };
  }

  random(): Quote {
    const index = randomInt(0, this.quotes.length);
    return this.quotes[index];
  }

  filterByTag(tag: string): Quote[] {
    return this.quotes.filter(q => q.tags.indexOf(tag) > -1);
  }

  protected filteredQuotes(): Quote[] {
    let quotes = Quotes;
    quotes = this.languageFiltering(quotes);
    quotes = this.includeTags(quotes);
    return this.excludeTags(quotes);
  }

  protected languageFiltering(quotes: Quote[]): Quote[] {
    if (this.options.language === 'all') {
      return quotes;
    } else if (typeof this.options.language === 'string') {
      return quotes.filter(q => q.language === this.options.language);
    } else if (Array.isArray(this.options.language)) {
      let qs: Quote[] = [];
      this.options.language.forEach(lang => {
        qs = qs.concat(quotes.filter(q => q.language === lang));
      });
      return qs;
    } else {
      return quotes;
    }
  }

  protected includeTags(quotes: Quote[]): Quote[] {
    if (!this.options.includedTags.length) {
      return quotes;
    }
    let qs: Quote[] = [];
    this.options.includedTags.forEach(tag => {
      qs = qs.concat(quotes.filter(q => q.tags.indexOf(tag) > -1));
    });
    return qs;
  }

  protected excludeTags(quotes: Quote[]): Quote[] {
    if (!this.options.excludedTags.length) {
      return quotes;
    }
    let qs = quotes;
    this.options.excludedTags.forEach(tag => {
      qs = qs.filter(q => q.tags.indexOf(tag) === -1);
    });
    return qs;
  }
}
