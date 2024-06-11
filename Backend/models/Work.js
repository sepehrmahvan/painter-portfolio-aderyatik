const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema({
  workSampleURL: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Sample || mongoose.model("Sample", SampleSchema);
