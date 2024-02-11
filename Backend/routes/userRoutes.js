const { Router } = require("express");

const userController = require("../controller/userController");

const router = new Router();

router.post("/login", userController.handleLogin);
router.put("/handle-about", userController.handleAbout);
router.put("/updateuser", userController.updateUser);
router.post("/updateuser", userController.updateUser);

router.put("/updatepassword", userController.handleResetPassword);
module.exports = router;
