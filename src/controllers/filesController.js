const db = require('../database/models');
const dotenv = require('dotenv');
// TODO: How to avoide file calls with ../
// const httpStatusCodes = require('../constants/httpStatusCodes');
const s3Controller = require('../utils/s3Controller')
dotenv.config();

const { File } = db;

class filesController {

  //method to upload file & insert in the DB
  static async uploadMyFile(req, res) {
    // Check if file was included in the request  
    if (!req.file)
      return res.status(400).json({
        Success: false,
        Error: "Bad Request - please upload a file"
      });

    try {
      const targetFile = req.file;

      // Check if the given file exist in the bucket 
      const exist = await s3Controller.fileExist(process.env.AWS_BUCKET_NAME, targetFile.originalname);
      // Return Err 422 if file already exist in the bucket
      if (exist === true) {
        return res.status(422).json({
          Success: false,
          Error: "Unprocessable Entity - file with the same name already exist"
        });
      }

      // Upload file to s3 
      const s3Data = await s3Controller.uploadFile(process.env.AWS_BUCKET_NAME, targetFile.originalname, targetFile.buffer);

      // Save file in db
      const dbData = await File.createFile(s3Data.Key, s3Data.Location);

      // Return success respond with uploaded file info  
      return res.status(200).json({
        Success: true,
        s3: s3Data,
        db: dbData
      })

    } catch (err) {
      console.log('ERROR', err);
      return res.status(err.statusCode).json({
        Success: false,
        Error: err.message
      });
    }
  }

  //method to return files from DB
  static async getFiles(req, res) {
    try {
      // Get all files from DB 
      const files = await File.getAll();

      // Return files response  
      return res.status(200).json({
        Success: true,
        files: files
      })
    } catch (err) {
      console.log('ERROR', err);
      return res.status(err.statusCode).json({
        Success: false,
        Error: err.message
      });
    }

  }
}

module.exports = filesController;
