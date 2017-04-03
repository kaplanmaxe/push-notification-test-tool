'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ios2 = require('./ios');

var _ios3 = _interopRequireDefault(_ios2);

var _android2 = require('./android');

var _android3 = _interopRequireDefault(_android2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Push = function () {
  function Push() {
    _classCallCheck(this, Push);
  }

  _createClass(Push, null, [{
    key: 'ios',
    value: function ios(config, body, tokens) {
      return _ios3.default.send(config, body, tokens);
    }
  }, {
    key: 'android',
    value: function android(config, body, tokens) {
      return _android3.default.send(config, body, tokens);
    }
  }]);

  return Push;
}();

exports.default = Push;