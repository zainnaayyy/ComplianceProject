const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const addressSchema = new mongoose.Schema({
  flatHouseNo: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  townCity: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  addressType: {
    type: String,
    required: true,
  },
});

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
  addresses: [addressSchema], // Include an array of addresses
  createdAt: {
    type: Date,
    default: new Date(),
  },
  token: {
    type: String,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;