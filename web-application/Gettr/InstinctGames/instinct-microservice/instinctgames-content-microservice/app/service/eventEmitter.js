import Utils from "../utils"
const EventEmitter = require('events');
let eventEmitter = null;

class Emitter {
    constructor() {
        if (!eventEmitter) {
            this.emitter = new EventEmitter();
            eventEmitter = this;
        }
        return eventEmitter;
    }

    raiseEvent(eventName, payload) {

        Utils.lhtLog('Emitter', `Listener Raised: ${eventName}`,{},"");
        this.emitter.emit(eventName, payload);
    }

    addListener(eventName, listener) {
        Utils.lhtLog('Emitter', `Listener Added: ${eventName}`,{},"");
        this.emitter.on(eventName, (payload) => {
            listener(eventName, payload);
        });
    }

    removeListener(eventName, listener) {
        Utils.lhtLog('Emitter', `Listener Removed: ${eventName}`,{},"");
        this.emitter.off(eventName, listener);
    }
}

export default Emitter;