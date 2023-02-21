import APP from "express";
import DBConnection from "./config/dbConnection";
import Utils from "./app/utils";
import Config from "./config";
import routes from "./routes";
import { httpConstants } from "./app/common/constants";
import EventEmitter from './app/service/eventEmitter'
import EventController from "./app/modules/events";

const LHTAMQP = require('./lhtamqpclientlibrary');

const app = new APP();
require("./config/express")(app);
global.lhtWebLog = Utils.lhtLog;
global.basedir = __dirname
global.eventEmitter = new EventEmitter();

app.set("view engine", "pug");
class Server {
  static listen() {
    Promise.all([DBConnection.connect(),LHTAMQP.conn(Config.AMQP_HOST_URL)])
      .then(() => {
        app.listen(Config.PORT);
        EventController.addListeners('test');
        Utils.lhtLog(
          "listen",
          `Server Started on port ${Config.PORT}`,
          {},
          "Anurag",
          httpConstants.LOG_LEVEL_TYPE.INFO
        );
        routes(app);
      })
      .catch((error) =>
       console.log(error)
      );
  }
}

Server.listen();
