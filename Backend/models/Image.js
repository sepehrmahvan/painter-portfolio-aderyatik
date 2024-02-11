const mongoose = require("mongoose");


const ImageSchema = new mongoose.Schema({
  logoname: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.models.Image || mongoose.model("Image", ImageSchema);
