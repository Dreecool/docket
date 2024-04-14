const express = require('express');
const router = express.Router();
const GetTask = require("../model/addTaskModel");
const moment = require('moment-timezone');

router.get('/', async (req, res) => {
    const userId = req.query.userID;

    try {
        const currentDate = moment().tz('Asia/Manila').format('YYYY-MM-DD'); 
        const tasks = await GetTask.aggregate([
            {
                $match: {
                    date: currentDate,
                    userID: userId
                }
            }
        ]);
        res.send(tasks);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
