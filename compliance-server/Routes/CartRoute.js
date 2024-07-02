const express = require('express');
const router = express.Router();
const { addToCart, viewCart } = require('../Controllers/CartContoller');
const { authMiddleware }  = require('../Middlewares/AuthMiddleware');

router.post('/addToCart', authMiddleware, addToCart);
router.get('/viewCart', authMiddleware, viewCart);

module.exports = router;
