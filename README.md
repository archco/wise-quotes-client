# wise-quotes-client

The package of wise-saying and quotes. It's for browser.

## Installation

``` cmd
npm install wise-quotes-client
```

## Usage

``` js
import WiseQuotes from 'wise-quotes-client';

const wiseQuotes = new WiseQuotes({ language: 'en' });
const quote = wiseQuotes.random();
quote.author;  // "Albert Einstein"
quote.content; // "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe."
```

## Change log

Please see [CHANGELOG.md](https://github.com/archco/wise-quotes-client/blob/master/CHANGELOG.md)

## License

The [MIT License](https://github.com/archco/wise-quotes-client/blob/master/LICENSE)
