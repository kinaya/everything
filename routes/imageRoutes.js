const passport = require('passport');
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin');
const {imageValidator,validateImage} = require('../middlewares/validateRequests')

const aws = require('aws-sdk');
const Image = mongoose.model('images')
aws.config.region = 'eu-north-1';

module.exports = (app) => {

  app.post('/api/image/new', requireLogin, imageValidator(), validateImage, (req, res) => {
    const s3Bucket = process.env.S3_BUCKET
    const s3 = new aws.S3();
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;

    console.log('image/new', req.body);

    const s3Params = {
      Bucket: s3Bucket,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    }

    s3.getSignedUrl('putObject', s3Params, async (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }

      const image = new Image ({
        url: `https://${s3Bucket}.s3.amazonaws.com/${fileName}`,
        fileName: fileName
      })

      await image.save(function (err, image) {
        if(err) {next(err)}

        const returnData = {
          signedRequest: data,
          image: image
        };

        res.write(JSON.stringify(returnData));
        res.end();

      });


    });
  })

  app.delete('/api/image/:id', requireLogin, async (req, res, next) => {
    const s3Bucket = process.env.S3_BUCKET
    const s3 = new aws.S3();

    try {
      const image = await Image.findOneAndDelete({_id: req.params.id});
      const s3Params = {
        Bucket: s3Bucket,
        Key: image.fileName
      }
      s3.deleteObject(s3Params)
      res.send();
    } catch (err) {
      next(err)
    }

  })

}
