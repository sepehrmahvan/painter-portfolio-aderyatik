const { Router } = require("express");

const uploadController = require("../controller/uploadController");

const router = new Router();

router.post("/upload-image",uploadController.UploadLogo);

module.exports = router;
