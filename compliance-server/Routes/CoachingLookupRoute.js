const { addCoachingLookup, deleteCoachingLookupElement, getCoachingLookups } = require('../Controllers/CoachingLookupsController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/addCoachingLookup', authMiddleware, addCoachingLookup);
router.get('/getAllCoachingLookup', authMiddleware, getCoachingLookups);
router.delete('/deleteCoachingLookup', authMiddleware, deleteCoachingLookupElement);

module.exports = router;