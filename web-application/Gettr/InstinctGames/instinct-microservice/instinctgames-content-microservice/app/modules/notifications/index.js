import { events } from "../../common/constants";
import NotificationManager from "./manager";

class NotificationController {
  static async sendNotification(eventName, payload) {
    if (!payload || !Object.keys(payload) || !payload.type || !payload.data)
      return false;
    switch (payload.type) {
      case events.REPORT_NFT:
        await NotificationManager.sendPushNotificationOnReport(payload.data);
        break;
      case events.TOKEN_REQUEST:
        await NotificationManager.sendNotificationOnRequest(payload.data);
        break;
      default:
        return;
    }
  }
}

export default NotificationController;
