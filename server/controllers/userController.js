const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log("Error creating user.");
    res.status(500).json({ message: error.message });
  }
};
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
    const response = { user: user.username, image: user.image };
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user by ID:");
    res.status(500).json({ message: error.message });
  }
};
exports.getUserByName = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const response = { user: user.username, image: user.image };
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
        image: user.image,
        friends: user.friends,
      };
      return user;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        return res
          .status(200)
          .json({ message: "Login successful", user: user });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Error logging user in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
