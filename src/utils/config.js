import fs from 'fs';

const ConfigName = './.push-config.json';

export function hasConfig() {
  try {
    require(ConfigName);
    return true;
  }
  catch(e) {
    return false;
  }
}

export function getConfig() {
  return new Promise((resolve, reject) => resolve(require(ConfigName)));
}

export function setConfig(configData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(ConfigName, JSON.stringify(configData), err => {
      if (err) reject(err);
      else resolve();
    });
  });
}
