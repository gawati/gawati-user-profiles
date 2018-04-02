const path = require('path');
const router = require('express').Router();
const fs = require('fs');
var multer  = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');

var s3 = new aws.S3({
    "accessKeyId": process.env.AWS_ACESSKEY,
    "secretAccessKey": process.env.AWS_SECRETKEY,
    "region": process.env.AWS_REGION
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname))
    }
  })
});


const userController = require('../controllers/userController');

router.get('/profiles',
  
  userController.getProfile,
);

router.post('/profiles', upload.any(), 
  
  userController.saveProfile,
);



module.exports = router;