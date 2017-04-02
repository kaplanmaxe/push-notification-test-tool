#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _Push = require('./Push');

var _Push2 = _interopRequireDefault(_Push);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version('1.0.0');

_commander2.default.command('setup').description('set up enviromentals to send push notifications').option('--androidSenderAPIKey [apiKey]', 'Android API Key').option('--iosCert <path>', 'iOS .p8 cert').option('--iosTeamId [teamId]', 'iOS Team ID').option('--iosKeyId [keyId]', 'iOS Key ID').option('--iosEnv [env]', 'iOS Env (Sandbox | Production)').option('--bundle [bundleId]', 'Bundle ID').action(function (options) {
  _fs2.default.writeFile('./config.json', JSON.stringify({
    androidSenderAPIKey: options.androidSenderAPIKey || '',
    iosCert: options.iosCert || '',
    iosTeamId: options.iosTeamId || '',
    iosKeyId: options.iosKeyId || '',
    iosEnv: options.iosEnv || '',
    bundle: options.bundle || ''
  }), function (err) {
    if (err) throw err;
    console.log('Config saved successfully!');
  });
});

_commander2.default.command('send [os]').option('-t, --title [title]', 'Title of Push Notification').option('-m, --message [message]', 'Push Notification Message').option('-d, --devices [devices]', 'String or array of PN tokens for devices').action(function (os, options) {
  if (!['android', 'ios'].includes(os.toLowerCase())) throw new Error(os + ' is not supported.');
  var config = {};
  if (_fs2.default.existsSync('./config.json')) {
    config = JSON.parse(_fs2.default.readFileSync('./config.json', 'utf8'));
  } else {
    throw new Error('You must run "pushtester setup" first');
  }

  if (!options.title || !options.message || !options.devices) {
    throw new Error('You must specify a title, message, and device tokens. Run pushtester send --help for more information.');
  }
  if (os.toLowerCase() === 'ios') {
    _Push2.default.ios(config, {
      title: options.title,
      message: options.message
    }, options.devices);
  } else if (os.toLowerCase() === 'android') {
    _Push2.default.android(config, {
      title: options.title,
      message: options.message
    }, options.devices);
  }
});

_commander2.default.parse(process.argv);