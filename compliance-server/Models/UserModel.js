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
  status: {
    type: Boolean,
    required: [true, "Status is required"],
  },
  site: {
    type: String,
    required: [true, "Site is required"],
  },
  LOB: {
    type: String,
    required: [true, "Line of Business is required"],
  },
  profileImage: {
    type: String,
  },
  totalRecords: {
    type: Number,
  }
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

// Static method to get total number of records
userSchema.statics.getTotalRecords = async function () {
  return await this.countDocuments();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
