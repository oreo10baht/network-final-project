const express = require("express");
const chatController = require("../controllers/chatController");
const router = express.Router();

router.post("/", chatController.createChat);
router.get("/all", chatController.getAllUserChats);
router.get("/users/:userId", chatController.getUserChatsByUserId);
router.get("/:chatId", chatController.getChat);
router.delete("/:chatId", chatController.deleteChat);

module.exports = router;
