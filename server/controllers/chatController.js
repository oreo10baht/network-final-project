const Chat = require("../models/chat.model");
const User = require("../models/user.model.js");

exports.createChat = async (req, res) => {
  const membersUsername = req.body.members;
  const userIds = [];
  let members = [];

  try {
    for (const username of membersUsername) {
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).json("User not found");
      }
      userIds.push(user._id);
    }
    if (userIds.length === 0) {
      const firstUsername = await User.findOne({
        username: req.body.firstUsername,
      });
      const secondUsername = await User.findOne({
        username: req.body.secondUsername,
      });

      if (!firstUsername || !secondUsername) {
        return res.status(404).json("User not found");
      }

      if (firstUsername._id.toString() === secondUsername._id.toString()) {
        return res.status(400).json("User is the same person");
      }

      const chat = await Chat.findOne({
        members: {
          $all: [firstUsername._id, secondUsername._id],
        },
      });

      if (chat && req.body.type === "PRIVATE")
        return res.status(400).json("Users already haved chat");

      members = [firstUsername._id, secondUsername._id];
    } else {
      const userIdStrings = userIds.map((id) => id.toString());
      const userIdSet = new Set(userIdStrings);

      if (userIdSet.size !== userIds.length) {
        return res.status(400).json({ message: "Duplicate users detected" });
      }
      members = userIds;
    }

    const newChat = new Chat({
      name: req.body.name,
      members: members,
      type: req.body.type,
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

exports.getAllGroupChats = async (req, res) => {
  try {
    const allChats = await Chat.find({ type: "GROUP" });
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

exports.getPrivateChatByUsername = async (req, res) => {
  const firstId = req.body.firstId;
  const secondId = req.body.secondId;
  const firstUsername = req.body.firstUsername;
  const secondUsername = req.body.secondUsername;

  try {
    const firstUser = await User.findOne({
      $or: [{ _id: firstId }, { username: firstUsername }],
    });
    const secondUser = await User.findOne({
      $or: [{ _id: secondId }, { username: secondUsername }],
    });

    if (!firstUser || !secondUser) {
      return res.status(404).json("User not found.");
    }

    if (firstUser._id.toString() === secondUser._id.toString()) {
      return res.status(400).json("User is the same person");
    }

    const chat = await Chat.findOne({
      type: "PRIVATE",
      members: {
        $all: [firstUser._id, secondUser._id],
      },
    });

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

exports.addMemberToChat = async (req, res) => {
  const chatId = req.params.chatId;
  const memberId = req.body.memberId;

  try {
    let chat = await Chat.findOne({ _id: chatId });

    if (!chat) {
      return res.status(404).json("Chat not found");
    }

    if (chat.members.includes(memberId)) {
      return res.status(400).json("Member already exists in the chat");
    }

    if (chat.type === "PRIVATE") {
      return res.status(400).json("Cannot add member to private chat");
    }

    chat.members.push(memberId);

    chat = await chat.save();

    res
      .status(200)
      .json({ message: "Member add to the chat successfully", chat });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.removeMemberFromChat = async (req, res) => {
  const chatId = req.params.chatId;
  const memberId = req.params.memberId;

  try {
    let chat = await Chat.findOne({ _id: chatId });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.members.includes(memberId)) {
      return res
        .status(400)
        .json({ message: "Member does not exist in the chat" });
    }

    if (chat.members.length === 1) {
      const deletedChat = await Chat.findByIdAndDelete(chatId);
      return res
        .status(200)
        .json({ message: "Chat removed successfully (Removed last member)" });
    }

    chat.members.pull(memberId);

    chat = await chat.save();

    res
      .status(200)
      .json({ message: "Member removed from the chat successfully", chat });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.addMemberToRequestList = async (req, res) => {
  const chatId = req.params.chatId;
  const memberId = req.body.memberId;

  try {
    let chat = await Chat.findOne({ _id: chatId });

    if (!chat) {
      return res.status(404).json("Chat not found");
    }

    if (chat.requests.includes(memberId)) {
      return res.status(400).json("Member already requested to join");
    }

    if (chat.type === "PRIVATE") {
      return res.status(400).json("Cannot add member to private chat");
    }

    chat.requests.push(memberId);

    chat = await chat.save();

    res
      .status(200)
      .json({ message: "Member add to the request list successfully", chat });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.removeMemberFromRequestList = async (req, res) => {
  const chatId = req.params.chatId;
  const memberId = req.params.memberId;

  try {
    let chat = await Chat.findOne({ _id: chatId });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!chat.requests.includes(memberId)) {
      return res
        .status(400)
        .json({ message: "Member does not exist in the request list" });
    }

    chat.requests.pull(memberId);

    chat = await chat.save();

    res.status(200).json({
      message: "Member removed from the request list successfully",
      chat,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
