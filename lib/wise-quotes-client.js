'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quotes = require('../data/quotes.json');

var WiseQuotesClient = function () {
  function WiseQuotesClient() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WiseQuotesClient);

    this.option = Object.assign(this.getDefaultOption(), option);
    this.quotes = this._filteredQuotes();
  }

  _createClass(WiseQuotesClient, [{
    key: 'getDefaultOption',
    value: function getDefaultOption() {
      return {
        language: 'all',
        includedTags: [],
        excludedTags: []
      };
    }
  }, {
    key: 'read',
    value: function read(index) {
      return this.quotes[index];
    }
  }, {
    key: 'all',
    value: function all() {
      return this.quotes;
    }
  }, {
    key: 'random',
    value: function random() {
      var index = this._getRandomInt(0, this.quotes.length);
      return this.quotes[index];
    }
  }, {
    key: 'retrieveByTagName',
    value: function retrieveByTagName(name) {
      return this.quotes.filter(function (quote) {
        return quote.tags.includes(name);
      });
    }

    /**
     * returns a random integer between two values.
     *
     * @param  {Number} min  the next integer greater than min if min isn't an integer
     * @param  {Number} max  less than (but not equal to)
     * @return {Number} integer min =< value < max
     */

  }, {
    key: '_getRandomInt',
    value: function _getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
  }, {
    key: '_filteredQuotes',
    value: function _filteredQuotes() {
      // filtering by language.
      var quotes = this._filteringByLanguages(Quotes);

      // filtering by tags. (inculude or exclude)
      quotes = this._filteringByTags(quotes);

      return quotes;
    }
  }, {
    key: '_filteringByLanguages',
    value: function _filteringByLanguages(quotes) {
      var _this = this;

      if (this.option.language == 'all') {
        return quotes;
      } else if (typeof this.option.language == 'string') {
        return this._quotesByLang(quotes, this.option.language);
      } else if (Array.isArray(this.option.language)) {
        var qs = [];

        this.option.language.forEach(function (lang) {
          qs = qs.concat(_this._quotesByLang(quotes, lang));
        });

        return qs;
      } else {
        return quotes;
      }
    }
  }, {
    key: '_filteringByTags',
    value: function _filteringByTags(quotes) {
      quotes = this._includingTags(quotes);
      quotes = this._exculdingTags(quotes);
      return quotes;
    }
  }, {
    key: '_quotesByLang',
    value: function _quotesByLang(quotes, lang) {
      return quotes.filter(function (quote) {
        return quote.language == lang;
      });
    }
  }, {
    key: '_includingTags',
    value: function _includingTags(quotes) {
      if (!this.option.includedTags.length) return quotes;
      var qs = [];

      this.option.includedTags.forEach(function (tag) {
        qs = qs.concat(quotes.filter(function (q) {
          return q.tags.includes(tag);
        }));
      });

      return qs;
    }
  }, {
    key: '_exculdingTags',
    value: function _exculdingTags(quotes) {
      if (!this.option.excludedTags.length) return quotes;
      var qs = quotes;

      this.option.excludedTags.forEach(function (tag) {
        qs = qs.filter(function (q) {
          return !q.tags.includes(tag);
        });
      });

      return qs;
    }
  }, {
    key: 'status',
    get: function get() {
      return 'language: ' + this.option.language + ' count: ' + this.quotes.length;
    }
  }]);

  return WiseQuotesClient;
}();

module.exports = WiseQuotesClient;