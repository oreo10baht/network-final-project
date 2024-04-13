const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chats" }],
      required: [true, "Please enter chatId"],
    },
    sender: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
      required: [true, "Please enter the sender"],
    },
    text: {
      type: String,
      required: [true, "Please enter the message"],
    },
    index: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
