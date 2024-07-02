const router = require("express").Router();
const { addProduct, getProducts, getProductsByCategories, getProductById, handleFileUpload, searchProducts } = require('../Controllers/ProductController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const uploadMiddleware = require('../Middlewares/UploadMiddleware');

router.post('/addProduct', authMiddleware, uploadMiddleware, addProduct);
// router.post('/upload',uploadMiddleware.array("images"), handleFileUpload);
router.get('/getProducts', authMiddleware, getProducts);
router.get('/search', authMiddleware, searchProducts);
router.post('/getProductsByCategories', authMiddleware, getProductsByCategories);
router.post('/getProductById', authMiddleware, getProductById);

module.exports = router;