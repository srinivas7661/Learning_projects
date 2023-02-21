import Config from ".";
import mongoose from "mongoose";
import fs from "fs";

export default class DBConnection {
  static connect() {
    console.log(
      "DB trying to connect on " + new Date() + " to url" + Config.DB
    );

    const options = {
      keepAlive: 1,
      autoReconnect: true,
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslValidate: false,
      useCreateIndex: true,
      retryWrites: false,
      sslCA: [fs.readFileSync("./rds-combined-ca-bundle.pem")],
    };
    return mongoose.connect(Config.DB, options);
  }
}
