import fs from 'fs';

const ConfigName = './.push-config.json';

export function hasConfig() {
  return fs.existsSync(ConfigName);
}

export function getConfig() {
  return new Promise((resolve, reject) => {
    fs.readFile(ConfigName, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}

export function setConfig(configData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(ConfigName, JSON.stringify(configData), err => {
      if (err) reject(err);
      else resolve();
    });
  });
}
