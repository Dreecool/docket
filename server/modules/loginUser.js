const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const Register = require("../model/register");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');

router.post("/", async(req, res) => {

    const { email, password } = req.body;
  
    try {
      const existingUser = await Register.findOne({  email_address: email });
  
        if (existingUser) {
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      
            if (isPasswordValid) {
      
               const { _id: userId, full_name } = existingUser;
              const token = jwt.sign({ userId }, secretKey, { expiresIn: "1d" });
      
              res.status(200).json({tok: token, ID: userId,  name: full_name, Result: "Login Successful"});
            } else {
              res.status(401).json({ message: 'Invalid credentials' });
            }
          } else {
            res.status(401).json({ message: 'Email not found' });
          }

    } catch (error) {
        res.status(500).json({ message: 'Login failed' });
      }

});


module.exports = router;

