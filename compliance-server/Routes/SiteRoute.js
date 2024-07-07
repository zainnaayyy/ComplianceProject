const { addSite, deleteSite, getSiteById, getSites } = require('../Controllers/SiteController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/addSite', authMiddleware, addSite);
router.get('/getSites', authMiddleware, getSites);
router.get('/getSiteById', authMiddleware, getSiteById);
router.delete('/deleteSite', authMiddleware, deleteSite);

module.exports = router;