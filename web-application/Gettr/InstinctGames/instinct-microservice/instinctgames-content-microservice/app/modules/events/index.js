import {events} from '../../common/constants';
import NotificationManager from '../notifications';

class EventController {
    static addListeners() {
        if (!eventEmitter)
            return false;
        eventEmitter.addListener(events.SEND_NOTIFICATION, NotificationManager.sendNotification);
    }
}

export default EventController;