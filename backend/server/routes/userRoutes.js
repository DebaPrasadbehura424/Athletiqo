const express = require("express");
const router = express.Router();
const usercontrol = require("../controller/userController");
const authenticateUser = require("../service/authenticateUser");



router.post("/userRegister", usercontrol.RegisterUser);
router.post("/userLogin", usercontrol.LoginUser);
router.get("/profileUser", authenticateUser, usercontrol.profileUser);

module.exports = router;
