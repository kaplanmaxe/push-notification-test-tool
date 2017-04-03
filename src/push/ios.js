import { Provider, Notification } from 'apn';

export default function(config, body, tokens) {
  const apnProvider = getProvider(
    config.iosCert,
    config.iosKeyId,
    config.iosTeamId,
    config.iosEnv.toLowerCase() === 'production'
  )

  const note = genNote(body.title, body.message, body.payload, config.bundle);

  return apnProvider.send(note, tokens)
    .then(() => apnProvider.shutdown())
    .catch(err => console.log(err));
}

function getProvider(key, keyId, teamId, isProduction) {
  return new Provider({
    token: { key, keyId, teamId },
    production: isProduction
  })
}

function genNote(title, message, payload, topic) {
  return new Notification({ body, title, payload, topic });
}
