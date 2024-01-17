const router = require('express').Router();
const admin = require('../config/firebase.config')
const user = require('../models/user')


router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (!decodeValue) {
      return res.status(500).json({ message: "Un Authorize" });
    }
    // checking user email already exists or not
    const userExists = await user.findOne({ user_id: decodeValue.user_id });
    if (!userExists) {
      newUserData(decodeValue, req, res);
    } else {
      updateUserData(decodeValue, req, res);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

const newUserData = async (decodedValue , req , res ) => {
  const newUser = new user ({
    name: decodedValue.name,
    email: decodedValue.email,
    imageURL: decodedValue.picture,
    user_id: decodedValue.user_id, 
    email_verified: decodedValue.email_verified,
    role: "member", // Set the user role (you may modify this according to your logic)
    auth_time: decodedValue.auth_time
  })   
  
  try {
    const savedUser = await newUser.save();
    res.status(200).send({user : savedUser})
  } catch (error) {
     res.status(400).send({success : false , message : error})
  }
}
const updateUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};


module.exports = router;
