import aws from "aws-sdk";
class AwsService{
    static async uploadFileToS3(fileObject, fileName, mimeType, isPublic = false) {
        if (!fileObject || !fileName || !mimeType)
            return false;
        let config = {
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
        }
        aws.config.update(config);
        const S3 = new aws.S3();
        const params = {
            Body: fileObject,
            Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
            ContentType: mimeType,
            Key: fileName
        };
        if (isPublic)
            params.ACL = 'public-read';
        return new Promise(function (resolve, reject) {
            S3.upload(params, function (err, uploadData) {
                if (err)
                    reject(err);
                resolve(uploadData);
            });
        });
    }
}

export default AwsService;