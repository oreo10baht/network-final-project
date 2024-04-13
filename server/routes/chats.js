const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/", chatController.createChat);
router.get("/all", chatController.getAllUserChats);
router.get("/users/:userId", chatController.getUserChatsByUserId);
router.get("/:chatId", chatController.getChat);
router.delete("/:chatId", chatController.deleteChat);

module.exports = router;
