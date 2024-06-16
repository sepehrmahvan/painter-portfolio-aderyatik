const { Router } = require("express");

const uploadController = require("../controller/uploadController");
const { authenticated } = require("../middlewares/auth");

const router = new Router();

router.post("/upload-image",authenticated,uploadController.UploadLogo);
router.get("/get-image",authenticated,uploadController.getImages);


module.exports = router;
