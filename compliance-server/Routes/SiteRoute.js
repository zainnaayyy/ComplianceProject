const { addSite, deleteSite, getSiteById, getSites, searchSite } = require('../Controllers/SiteController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/addSite', authMiddleware, addSite);
router.get('/getAllSites', authMiddleware, getSites);
router.post('/getSiteById', authMiddleware, getSiteById);
router.delete('/deleteSite', authMiddleware, deleteSite);
router.post('/searchSite', authMiddleware, searchSite);

module.exports = router;