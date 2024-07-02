const { addCategory, getCategories } = require('../Controllers/CategoryController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/addCategory', authMiddleware, addCategory);
router.get('/getCategories', authMiddleware, getCategories);

module.exports = router;