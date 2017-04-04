'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfigName = './.push-config.json';

var Config = function () {
  function Config() {
    _classCallCheck(this, Config);
  }

  _createClass(Config, null, [{
    key: 'hasConfig',

    /**
     * Checks if config file exists
     *
     * @param {boolean}
     */
    value: function hasConfig() {
      return _fs2.default.existsSync(ConfigName);
    }

    /**
     * Get config file
     *
     * @return {Promise}
     */

  }, {
    key: 'getConfig',
    value: function getConfig() {
      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(ConfigName, 'utf8', function (err, data) {
          if (err) reject(err);else resolve(JSON.parse(data));
        });
      });
    }

    /**
     * Sets config file
     *
     * @param {object} configData Config to set
     */

  }, {
    key: 'setConfig',
    value: function setConfig(configData) {
      return new Promise(function (resolve, reject) {
        _fs2.default.writeFile(ConfigName, JSON.stringify(configData), function (err) {
          if (err) reject(err);else resolve();
        });
      });
    }
  }]);

  return Config;
}();

exports.default = Config;