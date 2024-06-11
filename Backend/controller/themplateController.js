const Thempalte = require("../models/Thempalte");

exports.handleUpdateHeader = async (req, res, next) => {
  const { jobTitle, nameTitle, sloganTitle, headerImage } = req.body;
  try {
    const heder = await Thempalte.findOne();
    heder.jobTitle = jobTitle;

    heder.nameTitle = nameTitle;

    heder.sloganTitle = sloganTitle;
    await heder.save();
    if (headerImage) {
      heder.headerImage = headerImage;
      await heder.save();
    }

    res.status(201).json({ message: "تغغیرات با موفقیت انجام شد." });
  } catch (err) {
    next(err);
  }
};

exports.handleGetHeader = async (req, res, next) => {
  try {
    const heder = await Thempalte.findOne({ _id: "664382062870be084e9e52d8" });
    res.status(200).json(heder);
  } catch (err) {
    next(err);
  }
};
