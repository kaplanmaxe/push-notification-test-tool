import { Sender, Message } from 'node-gcm';

export default function(config, body, tokens) {
  const registrationTokens = typeof tokens === 'object' ? tokens : [tokens];
  const sender = new Sender(config.androidSenderAPIKey);
  const notification = genMessage(body.title, body.message, body.payload, config.bundle);
  return new Promise((resolve, reject) => {
    sender.send(notification, { registrationTokens }, err => {
      if (err) reject(err);
      else resolve()
    });
  });
}

function genMessage(title, body, payload, restrictedPackageName) {
  return new Message({
    notification: { title, body },
    restrictedPackageName
  });
}
