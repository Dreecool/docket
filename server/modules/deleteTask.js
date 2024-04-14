const express = require('express');
const router = express.Router();
const GetTask = require("../model/addTaskModel");
const moment = require('moment-timezone');

router.delete('/', async (req, res) => {
    const taskId = req.query.taskId;
    try {
        const tasks = await GetTask.findByIdAndDelete(taskId)
        res.send("success");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
