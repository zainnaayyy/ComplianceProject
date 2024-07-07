const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const bearerToken = req.header('Authorization');
  const token = bearerToken.replace("Bearer ", "")
  if (!token) {
    return res.json({ success: false, message: 'Token is required'})
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
      return res.json({ success: false, message: 'Token is required' })
    } else {
      const user = await User.findById(data.id)
      const userData = user.toObject();
      delete userData.password;
      if (user) return res.json({ success: true, user: userData })
      else return res.json({ success: false, message: 'Token is required' })
    }
  })
}

module.exports.authMiddleware = async(req, res, next) => {
  const bearerToken = req.header('Authorization');
  const token = bearerToken.replace("Bearer ",'')
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Replace 'your-secret-key' with your actual secret key
    const user = await User.findOne({ _id: decoded.id, token: token });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - Token not found in the database' });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};