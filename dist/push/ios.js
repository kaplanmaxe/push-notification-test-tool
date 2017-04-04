'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config, body, tokens) {
  var apnProvider = getProvider(config.iosCert, config.iosKeyId, config.iosTeamId, config.iosEnv.toLowerCase() === 'production');

  var note = genNote(body.title, body.message, body.payload, config.bundle);

  return apnProvider.send(note, tokens).then(function () {
    apnProvider.shutdown();
  }).catch(function (err) {
    console.log(err);
  });
};

var _apn = require('apn');

function getProvider(key, keyId, teamId, isProduction) {
  return new _apn.Provider({
    token: { key: key, keyId: keyId, teamId: teamId },
    production: isProduction
  });
}

function genNote(title, body, payload, topic) {
  return new _apn.Notification({ body: body, title: title, payload: payload, topic: topic });
}