const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
      required: [true, "Please enter the members"],
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
