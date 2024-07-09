const User = require("../Models/UserModel");
const Role = require("../Models/RolesModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, fullName, roleIds, createdAt, status, site, LOB } = req.body;

    if(!email || !password || !fullName || !roleIds || !status || !site || !LOB) {
      return res.status(403).json({message:'All fields are required'})
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    // Ensure roleIds are valid ObjectIds
    if (!roleIds.every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ message: "Invalid role IDs" });
    }

    // Find roles by IDs
    const roles = await Role.find({ _id: { $in: roleIds } });
    if (roles.length !== roleIds.length) {
      return res.status(404).json({ message: "Some roles not found" });
    }

    // Create the user
    const user = await User.create({
      email,
      fullName,
      password,
      roles: roles.map(role => role),
      createdAt: createdAt || new Date(),
      status,
      site,
      LOB
    });

    // Save the user
    await user.save();

    // Create and set the token
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // Respond with success message
    res.status(201).json({ message: "User created successfully", success: true });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.status(403).json({message:'All fields are required', success: false})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({message:'Incorrect password or email', success: false}) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.status(401).json({message:'Incorrect password or email', success: false}) 
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    const userData = await User.findByIdAndUpdate(user._id, { token: token })
    userData.toObject();
    delete userData.password;
    res.status(200).json({ message: "User logged in successfully", success: true, token: token });
    next()
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports.Logout = async (req, res) => {
  try {
    const { userId } = req;
    await User.findByIdAndUpdate(userId, { token: null });
    res.clearCookie("token", {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({ message: "User logged out successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};