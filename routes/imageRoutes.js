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

  app.delete('/api/image/:id', async (req, res, next) => {
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



/*    s3.deleteObject(s3Params, (err, data) => {
      if(err) {
        next(err)
      }
      res.send()
    })*/

  })

}
