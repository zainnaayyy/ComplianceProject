const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, fullName, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, fullName, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
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