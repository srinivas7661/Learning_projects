const Config = require("../../config")
const AWS = require("aws-sdk");

class AWSServices {

    uploadFileToS3 = (bucket, key, body, contentType) => {
        AWS.config.update({
            accessKeyId: Config.AWS_ACCESS_KEY,
            secretAccessKey: Config.AWS_SECRET_KEY
        });

        let params = {
            Bucket: bucket,
            Key: key,
            Body: body,
            ContentType: contentType,
        };

        let s3 = new AWS.S3();
        return new Promise(function (resolve, reject) {
            s3.upload(params, (err, res) => {
                if (err) {
                    console.log("uploadFileToS3 error", err);
                    reject(err);
                } else {
                    let responseObj = {
                        sourceFileName: res.Key,
                    };
                    resolve(responseObj);
                }
            });
        });
    }
}
module.exports = AWSServices
