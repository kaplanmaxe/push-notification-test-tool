import fs from 'fs';

const ConfigName = './.push-config.json';

export default class Config {
  /**
   * Checks if config file exists
   *
   * @param {boolean}
   */
  static hasConfig() {
    return fs.existsSync(ConfigName);
  }

  /**
   * Get config file
   *
   * @return {Promise}
   */
  static getConfig() {
    return new Promise((resolve, reject) => {
      fs.readFile(ConfigName, 'utf8', (err, data) => {
        if (err) reject(err);
        else resolve(JSON.parse(data));
      });
    });
  }

  /**
   * Sets config file
   *
   * @param {object} configData Config to set
   */
  static setConfig(configData) {
    return new Promise((resolve, reject) => {
      fs.writeFile(ConfigName, JSON.stringify(configData), err => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
