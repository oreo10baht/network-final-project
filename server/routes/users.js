const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/name", userController.getUserByName);
router.delete("/", userController.deleteUser);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.post("/login", userController.userLogin);

module.exports = router;
