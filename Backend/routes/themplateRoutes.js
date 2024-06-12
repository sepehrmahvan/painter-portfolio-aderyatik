const { Router } = require("express");

const themplateController = require("../controller/themplateController");

const router = new Router();
//* LOGO
router.put("/update-logo", themplateController.handleUpdateLogo);
router.get("/get-logo", themplateController.handleGetLogo);

//* HEADER
router.put("/update-header", themplateController.handleUpdateHeader);
router.get("/get-header", themplateController.handleGetHeader);
//* ABOUT
router.put("/update-about", themplateController.handleUpdateAbout);
router.get("/get-about", themplateController.handleGetAbout);
//* WORK
// router.put("/update-work", themplateController.handleUpdateSample);
router.post("/add-work", themplateController.handleAddSample);
router.get("/get-work", themplateController.handleGetSample);
router.delete("/delete-work", themplateController.handleDeleteSample);

//* YOUTUBE
// router.put("/update-youtube", themplateController.handleUpdateyoutube);
router.get("/get-youtube", themplateController.handleGetyoutube);
router.post("/add-youtube", themplateController.handleAddyoutube);
router.delete("/delete-youtube", themplateController.handleDeleteyoutube);

//* SOCIALMEDIA
router.put("/update-Socialmedia", themplateController.handleUpdateSocialmedia);
router.get("/get-Socialmedia", themplateController.handleGetSocialmedia);
module.exports = router;
