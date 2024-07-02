const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const bearerToken = req.header('Authorization');
  const token = bearerToken.replace("Bearer ", "")
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.fullName })
      else return res.json({ status: false })
    }
  })
}

module.exports.authMiddleware = (req, res, next) => {
    const bearerToken = req.header('Authorization');
    const token = bearerToken.replace("Bearer ",'')
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Missing token' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY); // Replace 'your-secret-key' with your actual secret key
      // idhr mene logic banai hai k token db mei para hai k nahi ya hawai aya hai kahin sei
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
  };