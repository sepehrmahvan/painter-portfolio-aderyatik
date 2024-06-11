const { Router } = require("express");

const uploadController = require("../controller/uploadController");

const router = new Router();

router.post("/upload-image",uploadController.UploadLogo);
router.get("/get-image",uploadController.getImages);


module.exports = router;
