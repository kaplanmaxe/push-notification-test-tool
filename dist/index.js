#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _push = require('./push');

var _push2 = _interopRequireDefault(_push);

var _config = require('./utils/config');

var _payload = require('./utils/payload');

var _payload2 = _interopRequireDefault(_payload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('1.0.0');

_commander2.default.command('setup').description('set up enviromentals to send push notifications').option('--androidSenderAPIKey [apiKey]', 'Android API Key').option('--iosCert <path>', 'iOS .p8 cert').option('--iosTeamId [teamId]', 'iOS Team ID').option('--iosKeyId [keyId]', 'iOS Key ID').option('--iosEnv [env]', 'iOS Env (Sandbox | Production)').option('--bundle [bundleId]', 'Bundle ID').action(function (options) {
  var androidSenderAPIKey = options.androidSenderAPIKey,
      iosCert = options.iosCert,
      iosTeamId = options.iosTeamId,
      iosKeyId = options.iosKeyId,
      iosEnv = options.iosEnv,
      bundle = options.bundle;


  (0, _config.setConfig)({ androidSenderAPIKey: androidSenderAPIKey, iosCert: iosCert, iosTeamId: iosTeamId, iosKeyId: iosKeyId, iosEnv: iosEnv, bundle: bundle }).then(function () {
    console.log('Config saved successfully!');
  }).catch(console.error.bind(console));
});

_commander2.default.command('send [os]').option('-t, --title [title]', 'Title of Push Notification').option('-m, --message [message]', 'Push Notification Message').option('-d, --devices [devices]', 'String or array of PN tokens for devices').option('-p --payload [payload]', 'String version of the json payload').option('-f --payload-file [payloadFile]', 'Path for the json payload file').action(function (os, options) {
  if (!os || !['android', 'ios'].includes(os.toLowerCase())) throw new Error(os + ' is not supported.');
  if (!(0, _config.hasConfig)()) throw new Error('You must run "pushtester setup" first');

  Promise.all([(0, _payload2.default)(options.payload, options.payloadFile), (0, _config.getConfig)()]).then(function (res) {
    var payload = res[0];
    var config = res[1];
    var title = options.title,
        message = options.message,
        devices = options.devices;

    if (!title || !message || !devices) {
      throw new Error('You must specify a title, message, and device tokens. Run pushtester send --help for more information.');
    }
    var data = { title: title, message: message, payload: payload };
    return _push2.default[os].call(_push2.default, config, data, options.devices);
  }).then(function () {
    console.log('Push sent successfully!');
  }).catch(console.error.bind(console));
});

_commander2.default.parse(process.argv);