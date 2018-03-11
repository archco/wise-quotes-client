import Quotes from './quotes.json';

export interface Quote {
  rowid: number;
  author: string;
  content: string;
  language: string;
  tags: string[];
}

export default Quotes as Quote[];
