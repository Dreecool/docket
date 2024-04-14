const express = require('express');
const router = express.Router();
const GetTask = require("../model/addTaskModel");
const moment = require('moment-timezone');

router.put('/', async (req, res) => {
    const { id, task, description, date } = req.body; 
    try {
        const updatedTask = await GetTask.findByIdAndUpdate(id, {
            task,
            description,
            date
        }, { new: true }); 
        res.send(updatedTask);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
