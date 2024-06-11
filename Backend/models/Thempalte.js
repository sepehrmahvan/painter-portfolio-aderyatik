const mongoose = require("mongoose");

const { schema } = require("./secure/themplateValidation");

const ThemplateSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    trim: true,
  },
  nameTitle: {
    type: String,
    trim: true,
  },
  sloganTitle: {
    type: String,
    trim: true,
  },
  cv: {
    type: String,
  },
  headerImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ThemplateSchema.statics.themplateValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports =
  mongoose.models.ThemplateSchema ||
  mongoose.model("Themplate", ThemplateSchema);
