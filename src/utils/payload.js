import fs from 'fs';

export function loadPayloadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
}


export default function parsePayload(payload, payloadFile) {
  if (payload) return Promise.resolve(JSON.parse(payload));
  else if (payloadFile) return loadPayloadFile(payloadFile);

  return Promise.resolve({});
}
