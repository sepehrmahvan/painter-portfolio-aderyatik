const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema({
  logoURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.models.Logo || mongoose.model("Logo", LogoSchema);
