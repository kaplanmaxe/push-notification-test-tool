import ios from './ios';
import android from './android';

export default class Push {
    static ios(config, body, tokens) {
      return ios.send(config, body, tokens);
    }
    static android() {
      return android.send(config, body, tokens);
    }
}
