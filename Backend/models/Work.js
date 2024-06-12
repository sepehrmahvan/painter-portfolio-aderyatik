const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema({
  workSampleURL: {
    type: String,
  },
  workSampleTitle: {
    type: String,
  },
  workSampleCategory: {
    type: String,
  },
  workSampleAbout: {
    type: String,
  },
  workSampleStatement: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Sample || mongoose.model("Sample", SampleSchema);
