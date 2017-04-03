'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasConfig = hasConfig;
exports.getConfig = getConfig;
exports.setConfig = setConfig;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigName = './.push-config.json';

function hasConfig() {
  return _fs2.default.existsSync(ConfigName);
}

function getConfig() {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(ConfigName, 'utf8', function (err, data) {
      if (err) reject(err);else resolve(JSON.parse(data));
    });
  });
}

function setConfig(configData) {
  return new Promise(function (resolve, reject) {
    _fs2.default.writeFile(ConfigName, JSON.stringify(configData), function (err) {
      if (err) reject(err);else resolve();
    });
  });
}