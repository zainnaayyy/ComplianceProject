const { Signup, Login, Logout, editUser, getAllUsers, searchUsers, addProfileImage, deleteProfileImage, deleteUser } = require("../Controllers/AuthController");
const { userVerification, authMiddleware } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post('/addUser', authMiddleware, Signup);
router.post('/login', Login)
router.post('/', userVerification)
router.post('/logout', authMiddleware, Logout)
router.post('/editUser', authMiddleware, editUser)
router.get('/getAllUsers', authMiddleware, getAllUsers)
router.post('/searchUsers', authMiddleware, searchUsers)
router.delete('/deleteUser', authMiddleware, deleteUser);
router.post('/addProfileImage', authMiddleware, addProfileImage)
router.delete('/deleteProfileImage', authMiddleware, deleteProfileImage)

module.exports = router;