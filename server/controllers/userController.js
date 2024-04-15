const User = require("../models/user.model.js");

exports.deleteUser = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json("User deleted");
  } catch (error) {
    console.error("Error deleting user: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const response = {
      username: user.username,
      display_name: user.display_name,
      image: user.image,
      friends: user.friends,
      pendings: user.pendings,
      requests: user.requests,
      user_id: user._id,
      status: user.status,
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user by ID:");
    console.log(req.params.id);
    res.status(500).json({ message: error.message });
  }
};

exports.getUserByName = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const response = {
      username: user.username,
      display_name: user.display_name,
      image: user.image,
      friends: user.friends,
      pendings: user.pendings,
      requests: user.requests,
      user_id: user._id,
      status:user.status,

    };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user by username:");
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const result = users.map((user) => {
      user = {
        username: user.username,
        display_name: user.display_name,
        image: user.image,
        friends: user.friends,
        pendings: user.pendings,
        requests: user.requests,
        user_id: user._id,
      };
      return user;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const status = req.body.status;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

