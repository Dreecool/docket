const mongoose = require("mongoose");

const StickyWallSchema = new mongoose.Schema({

    userID: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },
  
    description: {
      type: String,
      required: true
    },

    backgroundColor: {
        type: String,
        required: true
    }

  })

  const StickWallMdl = mongoose.model("StickyWall", StickyWallSchema);
  
  module.exports = StickWallMdl