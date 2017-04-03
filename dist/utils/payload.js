'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadPayloadFile = loadPayloadFile;
exports.default = parsePayload;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadPayloadFile(path) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(path, 'utf8', function (err, data) {
      if (err) reject(err);else resolve(JSON.parse(data));
    });
  });
}

function parsePayload(payload, payloadFile) {
  if (payload) return Promise.resolve(JSON.parse(payload));else if (payloadFile) return loadPayloadFile(payloadFile);

  return Promise.resolve({});
}