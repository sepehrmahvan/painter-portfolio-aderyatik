const mongoose = require("mongoose");

const YoutubeSchema = new mongoose.Schema({
  YoutubeURL: {
    type: String,
  },
  title: {
    type: String,
  },
  statement: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Youtube || mongoose.model("Youtube", YoutubeSchema);
