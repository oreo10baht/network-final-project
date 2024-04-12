const User = require("../models/user.model.js");
const Friend = require("../models/friend.model.js");

exports.addFriend = async (req, res) => {
  try {
    const requester = await User.findOne({ username: req.body.requesterName });
    const recipient = await User.findOne({ username: req.body.recipientName });
    console.log(requester.username, recipient.username);
    if (!requester || !recipient) {
      return res.status(404).json("User not found.");
    }
    if (requester.friends.includes(recipient._id)) {
      return res.status(400).json("Users are already friends!");
    }
    const friendRequest = new Friend({
      requester: requester,
      recipient: recipient,
      status: 1,
    });
    await friendRequest.save();
    requester.friends.push(friendRequest);
    await requester.save();
    recipient.friends.push(friendRequest);
    await recipient.save();

    res.status(200).json("Friend request sent.");
  } catch (error) {
    console.error("Error adding friend:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
