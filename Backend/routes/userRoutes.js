const { Router } = require("express");

const userController = require("../controller/userController");

const router = new Router();

router.get("/get-User", userController.getUser);

router.post("/login", userController.handleLogin);

router.put("/update-user", userController.updateUser);
router.put("/updatepassword", userController.handleResetPassword);
module.exports = router;
