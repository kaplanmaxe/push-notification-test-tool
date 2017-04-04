'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apn = require('apn');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ios = function () {
  function Ios() {
    _classCallCheck(this, Ios);
  }

  _createClass(Ios, null, [{
    key: 'send',

    /**
     * Sends an iOS push notification via APNS
     *
     * @param {object} config Configuration object
     * @param {object} body Body containing title, message, and payload
     * @param {string|array} tokens Device tokens to send PN to
     * @return {Promise}
     */
    value: function send(config, body, tokens) {
      var apnProvider = Ios.genProvider(config.iosCert, config.iosKeyId, config.iosTeamId, config.iosEnv.toLowerCase() === 'production');

      var note = Ios.genNote(body.title, body.message, body.payload, config.bundle);

      return apnProvider.send(note, tokens);
    }

    /**
     * Generates the provider object needed for APNS
     *
     * @param {string} key Absolute path to key
     * @param {string} keyId Id of key
     * @param {string} teamId Apple developer team id
     * @param {boolean} isProduction Production mode
     * @return {Provider}
     */

  }, {
    key: 'genProvider',
    value: function genProvider(key, keyId, teamId, isProduction) {
      return new _apn.Provider({
        token: { key: key, keyId: keyId, teamId: teamId },
        production: isProduction
      });
    }

    /**
     * Generates the notification object needed for APNS
     *
     * @param {string} title Title of notification
     * @param {object} body Body of notification including title and message
     * @param {object} payload Payload sent with PN
     * @param {string} topic Bundle id of App
     * @return {Notification}
     */

  }, {
    key: 'genNote',
    value: function genNote(title, body, payload, topic) {
      return new _apn.Notification({ body: body, title: title, payload: payload, topic: topic });
    }
  }]);

  return Ios;
}();

exports.default = Ios;