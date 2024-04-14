const express = require('express');
const router = express.Router();
const StickyWall = require("../model/stickyWallModel");


router.post("/", async(req, res) => {

    const {userID , title, description, backgroundColor} = req.body;
    try {

        const newWall = new StickyWall({
            userID: userID,
            title: title,
            description: description,
            backgroundColor: backgroundColor
        })

        newWall.save();
        res.status(200).json({message: 'add success'});
    } catch(error) {
        console.log(error)
        res.status(500).json({Message: 'add field'});
    }

})

router.get("/getStickyWall", async(req,res) => {
    
    const userID = req.query.userID
    try {
        const user = await StickyWall.find({ userID: userID });
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
          }

    } catch(error) {
        res.status(500).json({ message: 'Error retrieving user data', error: error.message });
    }


})


router.delete("/deleteStickWall", async(req,res) => {
    
    const userID = req.query.userID
    try {
        await StickyWall.findByIdAndDelete(userID)
    } catch(error) {
        res.status(500).json({ message: 'Error retrieving user data', error: error.message });
    }

})

module.exports = router;