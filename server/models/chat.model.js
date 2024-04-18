const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    name: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
      required: [true, "Please enter the members"],
    },
    type: { type: String, enum: ["PRIVATE", "GROUP"], default: "GROUP" },
    requests: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
