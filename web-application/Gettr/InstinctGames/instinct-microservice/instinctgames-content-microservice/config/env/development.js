module.exports = {
  DB:
    process.env.DB ||
    "mongodb://instinctgamesdev:windyfork75@127.0.0.1:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&retryWrites=false",
  AMQP_HOST_URL:"amqps://instinct-games-dev:3mptyWorm312@b-01488d03-8773-45d9-884a-9f9a08bb17e8.mq.us-east-1.amazonaws.com:5671",
  PORT: process.env.PORT || "3000",
  NOTIFICATION_EXCHANGE: process.env.NOTIFICATION_EXCHANGE || 'notification_exchange',
  NOTIFICATION_QUEUE: process.env.NOTIFICATION_QUEUE || 'notification_queue',
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || "true",
  USER_PORTAL_URL: process.env.USER_PORTAL_URL ||
  "http://instinct-games-elb-dev-1505566156.us-east-1.elb.amazonaws.com/transaction-details/",
  ADMIN_SERVICE_BASEURL:
    process.env.ADMIN_SERVICE_BASEURL ||
    "http://instinct-games-elb-dev-1505566156.us-east-1.elb.amazonaws.com:3001",
  TRANSACTION_SERVICE_BASEURL:
    process.env.TRANSACTION_SERVICE_BASEURL ||
    "http://instinct-games-elb-dev-1505566156.us-east-1.elb.amazonaws.com:3003",
  USER_SERVICE_BASEURL:
      process.env.USER_SERVICE_BASEURL ||
      "http://instinct-games-elb-dev-1505566156.us-east-1.elb.amazonaws.com:3002",
  CDN_BASE_URL:
    process.env.CDN_BASE_URL || "https://du1xtrg0r7yp2.cloudfront.net/",
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || "instinct-games-s3-dev",
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || "AKIASC2YPZOYMR42OR4W",
  AWS_SECRET_KEY:
    process.env.AWS_SECRET_KEY || "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",
  IPFS_URL: process.env.IPFS_IP || "http://3.94.103.12:5001",
  IPFS_HOST_URL: process.env.IPFS_HOST_URL || "https://ipfs.io/ipfs/",
  FOLDER_NAME: process.env.FOLDER_NAME || "nftFiles",
};
