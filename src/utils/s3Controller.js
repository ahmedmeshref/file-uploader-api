const aws = require('aws-sdk');
const { param } = require('../routes');

const s3 = new aws.S3({
    // accessKeyId: process.env.AWS_ACCESS_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
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
        const uploadData = await s3.upload(params, function (err, data) {
            if (err) {
                throw err;
            }
        }).promise()
        return uploadData;
    };

    // Check if a given file already exist in the bucket or not.
    static async fileExist(bucket, fileName) {
        const params = {
            Bucket: bucket,
            Key: fileName,
        };

        try {
            await s3.headObject(params).promise()
            return true;
        } catch (err) {
            if (err.code === 'NotFound') {
                return false;
            };
            err.message = "Access Denied";
            throw err
        }
    }

    // Get all objects from the bucket 
    static async getObjects(bucket) {
        var params = {
            Bucket: bucket,
            Delimiter: '/',
        }

        await s3.listObjects(params, function (err, data) {
            if (err) throw err;
            console.log(data);
        });
    }
}


module.exports = s3Controller;

// TODO: WHERE SHOULD I PLACE THE S3COntroller?
// How to handle access denied error and what are my options to build scalable error logging messages?

