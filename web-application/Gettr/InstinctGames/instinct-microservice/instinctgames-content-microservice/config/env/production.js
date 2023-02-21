module.exports = {
  DB:
      process.env.DB ||
      "mongodb://igdbprod:goldferret29@localhost:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&retryWrites=false",
  AMQP_HOST_URL:process.env.AMQP_HOST_URL || "amqps://instinct-games-prod:3mptyWorm312@b-2989f41e-c3e6-4f1f-b29b-1a1f69a33832.mq.us-east-2.amazonaws.com:5671",
  PORT: process.env.PORT || "3000",
  NOTIFICATION_EXCHANGE: process.env.NOTIFICATION_EXCHANGE || 'notification_exchange',
  NOTIFICATION_QUEUE: process.env.NOTIFICATION_QUEUE || 'notification_queue',
  IS_CONSOLE_LOG: process.env.IS_CONSOLE_LOG || "true",
  USER_PORTAL_URL: process.env.USER_PORTAL_URL ||
  "http://ig-lb-prod-1641661053.us-east-2.elb.amazonaws.com/transaction-details/",
  TRANSACTION_SERVICE_BASEURL: process.env.TRANSACTION_SERVICE_BASEURL || "http://ig-lb-prod-1641661053.us-east-2.elb.amazonaws.com:3003",
  ADMIN_SERVICE_BASEURL: process.env.ADMIN_SERVICE_BASEURL || "http://ig-lb-prod-1641661053.us-east-2.elb.amazonaws.com:3001",
  USER_SERVICE_BASEURL: process.env.USER_SERVICE_BASEURL || "http://ig-lb-prod-1641661053.us-east-2.elb.amazonaws.com:3002",
  CDN_BASE_URL: process.env.CDN_BASE_URL || "https://d3lqdtoqszpkpl.cloudfront.net/",
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || "instinct-games-s3-prod",
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || "AKIASC2YPZOYMR42OR4W",
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY || "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",
  IPFS_URL: process.env.IPFS_IP || "http://13.58.212.151:5001",
  IPFS_HOST_URL: process.env.IPFS_HOST_URL || "https://ipfs.io/ipfs/",
  FOLDER_NAME: process.env.FOLDER_NAME || "nftFiles",
};
