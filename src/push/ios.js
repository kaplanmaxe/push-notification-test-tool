import { Provider, Notification } from 'apn';

export default class Ios {
  /**
   * Sends an iOS push notification via APNS
   *
   * @param {object} config Configuration object
   * @param {object} body Body containing title, message, and payload
   * @param {string|array} tokens Device tokens to send PN to
   * @return {Promise}
   */
  static send(config, body, tokens) {
    const apnProvider = Ios.genProvider(
      config.iosCert,
      config.iosKeyId,
      config.iosTeamId,
      config.iosEnv.toLowerCase() === 'production'
    );

    const note = Ios.genNote(body.title, body.message, body.payload, config.bundle);

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
  static genProvider(key, keyId, teamId, isProduction) {
    return new Provider({
      token: { key, keyId, teamId },
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
  static genNote(title, body, payload, topic) {
    return new Notification({ body, title, payload, topic });
  }
}
