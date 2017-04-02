import { Provider, Notification } from 'apn';
import { Sender, Message } from 'node-gcm';

export default class Push {

  /**
   * Send an iOS push notifications
   *
   * @param {object} config
   * @param {string} message
   * @param {string|array} tokens
   */
  static ios(config, message, tokens) {
    const apnProvider = new Provider({
      token: {
        key: config.iosCert,
        keyId: config.iosKeyId,
        teamId: config.iosTeamId
      },
      production: config.iosEnv.toLowerCase() === 'production'
    });
    const note = new Notification({
      body: message,
      title: 'New Interaction',
      topic: config.bundle
    });

    apnProvider.send(note, tokens)
    .then(() => {
      apnProvider.shutdown();
    }, err => {
      console.log(err);
    });
  }

  static android(config, body, tokens) {
    // Make sure devices is an array.
    const registrationTokens = typeof tokens === 'object' ? tokens : [tokens];
    const sender = new Sender(config.androidSenderAPIKey);

    console.log(config.bundle);
    console.log(body.title);
    console.log(body.message);
    console.log(registrationTokens);
    const notification = new Message({
      restrictedPackageName: config.bundle,
      notification: {
        title: body.title,
        body: body.message
      }
    });
    sender.send(notification, { registrationTokens }, err => {
      if (err) throw err;
      console.log('Android notification sent!');
    });
  }
}
