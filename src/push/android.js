import { Sender, Message } from 'node-gcm';

export default class Android {
  /**
   * Sends an Android push notification via gcm
   *
   * @param {object} config config object
   * @param {object} body containts title, message, and payload
   * @param {string|array} tokens array of tokens to send PN to
   */
  static send(config, body, tokens) {
    return new Promise((resolve, reject) => {
      const registrationTokens = typeof tokens === 'object' ? tokens : [tokens];
      const sender = new Sender(config.androidSenderAPIKey);
      const notification = Android.genMessage(
        body.title,
        body.message,
        body.payload,
        config.bundle
      );
      sender.send(notification, { registrationTokens }, err => {
        if (err) reject(err);
        else resolve();
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
  static genMessage(title, body, payload, restrictedPackageName) {
    return new Message({
      notification: {
        title,
        body
      },
      data: payload,
      restrictedPackageName
    });
  }
}
