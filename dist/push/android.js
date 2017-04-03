'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (config, body, tokens) {
  var registrationTokens = (typeof tokens === 'undefined' ? 'undefined' : _typeof(tokens)) === 'object' ? tokens : [tokens];
  var sender = new _nodeGcm.Sender(config.androidSenderAPIKey);
  var notification = genMessage(body.title, body.message, body.payload, config.bundle);
  return new Promise(function (resolve, reject) {
    sender.send(notification, { registrationTokens: registrationTokens }, function (err) {
      if (err) reject(err);else resolve();
    });
  });
};

var _nodeGcm = require('node-gcm');

function genMessage(title, body, payload, restrictedPackageName) {
  return new _nodeGcm.Message({
    notification: { title: title, body: body },
    restrictedPackageName: restrictedPackageName
  });
}