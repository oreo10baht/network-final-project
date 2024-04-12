const mongoose = require("mongoose");
const friendRequestsSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    status: {
      type: Number,
      enums: [
        0, //'requested',
        1, //'pending',
      ],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("FriendRequests", friendRequestsSchema);
