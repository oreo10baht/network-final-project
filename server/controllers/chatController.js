const Chat = require("../models/chat.model");
const User = require("../models/user.model.js");

exports.createChat = async (req, res) => {
  try {
    const firstUsername = await User.findOne({
      username: req.body.firstUsername,
    });
    const secondUsername = await User.findOne({
      username: req.body.secondUsername,
    });

    if (!firstUsername || !secondUsername) {
      return res.status(404).json("User not found.");
    }

    if (firstUsername._id.toString() === secondUsername._id.toString()) {
      return res.status(400).json("User is the same person");
    }

    const chat = await Chat.findOne({
      members: {
        $all: [firstUsername._id, secondUsername._id],
      },
    });

    if (chat) return res.status(400).json("Users already haved chat");

    const newChat = new Chat({
      members: [firstUsername._id, secondUsername._id],
    });

    const response = await newChat.save();

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAllUserChats = async (req, res) => {
  try {
    const allChats = await Chat.find({});
    res.status(200).json(allChats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getUserChatsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const chats = await Chat.find({
      members: { $in: [userId] },
    });
    if (!chats) {
      return res.status(404).json("Chat not found");
    }

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getChat = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const chat = await Chat.findOne({ _id: chatId });
    if (!chat) {
      return res.status(404).json("Chat not found");
    }
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.deleteChat = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const deletedChat = await Chat.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res.status(404).json("Chat not found");
    }

    res.status(200).json("Chat deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
