const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const { extend } = require("lodash");
const { User } = require("../model/user.model.js");
const secret= process.env['secretVariable'];
router
  .route("/")
  .get(async (req, res) => {
    try {
      const user = await User.find({});
      res.json({ user });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "unable to get the list of users",
          errorMessage: err.message
        });
    }
  })
  .post(async (req, res) => {
    try {
      const userInfo = req.body;
      const Newuser = new User(userInfo);
      const saveduser = await Newuser.save();
      res.json({ success: true, user: saveduser });
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "unable to add the user",
          errorMessage: err.message
        });
    }
  });


router
  .route("/login")
  .post(async (req, res) => {
    try {
      const {email,passwordEnteredbyUser}=req.body;
      let CurrentUser = await User.findOne({ email });
      if(CurrentUser){
        if (bcrypt.compare(passwordEnteredbyUser, CurrentUser.password)){
          const jwtToken = jwt.sign({ id: CurrentUser._id },secret, {
      expiresIn: '24h'
    });
     res.status(200).json({ success: true,currentUser:CurrentUser,token: jwtToken,message:"Logged In" });
        }
        else{
           res.json({success:false,message:"Passwords do not match"});
        }
      }
      else{
        res.json({success:false,message:"Email is not registered"})
      }
    } catch (err) {
      res
        .status(500)
        .json({
          success: false,
          message: "unable to login",
          errorMessage: err.message
        });
    }
    
  })
  
router.param("userId", async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "cannot find user" });
    }
    req.user = user;
    next();
  } catch {
    res
      .status(400)
      .json({ success: false, message: "cannot retrive data of the user" });
  }
});

router
  .route("/:userId")
  .get((req, res) => {
    let { user } = req;
    user.__v = undefined;
    res.json({ user });
  })
  .post(async (req, res) => {
    try{
    let { user } = req;
    const updateuser = req.body;
    user = extend(user, updateuser);
    user.updated = Date.now();
    user = await user.save();
    res.json({ success: true, user });
    }
    catch(err){
      res.json({ success: false, message:err.message });
    }
  })

  .delete(async (req, res) => {
    try{
    let { user } = req;
    await user.remove();
    user.deleted = true;
    res.json({ success: true, user });
    }
    catch(err){
       res.json({ success: false, message:err.message })
    }
  });

module.exports = router;
