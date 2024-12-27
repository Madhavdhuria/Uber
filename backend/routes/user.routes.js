const express = require("express");
const router = express.Router();
const authMiddleware=require("../middlerwares/auth.middleware")

const userController = require("../controllers/user.controller");

router.post("/register", userController.RegisterUser);
router.post("/login", userController.UserLogin);
router.get("/profile",authMiddleware.authUser,userController.getUserProfile);
router.get("/logout",authMiddleware.authUser,userController.LogoutUser);

module.exports = router;
