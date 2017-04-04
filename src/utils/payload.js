import fs from 'fs';

export default class Payload {
  /**
   * Loads payload file
   *
   * @param {string} path Path to payload file
   * @return {Promise}
   */
  static loadPayloadFile(path) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      });
    });
  }

  /**
   * Parses payload
   *
   * @param {object} payload Payload to send with PN
   * @param {string} payloadFile Path to payload file
   * @return {Promise}
   */
  static parsePayload(payload, payloadFile) {
    if (payload) return Promise.resolve(JSON.parse(payload));
    else if (payloadFile) return Payload.loadPayloadFile(payloadFile);

    return Promise.resolve({});
  }
}
