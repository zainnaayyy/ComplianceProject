const { Signup, Login, Logout } = require("../Controllers/AuthController");
const { userVerification, authMiddleware } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login)
router.post('/', userVerification)
router.post('/logout', authMiddleware, Logout)

module.exports = router;