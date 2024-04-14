const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const payload = {
          user_id: user._id.toString(),
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24 * 7,
        });
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res
          .status(200)
          .json({ message: "Login successful", token: token, ok: 1 });
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (error) {
    console.error("Error logging user in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.userLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log("Error creating user.");
    res.status(500).json({ message: error.message });
  }
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.user_id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, false);
  }
});
passport.use(jwtAuth);
exports.authenticateUser = passport.authenticate("jwt", { session: false });
