const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs")
const Register = require("../model/register");

router.post("/", async(req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ result: 'error', message: 'Missing required fields' });
    }

    const existingUser = await Register.findOne({ email_address: email });
    
    if (existingUser) {
        return res.status(400).json({ result: "error", message: "Email address already registered" });
    }

    try {

        const saltRounds = 10; 
        const hash = await bcrypt.hash(password, saltRounds);
        const RegisterUser = new Register({
            full_name: name,
            email_address: email,
            password: hash
          });
          await RegisterUser.save();
          res.status(200).json({result: "success"})
    } catch(error) {
        res.status(500).json({ result: 'error', message: 'Internal server error' });
    }

})

module.exports = router