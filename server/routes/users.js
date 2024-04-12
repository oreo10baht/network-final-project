const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/", userController.getAllUsers);
router.get("/name", userController.getUserByName);
router.delete("/", userController.deleteUser);
router.get("/:id", userController.getUserById);

//Authentication
router.post("/register", authController.createUser);
router.post("/login", authController.userLogin);
router.delete("/logout", authController.userLogout);

module.exports = router;
