const express = require('express');
const router = express.Router();
const Task = require("../model/addTaskModel");

router.post("/", async(req, res) => {

  const {userID, task, description, date} = req.body;

  try {

    const newTask = new Task({
      userID: userID,
      task: task,
      description: description,
      date: date 
    });

    newTask.save();
    res.status(200).json({ message: "add success"})
  } catch(error) {
    res.status(500).json({ message: 'add field' });
  }

})

module.exports = router;