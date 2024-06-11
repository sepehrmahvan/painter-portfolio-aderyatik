const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  aboutTitle: {
    type: String,
  },
  aboutEmail: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.models.About || mongoose.model("About", AboutSchema);
