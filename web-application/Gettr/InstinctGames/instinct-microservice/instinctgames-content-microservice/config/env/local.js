module.exports = {
  DB:
    process.env.DB ||
    "mongodb://instinctgamesdev:windyfork75@127.0.0.1:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&retryWrites=false",
  PORT: process.env.PORT || "3000",
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || "true",
};
