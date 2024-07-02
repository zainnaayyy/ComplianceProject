const { Signup, Login, addAddress, updateAddress, removeAddress } = require("../Controllers/AuthController");
const { userVerification, authMiddleware } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login)
router.post('/',userVerification)
router.post('/addAddress', authMiddleware, addAddress);
router.patch('/updateAddress', authMiddleware, updateAddress);
router.delete('/removeAddress', authMiddleware, removeAddress);

module.exports = router;