const { Router } = require("express");

const themplateController = require("../controller/themplateController");
const { authenticated } = require("../middlewares/auth");

const router = new Router();
//* LOGO
router.put("/update-logo", authenticated, themplateController.handleUpdateLogo);
router.get("/get-logo", themplateController.handleGetLogo);

//* HEADER
router.put(
  "/update-header",
  authenticated,
  themplateController.handleUpdateHeader
);
router.get("/get-header", themplateController.handleGetHeader);
//* ABOUT
router.put(
  "/update-about",
  authenticated,
  themplateController.handleUpdateAbout
);
router.get("/get-about", themplateController.handleGetAbout);
//* WORK
// router.put("/update-work", themplateController.handleUpdateSample);
router.post("/add-work", authenticated, themplateController.handleAddSample);
router.get("/get-work", themplateController.handleGetSample);
router.delete(
  "/delete-work",
  authenticated,
  themplateController.handleDeleteSample
);

//* YOUTUBE
// router.put("/update-youtube", themplateController.handleUpdateyoutube);
router.get("/get-youtube", themplateController.handleGetyoutube);
router.post(
  "/add-youtube",
  authenticated,
  themplateController.handleAddyoutube
);
router.delete(
  "/delete-youtube",
  authenticated,
  themplateController.handleDeleteyoutube
);

//* SOCIALMEDIA
router.put(
  "/update-Socialmedia",
  authenticated,
  themplateController.handleUpdateSocialmedia
);
router.get("/get-Socialmedia", themplateController.handleGetSocialmedia);
module.exports = router;
