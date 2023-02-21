import * as AmqpController from "../../../lhtamqpclientlibrary";
import Config from "../../../config";
import { amqpConstants, notificationType, events, sendBy } from "../../common/constants";

const pug = require("pug");
const path = require("path");

class NotificationManager {
  static getEmailTemplate(pugObject) {
    // let infoFieldHtml = pug.renderFile(path.normalize(__dirname + '../../../views/emailTemplate.pug'), {
    //     TITLE: pugObject.title,
    //     BODY_TEXT: pugObject.body,
    //     BTN_TEXT: pugObject.btnText,
    //     HREF: pugObject.btnURL
    // });
    // return infoFieldHtml;
  }

  static async sendPushNotificationOnReport(notificationObj) {
    const notificationObject = {
      postedBy: events.POSTED_BY,
      type: notificationType.BELL,
      title: events.CONTENT_TITLE,
      description: events.CONTENT_DESCRIPTION,
    };
    this.insertInQueue({
      postedTo: notificationObj.userId,
      title: notificationObject.title,
      payload: {
        content: notificationObj.content,
      },
      postedBy: events.POSTED_BY,
      description: `${notificationObject.description}`,
      type: notificationType.BELL,
      userID: notificationObj.userId,
    });
  }

  static async sendNotificationOnRequest(notificationObj) {
    const notificationObject = {
      postedBy: events.POSTED_BY,
      type: notificationType.BELL,
      title: events.TOKEN_REQUEST_TITLE,
      description: events.TOKEN_REQUEST_DESCRIPTION,
    };
    this.insertInQueue({
      postedTo: notificationObj.userId,
      title: notificationObject.title,
      payload: {
        tokenName: notificationObj.tokenName,
      },
      postedBy: events.POSTED_BY,
      description: `${notificationObject.description}`,
      type: notificationType.BELL,
      userID: notificationObj.userId,
    });
  }

  static async insertInQueue(notificationObject) {
    if (!notificationObject || Object.keys(notificationObject).length < 1)
      return false;
    return await AmqpController.insertInQueue(
      Config.NOTIFICATION_EXCHANGE,
      Config.NOTIFICATION_QUEUE,
      {},
      {},
      {},
      {},
      {},
      amqpConstants.exchangeType.FANOUT,
      amqpConstants.queueType.PUBLISHER_SUBSCRIBER_QUEUE,
      notificationObject
    );
  }
}

export default NotificationManager;
