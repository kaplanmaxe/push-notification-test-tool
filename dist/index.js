#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _Android = require('./push/Android');

var _Android2 = _interopRequireDefault(_Android);

var _Ios = require('./push/Ios');

var _Ios2 = _interopRequireDefault(_Ios);

var _Config = require('./utils/Config');

var _Config2 = _interopRequireDefault(_Config);

var _Payload = require('./utils/Payload');

var _Payload2 = _interopRequireDefault(_Payload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('1.0.0');

_commander2.default.command('setup').description('set up enviromentals to send push notifications').option('--androidSenderAPIKey [apiKey]', 'Android API Key').option('--iosCert <path>', 'iOS .p8 cert').option('--iosTeamId [teamId]', 'iOS Team ID').option('--iosKeyId [keyId]', 'iOS Key ID').option('--iosEnv [env]', 'iOS Env (Sandbox | Production)').option('--bundle [bundleId]', 'Bundle ID').action(function (options) {
  var androidSenderAPIKey = options.androidSenderAPIKey,
      iosCert = options.iosCert,
      iosTeamId = options.iosTeamId,
      iosKeyId = options.iosKeyId,
      iosEnv = options.iosEnv,
      bundle = options.bundle;


  _Config2.default.setConfig({ androidSenderAPIKey: androidSenderAPIKey, iosCert: iosCert, iosTeamId: iosTeamId, iosKeyId: iosKeyId, iosEnv: iosEnv, bundle: bundle }).then(function () {
    console.log('Config saved successfully!');
  }).catch(console.error.bind(console));
});

_commander2.default.command('send [os]').option('-t, --title [title]', 'Title of Push Notification').option('-m, --message [message]', 'Push Notification Message').option('-d, --devices [devices]', 'String or array of PN tokens for devices').option('-p --payload [payload]', 'String version of the json payload').option('-f --payload-file [payloadFile]', 'Path for the json payload file').action(function (os, options) {
  if (!os || !['android', 'ios'].includes(os.toLowerCase())) throw new Error(os + ' is not supported.');
  if (!_Config2.default.hasConfig()) throw new Error('You must run "pushtester setup" first');

  Promise.all([_Payload2.default.parsePayload(options.payload, options.payloadFile), _Config2.default.getConfig()]).then(function (res) {
    var payload = res[0];
    var config = res[1];
    var title = options.title,
        message = options.message,
        devices = options.devices;

    if (!title || !message || !devices) {
      throw new Error('You must specify a title, message, and device tokens. Run pushtester send --help for more information.');
    }
    var data = { title: title, message: message, payload: payload };
    if (os.toLowerCase() === 'ios') {
      return _Ios2.default.send(config, data, options.devices);
    } else if (os.toLowerCase() === 'android') {
      return _Android2.default.send(config, data, options.devices);
    }
  }).then(function () {
    console.log('Push sent successfully!');
  }).catch(console.error.bind(console));
});

_commander2.default.parse(process.argv);