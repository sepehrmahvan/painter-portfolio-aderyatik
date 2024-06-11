const { Router } = require("express");

const themplateController = require("../controller/themplateController");

const router = new Router();

router.put("/update-header",themplateController.handleUpdateHeader);
router.get("/get-header",themplateController.handleGetHeader);


module.exports = router;
