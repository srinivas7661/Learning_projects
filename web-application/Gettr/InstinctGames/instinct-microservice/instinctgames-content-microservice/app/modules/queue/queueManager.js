import AMQPController from "../../../lhtamqpclientlibrary/index";
import Config from "../../../config";
import {amqpConstants} from "../../common/constants"

export default class RabbitMQ {
    async insertInQueue(exchangeName, queueName, replyQueue, topicKey, routingKey, replyKey, requestKey, exchangeType, queueType, queueData) {
        return await AMQPController.insertInQueue(exchangeName, queueName,
            replyQueue,
            topicKey,
            routingKey,
            replyKey,
            requestKey,
            exchangeType,
            queueType,
            queueData
        );
    }

    async initializeRabbitMQListener() {
      await AMQPController.getFromQueue(Config.NOTIFICATION_EXCHANGE, Config.NOTIFICATION_QUEUE, amqpConstants.exchangeType.FANOUT, amqpConstants.queueType.PUBLISHER_SUBSCRIBER_QUEUE, this.blockchainData, {}, {}, true, true, false, false, true, 100);
        return true;
    }

    async blockchainData(queueData, data) {
      if (!data) return;
        let newData = JSON.parse(data);
        console.log("newData", newData)
    }
}
