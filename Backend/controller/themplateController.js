const About = require("../models/About");
const Thempalte = require("../models/Thempalte");
const logo = require("../models/logo");
const Sample = require("../models/Work");
const Youtube = require("../models/Youtube");
const Sociall = require("../models/Sociall");

// * LOGO
// ? UPDATE LOGO
exports.handleUpdateLogo = async (req, res, next) => {
  const { logoData } = req.body;
  console.log(logoData);
  try {
    const FoundLogo = await logo.findOne();
    FoundLogo.logoURL = logoData;
    await FoundLogo.save();
    res.status(201).json({ message: "Logo Changed Successfully" });
  } catch (err) {
    next(err);
  }
};
// ? GET LOGO
exports.handleGetLogo = async (req, res, next) => {
  try {
    const FoundLogo = await logo.findOne();
    res.status(201).json({ FoundLogo });
  } catch (err) {
    next(err);
  }
};
// * HEADER
// ? UPDATE HEADER
exports.handleUpdateHeader = async (req, res, next) => {
  const { jobTitle, nameTitle, sloganTitle, headerImage, cv } = req.body;
  try {
    const heder = await Thempalte.findOne();
    heder.jobTitle = jobTitle;
    heder.nameTitle = nameTitle;
    heder.sloganTitle = sloganTitle;
    heder.headerImage = headerImage;
    heder.cv = cv;

    await heder.save();

    res.status(201).json({ message: " Header Changes Successfully" });
  } catch (err) {
    next(err);
  }
};
// ? GET HEADER
exports.handleGetHeader = async (req, res, next) => {
  try {
    const heder = await Thempalte.findOne();
    res.status(200).json(heder);
  } catch (err) {
    next(err);
  }
};
// * ABOUT
// ? UPDATE ABOUT
exports.handleUpdateAbout = async (req, res, next) => {
  const { title, email } = req.body;
  try {
    const about = await About.findOne();
    about.aboutTitle = title;
    about.aboutEmail = email;

    await about.save();

    res.status(201).json({ message: " ABOUT Changes Successfully" });
  } catch (err) {
    next(err);
  }
};
// ? GET ABOUT
exports.handleGetAbout = async (req, res, next) => {
  try {
    const about = await About.findOne();
    res.status(200).json(about);
  } catch (err) {
    next(err);
  }
};
// * Work samples
// ? UPDATE Work samples
// exports.handleUpdateSample = async (req, res, next) => {
//   const {workSampleURL ,workSampleTitle,workSampleCategory ,workSampleAbout, workSampleStatement} = req.body;
//   try {
//     const workSample = await Sample.findOne();
//     workSample.workSampleURL = workSampleURL;
//     workSample.workSampleTitle = workSampleTitle;
//     workSample.workSampleCategory = workSampleCategory;
//     workSample.workSampleAbout = workSampleAbout;
//     workSample.workSampleStatement = workSampleStatement;

//     await workSample.save();

//     res.status(201).json({ message: " workSample Changes Successfully" });
//   } catch (err) {
//     next(err);
//   }
// };
// ? ADD Work samples
exports.handleAddSample = async (req, res, next) => {
  try {
    await Sample.create(req.body);

    res.status(201).json({ message: " workSample added Successfully" });
  } catch (err) {
    next(err);
  }
};
// ? delete Work samples
exports.handleDeleteSample = async (req, res, next) => {
  const { id } = req.body;
  try {
    const workSample = await Sample.findOne({ _id: id });
    if (!workSample) {
      return res.status(404).json({ message: "work sample not found" });
    }
    await Sample.findOneAndDelete({ _id: id });

    res.status(201).json({ message: " workSample deleted Successfully" });
  } catch (err) {
    next(err);
  }
};
// ? GET Work samples
exports.handleGetSample = async (req, res, next) => {
  try {
    const workSample = await Sample.find();
    res.status(200).json(workSample);
  } catch (err) {
    next(err);
  }
};
// * YOUTUBE
// ? UPDATE YOUTUBE
// exports.handleUpdateyoutube = async (req, res, next) => {
//   const { YoutubeURL, title, statement, id } = req.body;
//   console.log(req.body);
//   try {
//     const youtube = await Youtube.findOne({ _id: id });
//     youtube.YoutubeURL = YoutubeURL;
//     youtube.title = title;
//     youtube.statement = statement;

//     await youtube.save();

//     res.status(201).json({ message: " youtube Changes Successfully" });
//   } catch (err) {
//     next(err);
//   }
// };
// ? ADD YOUTUBE
exports.handleAddyoutube = async (req, res, next) => {
  try {
    await Youtube.create(req.body);

    res.status(201).json({ message: " youtube added Successfully" });
  } catch (err) {
    next(err);
  }
};
// ? GET YOUTUBE
exports.handleGetyoutube = async (req, res, next) => {
  try {
    const youtube = await Youtube.find();
    res.status(200).json(youtube);
  } catch (err) {
    next(err);
  }
};
// ? delete YOUTUBE
exports.handleDeleteyoutube = async (req, res, next) => {
  const { id } = req.body;
  try {
    const youtube = await Youtube.findOne({ _id: id });
if (!youtube) {
      return res.status(404).json({ message: "work sample not found" });
    }
    await Youtube.findOneAndDelete({ _id: id });

    res.status(201).json({ message: " YOUTUBE deleted Successfully" });
  } catch (err) {
    next(err);
  }
};
// * SOCIAL MEDIA
// ? UPDATE SOCIALMEDIA
exports.handleUpdateSocialmedia = async (req, res, next) => {
  const {
    SocialMediaURL,
    SocialMediaEmail,
    SocialMediaPintrest,
    SocialMediaInstagram,
    SocialMediaLinkdin,
    SocialMediaYoutube,
  } = req.body;
  try {
    const sociall = await Sociall.findOne();
    sociall.SocialMediaURL = SocialMediaURL;
    sociall.SocialMediaEmail = SocialMediaEmail;
    sociall.SocialMediaPintrest = SocialMediaPintrest;
    sociall.SocialMediaInstagram = SocialMediaInstagram;
    sociall.SocialMediaLinkdin = SocialMediaLinkdin;
    sociall.SocialMediaYoutube = SocialMediaYoutube;

    await sociall.save();

    res.status(201).json({ message: " sociallmedia Changes Successfully" });
  } catch (err) {
    next(err);
  }
};
// ? GET SOCIALMEDIA
exports.handleGetSocialmedia = async (req, res, next) => {
  try {
    const sociall = await Sociall.findOne();
    res.status(200).json(sociall);
  } catch (err) {
    next(err);
  }
};
