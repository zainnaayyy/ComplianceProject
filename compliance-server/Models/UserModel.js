const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  fullName: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Roles', required: true }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
