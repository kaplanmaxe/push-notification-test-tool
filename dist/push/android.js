'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeGcm = require('node-gcm');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Android = function () {
  function Android() {
    _classCallCheck(this, Android);
  }

  _createClass(Android, null, [{
    key: 'send',

    /**
     * Sends an Android push notification via gcm
     *
     * @param {object} config config object
     * @param {object} body containts title, message, and payload
     * @param {string|array} tokens array of tokens to send PN to
     */
    value: function send(config, body, tokens) {
      return new Promise(function (resolve, reject) {
        var registrationTokens = (typeof tokens === 'undefined' ? 'undefined' : _typeof(tokens)) === 'object' ? tokens : [tokens];
        var sender = new _nodeGcm.Sender(config.androidSenderAPIKey);
        var notification = Android.genMessage(body.title, body.message, body.payload, config.bundle);
        sender.send(notification, { registrationTokens: registrationTokens }, function (err) {
          if (err) reject(err);else resolve();
        });
      });
    }

    /**
     * Generates a PN
     *
     * @param {string} title Title of PN
     * @param {string} body Message you would like to send
     * @param {object} payload Payload to send with PN
     * @param {string} restrictedPackageName package name of app
     */

  }, {
    key: 'genMessage',
    value: function genMessage(title, body, payload, restrictedPackageName) {
      return new _nodeGcm.Message({
        notification: {
          title: title,
          body: body
        },
        data: payload,
        restrictedPackageName: restrictedPackageName
      });
    }
  }]);

  return Android;
}();

exports.default = Android;