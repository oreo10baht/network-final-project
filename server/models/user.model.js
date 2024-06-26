const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username."],
      index: { unique: true },
    },
    display_name: {
      type: String,
      required: [true, "Please enter your display name."],
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type:Number,
      default: 0,
      //0 offline, 1 online
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    pendings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
