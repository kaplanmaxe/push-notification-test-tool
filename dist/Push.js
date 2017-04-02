'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apn = require('apn');

var _nodeGcm = require('node-gcm');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Push = function () {
  function Push() {
    _classCallCheck(this, Push);
  }

  _createClass(Push, null, [{
    key: 'ios',


    /**
     * Send an iOS push notifications
     *
     * @param {object} config
     * @param {string} message
     * @param {string|array} tokens
     */
    value: function ios(config, message, tokens) {
      var apnProvider = new _apn.Provider({
        token: {
          key: config.iosCert,
          keyId: config.iosKeyId,
          teamId: config.iosTeamId
        },
        production: config.iosEnv.toLowerCase() === 'production'
      });
      var note = new _apn.Notification({
        body: message,
        title: 'New Interaction',
        topic: config.bundle
      });

      apnProvider.send(note, tokens).then(function () {
        apnProvider.shutdown();
      }, function (err) {
        console.log(err);
      });
    }
  }, {
    key: 'android',
    value: function android(config, body, tokens) {
      // Make sure devices is an array.
      var registrationTokens = (typeof tokens === 'undefined' ? 'undefined' : _typeof(tokens)) === 'object' ? tokens : [tokens];
      var sender = new _nodeGcm.Sender(config.androidSenderAPIKey);

      console.log(config.bundle);
      console.log(body.title);
      console.log(body.message);
      console.log(registrationTokens);
      var notification = new _nodeGcm.Message({
        restrictedPackageName: config.bundle,
        notification: {
          title: body.title,
          body: body.message
        }
      });
      sender.send(notification, { registrationTokens: registrationTokens }, function (err) {
        if (err) throw err;
        console.log('Android notification sent!');
      });
    }
  }]);

  return Push;
}();

exports.default = Push;