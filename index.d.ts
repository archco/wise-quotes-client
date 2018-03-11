/** The data structure of the quote. */
export interface Quote {
  rowid: number;
  author: string;
  content: string;
  language: string;
  tags: string[];
}

/** Options for WiseQuotesClient. */
export interface Options {
  /**
   * Two letter language codes. (ISO 639-1)
   *
   * @see https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
   * @type {(string|string[])}
   */
  language?: string|string[];

  /** The tags that will include into quote collection. */
  includedTags?: string[];
  /** The tags that will exclude from quote collection. */
  excludedTags?: string[];
}

export default class WiseQuotesClient {
  options: Options;
  quotes: Quote[];

  /**
   * Displaying quotes status. e.g. `language: all, count: 100`
   *
   * @type {string}
   */
  readonly status: string;

  /**
   * Creates an instance of WiseQuotesClient.
   * @param {Options} [options]
   */
  constructor(options?: Options);

  /**
   * Returns default options.
   *
   * @returns {Options}
   */
  getDefaultOptions(): Options;

  /**
   * Returns quote randomly.
   *
   * @returns {Quote}
   */
  random(): Quote;

  /**
   * Returns quotes that has this tag name.
   *
   * @param {string} tag
   * @returns {Quote[]}
   */
  filterByTag(tag: string): Quote[];
}
