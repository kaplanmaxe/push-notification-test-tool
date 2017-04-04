#!/usr/bin/env node
import program from 'commander';
import Android from './push/Android';
import Ios from './push/Ios';
import Config from './utils/Config';
import Payload from './utils/Payload';

program
  .version('1.0.0');

program
  .command('setup')
  .description('set up enviromentals to send push notifications')
  .option('--androidSenderAPIKey [apiKey]', 'Android API Key')
  .option('--iosCert <path>', 'iOS .p8 cert')
  .option('--iosTeamId [teamId]', 'iOS Team ID')
  .option('--iosKeyId [keyId]', 'iOS Key ID')
  .option('--iosEnv [env]', 'iOS Env (Sandbox | Production)')
  .option('--bundle [bundleId]', 'Bundle ID')
  .action(options => {
    const {
      androidSenderAPIKey,
      iosCert,
      iosTeamId,
      iosKeyId,
      iosEnv,
      bundle
    } = options;

    Config.setConfig({ androidSenderAPIKey, iosCert, iosTeamId, iosKeyId, iosEnv, bundle })
      .then(() => {
        console.log('Config saved successfully!');
      })
      .catch(console.error.bind(console));
  });

program
  .command('send [os]')
  .option('-t, --title [title]', 'Title of Push Notification')
  .option('-m, --message [message]', 'Push Notification Message')
  .option('-d, --devices [devices]', 'String or array of PN tokens for devices')
  .option('-p --payload [payload]', 'String version of the json payload')
  .option('-f --payload-file [payloadFile]', 'Path for the json payload file')
  .action((os, options) => {
    if (!os || !['android', 'ios'].includes(os.toLowerCase())) throw new Error(`${os} is not supported.`);
    if (!Config.hasConfig()) throw new Error('You must run "pushtester setup" first');

    Promise.all([
      Payload.parsePayload(options.payload, options.payloadFile),
      Config.getConfig()
    ])
    .then(res => {
      const payload = res[0];
      const config = res[1];
      const { title, message, devices } = options;
      if (!title || !message || !devices) {
        throw new Error('You must specify a title, message, and device tokens. Run pushtester send --help for more information.');
      }
      const data = { title, message, payload };
      if (os.toLowerCase() === 'ios') {
        return Ios.send(config, data, options.devices);
      } else if (os.toLowerCase() === 'android') {
        return Android.send(config, data, options.devices);
      }
    })
    .then(() => {
      console.log('Push sent successfully!');
    })
    .catch(console.error.bind(console));
  });

program.parse(process.argv);
