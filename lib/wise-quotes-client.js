'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Quotes = require('../data/quotes.json');

var DefaultOption = {
  language: 'all'
};

var WiseQuotesClient = function () {
  function WiseQuotesClient(option) {
    _classCallCheck(this, WiseQuotesClient);

    this.option = Object.assign({}, DefaultOption, option);
    this.quotes = this._initQuotes();
  }

  _createClass(WiseQuotesClient, [{
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
    key: '_initQuotes',
    value: function _initQuotes() {
      if (this.option.language == 'all') {
        return Quotes;
      } else if (typeof this.option.language == 'string') {
        return this._getQuotesByLang(this.option.language);
      } else if (Array.isArray(this.option.language)) {
        var quotes = [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.option.language[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var lang = _step.value;

            quotes = quotes.concat(this._getQuotesByLang(lang));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return quotes;
      }

      return Quotes;
    }
  }, {
    key: '_getQuotesByLang',
    value: function _getQuotesByLang(lang) {
      var quotes = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Quotes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var row = _step2.value;

          if (row.language == lang) {
            quotes.push(row);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return quotes;
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