const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.getProfile = async(req, res) => {
    if(req.query.userName!=undefined){
        const user = await User.findOne({ userName: req.query.userName });
        if(user){
          res.json({ "success": "true", "data": user});
        }else{
          res.json({ "success": "true", "data": {dpUrl:'',nickName:''}});
        } 
    }else{
        res.json({ "success": "true", "data": {dpUrl:'',nickName:''}});
    }
    return;
  }

exports.saveProfile = async(req, res) => {
	if(req.body.nickName!=undefined && req.body.userName!=undefined){
        const user = await User.findOne({ userName: req.body.userName });
        if(user) {
          user.nickName = req.body.nickName;
          await user.save();
          res.json({ "success": "true", "data": {}});
        }else{
          const user = new User({ userName: req.body.userName, nickName: req.body.nickName });
          user.save(function (err) {
            if (err){
            	res.json({ "success": "false", "data": err});
            }else{
            	res.json({ "success": "true", "data": {}});
            }
          });
        }
    }else if(req.files!=undefined && req.body.userName!=undefined){
        const user = await User.findOne({ userName: req.body.userName });
        if(user) {
          user.dpUrl = req.files[0].location;
          await user.save();
          res.json({ "success": "true", "data": {}});
        }else{
          res.json({ "success": "false", "data": {}});
        }
    }
    return;
  }