const { addSite, deleteSite, getSiteById, getSites, searchSite } = require('../Controllers/SiteController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/addSite', authMiddleware, addSite);
router.get('/getSites', authMiddleware, getSites);
router.get('/getSiteById', authMiddleware, getSiteById);
router.delete('/deleteSite', authMiddleware, deleteSite);
router.get('/searchSite', authMiddleware, searchSite);

module.exports = router;