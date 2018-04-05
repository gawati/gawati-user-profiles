const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const serializeError = require('serialize-error');

exports.getProfile = async(req, res) => {
    if(req.query.userName!=undefined){
        const user = await User.findOne({ userName: req.query.userName });
        if(user){
          if(user.dpUrl==undefined || user.dpUrl==""){
            user.dpUrl = process.env.DEFAULT_PROFILE_IMAGE
          }
          res.json({ "success": "true", "data": user});
        }else{
          res.json({ "success": "true", "data": {dpUrl:process.env.DEFAULT_PROFILE_IMAGE,nickName:''}});
        } 
    }else{
        res.json({ "success": "true", "data": {dpUrl:'',nickName:''}});
    }
    return;
  }

exports.saveProfile = async(req, res) => {
  try {
      if(req.body.nickName!=undefined && req.body.userName!=undefined){
        const user = await User.findOne({ userName: req.body.userName });
        if(user) {
          user.nickName = req.body.nickName;
          await user.save();
          res.json({ "success": "true", "data": {"edited": user.nickName}});
        }else{
          const user = new User({ userName: req.body.userName, nickName: req.body.nickName });
          await user.save();
          res.json({ "success": "true", "data": {"added": user.nickName}});
        }
    }else if(req.files!=undefined && req.body.userName!=undefined){
        const user = await User.findOne({ userName: req.body.userName });
        if(user) {
          user.dpUrl = req.files[0].location;
          await user.save();
          res.json({ "success": "true", "data": user});
        }else{
          res.json({ "error": "saveProfile", "data": "error while saving image"});
        }
    }
  } catch (err) {
    res.json({"error": "saveProfile", "data": serializeError(err)});
  }
  }