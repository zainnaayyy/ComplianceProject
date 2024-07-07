const { addLOB, deleteLOB, getLOBById, getLOBs } = require('../Controllers/LOBController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/addLOB',  addLOB);
router.get('/getLOBs',  getLOBs);
router.get('/getLOBById',  getLOBById);
router.delete('/deleteLOB',  deleteLOB);

module.exports = router;