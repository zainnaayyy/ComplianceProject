const { addLOB, deleteLOB, getLOBById, getLOBs, searchLOBs } = require('../Controllers/LOBController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/addLOB', authMiddleware, addLOB);
router.get('/getLOBs', authMiddleware, getLOBs);
router.get('/getLOBById', authMiddleware, getLOBById);
router.delete('/deleteLOB', authMiddleware, deleteLOB);
router.get('/searchLOB', authMiddleware, searchLOBs);

module.exports = router;