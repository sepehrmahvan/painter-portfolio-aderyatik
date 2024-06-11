const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
  SocialMediaURL: {
    type: String,
  },
  SocialMediaEmail: {
    type: String,
  },
  SocialMediaPintrest: {
    type: String,
  },
  SocialMediaInstagram: {
    type: String,
  },
  SocialMediaLinkdin : {
    type: String,
  },
  SocialMediaYoutube: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.SocialMedia ||
  mongoose.model("SocialMedia", SocialMediaSchema);
