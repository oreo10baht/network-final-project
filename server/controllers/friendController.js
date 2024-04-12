const User = require("../models/user.model.js");
const FriendRequest = require("../models/friendRequest.model.js");

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
    if (requester.friendRequests.includes(recipient._id)) {
      return res.status(400).json("User has already sent friend request!");
    }
    const friendRequest = new FriendRequest({
      requester: requester,
      recipient: recipient,
      status: 0,
    });
    const pendingRequest = new FriendRequest({
      requester: requester,
      recipient: recipient,
      status: 1,
    });
    await friendRequest.save();
    requester.friendRequests.push(pendingRequest);
    await requester.save();
    recipient.friendRequests.push(friendRequest);
    await recipient.save();

    res.status(200).json("Friend request sent.");
  } catch (error) {
    console.error("Error adding friend:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeFriend = async (req, res) => {
  try {
    const requester = await User.findOne({ username: req.body.requesterName });
    const recipient = await User.findOne({ username: req.body.recipientName });
    console.log(requester.username, recipient.username);
    if (!requester || !recipient) {
      return res.status(404).json("User not found.");
    }
    console.log(requester.friends);
    console.log(recipient._id);
    if (!requester.friends.includes(recipient._id)) {
      return res.status(400).json("Users aren't friends though...");
    }
    await User.findByIdAndUpdate(requester._id, {
      $pull: { friends: recipient._id },
    });

    await User.findByIdAndUpdate(recipient._id, {
      $pull: { friends: requester._id },
    });

    res.status(200).json({ message: "Friend removed successfully." });
  } catch (error) {
    console.error("Error removing friend:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
