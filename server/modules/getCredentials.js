const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const Register = require("../model/register");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');


// New route to retrieve user data
router.get('/', async (req, res) => {

      const userId = req.query.userId
  
    try {
      const user = await Register.findById(userId);
      if (user) {
        res.status(200).json({ID: user._id,name: user.full_name});
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user data', error: error.message });
    }
  });
  

  module.exports = router;