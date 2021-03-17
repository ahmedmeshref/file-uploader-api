const fs = require('fs');
const db = require('../database/models/');
const dotenv = require('dotenv');
const aws = require('aws-sdk');
dotenv.config();

const { File } = db;

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

class uploadController {

  //method to upload file and insert in the DB
  static async uploadMyFile(req, res) {


    if (!req.file)
      return res.send('Please upload a file');

    try {

      return res.send({'File': req.files});
      // // Read content from the file
      // const fileContent = fs.readFileSync(req.file);

      // // Setting up S3 upload parameters
      // const params = {
      //   Bucket: BUCKET_NAME,
      //   Key: 'cat.jpg', // File name you want to save as in S3
      //   Body: fileContent
      // };

      // // Uploading files to the bucket
      // s3.upload(params, function (err, data) {
      //   if (err) {
      //     throw err;
      //   }
      //   console.log(`File uploaded successfully. ${data.Location}`);
      // });

      //Upload file to S3


      //Insert file name and link in DB

      // Return error of success msg

    } catch (error) {
      console.log('ERROR', error);
      return res.status('500').json({ errors: { error: 'Files not found', err: error.message } });
    }
  }

  //method to return files in the DB
  static async getFiles(req, res) {

    //Code to get all files from DB and return them

  }
}

module.exports = uploadController;