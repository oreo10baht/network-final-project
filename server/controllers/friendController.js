const User = require("../models/user.model.js");

exports.addFriend = async (req, res) => {
  try {
    const requester = await User.findOne({ username: req.body.requesterName });
    const recipient = await User.findOne({ username: req.body.recipientName });
    if (!requester || !recipient) {
      return res.status(404).json("User not found.");
    }
    if (requester.friends.includes(recipient._id)) {
      return res.status(400).json("Users are already friends!");
    }
    if (
      requester.pendings.includes(recipient._id) ||
      recipient.requests.includes(requester._id)
    ) {
      return res.status(400).json("User has already sent friend request!");
    }
    await requester.pendings.push(recipient);
    await requester.save();
    await recipient.requests.push(requester);
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
    if (!requester || !recipient) {
      return res.status(404).json("User not found.");
    }

    if (!requester.friends.includes(recipient._id)) {
      return res.status(400).json("Users aren't friends though...");
    }
    await User.findByIdAndUpdate(requester._id, {
      $pull: { friends: recipient._id },
    });
    await requester.save();
    await User.findByIdAndUpdate(recipient._id, {
      $pull: { friends: requester._id },
    });
    await recipient.save();
    res.status(200).json({ message: "Friend removed successfully." });
  } catch (error) {
    console.error("Error removing friend:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.acceptFriend = async (req, res) => {
  try {
    const requester = await User.findOne({ username: req.body.requesterName });
    const recipient = await User.findOne({ username: req.body.recipientName });
    if (!requester || !recipient) {
      return res.status(404).json("User not found.");
    }

    if (
      !requester.pendings.includes(recipient._id) ||
      !recipient.requests.includes(requester._id)
    ) {
      return res.status(400).json("No friend request exists");
    }
    await User.findByIdAndUpdate(requester, {
      $push: { friends: recipient },
      $pull: { pendings: recipient._id },
    });
    await requester.save();
    await User.findByIdAndUpdate(recipient, {
      $push: { friends: requester },
      $pull: { requests: requester._id },
    });
    await recipient.save();
    res.status(200).json({ message: "Friend request accepted." });
  } catch (error) {
    console.error("Error accepting:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.cancelFriendRequest = async (req, res) => {
  try {
    const requester = await User.findOne({ username: req.body.requesterName });
    const recipient = await User.findOne({ username: req.body.recipientName });
    if (!requester || !recipient) {
      return res.status(404).json("User not found.");
    }

    if (
      !requester.pendings.includes(recipient._id) ||
      !recipient.requests.includes(requester._id)
    ) {
      return res.status(400).json("No friend request exists");
    }
    await User.findByIdAndUpdate(requester, {
      $pull: { pendings: recipient._id },
    });
    await requester.save();
    await User.findByIdAndUpdate(recipient, {
      $pull: { requests: requester._id },
    });
    await recipient.save();
    res.status(200).json({ message: "Friend request removed." });
  } catch (error) {
    console.error("Error accepting:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
