const aws = require('aws-sdk');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class s3Controller {
    static async uploadFile(bucket, targetFile) {
        // Setting up S3 upload parameters
        const params = {
            Bucket: bucket,
            Key: targetFile.originalname, // File name to be saved on s3
            Body: targetFile.buffer
        };

        // Upload file to the bucket
        try {
            const uploadData = await s3.upload(params, function (err, data) {
                if (err) {
                    throw err;
                }
            }).promise()
            return uploadData;
        } catch (err) {
            return err;
        }
    };

    // Get all objects from the bucket 
    static async getObjects(bucket) {
        var params = {
            Bucket: bucket,
            Delimiter: '/',
        }

        s3.listObjects(params, function (err, data) {
            if (err) throw err;
            console.log(data);
        });
    }


}


module.exports = s3Controller;

// TODO: Rollback s3 file upload incase I fail to update db
// TODO: WHERE SHOULD I PLACE THE S3COntroller?


