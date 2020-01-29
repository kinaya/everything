const passport = require('passport');
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin');
const aws = require('aws-sdk');
const Image = mongoose.model('images')

aws.config.region = 'eu-north-1';

module.exports = (app) => {

  // This should be post???
  app.get('/api/image/new', (req, res) => {
    const s3Bucket = process.env.S3_BUCKET
    const s3 = new aws.S3();
    const fileName = req.query['fileName'];
    const fileType = req.query['fileType'];

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

  app.post('/api/deleteImage', async (req, res, next) => {
    const s3Bucket = process.env.S3_BUCKET
    const s3 = new aws.S3();

    const image = await Image.findOneAndDelete({_id: req.body.imageId});
    // Delete from item?? image sätts till 'null' på item!

    const s3Params = {
      Bucket: s3Bucket,
      Key: image.fileName
    }

    s3.deleteObject(s3Params, (err, data) => {
      if(err) {
        next(err)
      }

      // Respond with ok?
      //console.log('date', data)
      //res.write(JSON.stringify(data))
      res.send()
      //res.end();

    })

  })

}
