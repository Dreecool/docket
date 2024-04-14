const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

    userID: {
      type: String,
      required: true
    },

    task: {
      type: String,
      required: true
    },
  
    description: {
      type: String,
      required: true
    },

    status: {
      type: String,
      required: false
    },
  
    date: {
      type: String,
      required: true
    }
    

  })

  const Task = mongoose.model("Task", TaskSchema);
  
  module.exports = Task