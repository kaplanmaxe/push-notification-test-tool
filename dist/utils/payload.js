'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Payload = function () {
  function Payload() {
    _classCallCheck(this, Payload);
  }

  _createClass(Payload, null, [{
    key: 'loadPayloadFile',

    /**
     * Loads payload file
     *
     * @param {string} path Path to payload file
     * @return {Promise}
     */
    value: function loadPayloadFile(path) {
      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(path, 'utf8', function (err, data) {
          if (err) reject(err);else resolve(JSON.parse(data));
        });
      });
    }

    /**
     * Parses payload
     *
     * @param {object} payload Payload to send with PN
     * @param {string} payloadFile Path to payload file
     * @return {Promise}
     */

  }, {
    key: 'parsePayload',
    value: function parsePayload(payload, payloadFile) {
      if (payload) return Promise.resolve(JSON.parse(payload));else if (payloadFile) return Payload.loadPayloadFile(payloadFile);

      return Promise.resolve({});
    }
  }]);

  return Payload;
}();

exports.default = Payload;