const User = require("../Models/UserModel");
const Role = require("../Models/RolesModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, fullName, roleIds, createdAt } = req.body;

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
    res.status(201).json({ message: "User signed in successfully", success: true, user });
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
        return res.status(403).json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      if(!user){
        return res.status(401).json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.status(401).json({message:'Incorrect password or email' }) 
      }
       const token = createSecretToken(user._id);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: false,
       });
        User.findByIdAndUpdate(user._id, { token: token })
       res.status(201).json({ message: "User logged in successfully", success: true, token: token, data: user });
       next()
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  exports.addAddress = async (req, res) => {
    const { flatHouseNo, landmark, townCity, pincode, state, addressType } = req.body;
    const userId = req.userId;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            addresses: {
              flatHouseNo,
              landmark,
              townCity,
              pincode,
              state,
              addressType,
            },
          },
        },
        { new: true }
      );
  
      res.status(200).json({ message: 'Address added successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.updateAddress = async (req, res) => {
    const { addressId, flatHouseNo, landmark, townCity, pincode, state, addressType } = req.body;
    const userId = req.userId;
  
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId, 'addresses._id': addressId },
        {
          $set: {
            'addresses.$.flatHouseNo': flatHouseNo,
            'addresses.$.landmark': landmark,
            'addresses.$.townCity': townCity,
            'addresses.$.pincode': pincode,
            'addresses.$.state': state,
            'addresses.$.addressType': addressType,
          },
        },
        { new: true }
      );
  
      res.status(200).json({ message: 'Address updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.removeAddress = async (req, res) => {
    const { addressId } = req.body;
    const userId = req.userId;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            addresses: { _id: addressId },
          },
        },
        { new: true }
      );
  
      res.status(200).json({ message: 'Address removed successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };