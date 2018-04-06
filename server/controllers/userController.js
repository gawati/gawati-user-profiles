const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const serializeError = require('serialize-error');
const winston = require('winston');


exports.getProfile = async(req, res) => {
    try{
      if(req.query.userName!=undefined){
        try{
          const user = await User.findOne({ userName: req.query.userName });
          if(user){
            if(user.dpUrl==undefined || user.dpUrl==""){
              user.dpUrl = process.env.DEFAULT_PROFILE_IMAGE
            }
            res.json({ "success": "true", "data": user});
          }else{
            res.json({ "success": "true", "data": {dpUrl:process.env.DEFAULT_PROFILE_IMAGE,nickName:''}});
          }
        }catch(err){
            winston.log("error", "getProfile");
            res.json({"error": "getProfile", "data": serializeError(err)});
        } 
      }else{
          res.json({ "success": "true", "data": {dpUrl:'',nickName:''}});
      }
    }catch(err){
      winston.log("error", "getProfile");
      res.json({"error": "getProfile", "data": serializeError(err)});
    }
}

exports.saveProfile = async(req, res) => {
  try {
      if(req.body.nickName!=undefined && req.body.userName!=undefined){
        try{
          const user = await User.findOne({ userName: req.body.userName });
          if(user) {
            user.nickName = req.body.nickName;
            try{
              await user.save();
              res.json({ "success": "true", "data": {"dpUrl": user.nickName}});
            }catch(err){
              winston.log("error", "saveProfile", err);
              res.json({"error": "saveProfile", "data": serializeError(err)});
            }
          }else{
            const user = new User({ userName: req.body.userName, nickName: req.body.nickName });
            try{
              await user.save();
              res.json({ "success": "true", "data": {"dpUrl": user.nickName}});
            }catch(err){
              winston.log("error", "saveProfile", err);
              res.json({"error": "saveProfile", "data": serializeError(err)});
            }
          }
        }catch (err) {
          winston.log("error", "mongoError", err);
          res.json({ "error": "mongoError", "data": serializeError(err)});
        }
      }else if(req.files!=undefined && req.body.userName!=undefined){
          try{
            const user = await User.findOne({ userName: req.body.userName });
            if(user) {
              user.dpUrl = req.files[0].filename;
              try{
                await user.save();
                res.json({ "success": "true", "data": {"dpUrl": user.dpUrl}});
              }catch(err){
                winston.log("error", "saveProfile", err);
                res.json({"error": "saveProfile", "data": serializeError(err)});
              }
            }else{
              const user = new User({ userName: req.body.userName, dpUrl: req.files[0].filename });
              try{
                await user.save();
                res.json({ "success": "true", "data": {"dpUrl": user.dpUrl}});
              }catch(err){
                winston.log("error", "saveProfile", err);
                res.json({"error": "saveProfile", "data": serializeError(err)});
              }
            }
          }catch (err) {
            winston.log("error", "mongoError", err);
            res.json({ "error": "mongoError", "data": serializeError(err)});
          }
      }
  } catch (err) {
    winston.log("error", "saveProfile", err);
    res.json({"error": "saveProfile", "data": serializeError(err)});
  }
}