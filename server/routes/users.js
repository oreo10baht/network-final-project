const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/", userController.getAllUsers);
router.get("/name/:username", userController.getUserByName);
router.get("/:id", userController.getUserById);
router.delete("/", userController.deleteUser);

//Authentication
router.get("/auth/me", authController.authenticateUser, (req, res) => {
  const user = req.user;
  res.json({
    username: user.username,
    display_name: user.display_name,
    image: user.image,
    friends: user.friends,
    pendings: user.pendings,
    requests: user.requests,
  });
});
router.post("/register", authController.createUser);
router.post("/login", authController.userLogin);
router.delete("/logout", authController.userLogout);

module.exports = router;
