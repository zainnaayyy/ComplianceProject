const { AddCoaching, deleteCoaching, editCoaching, getAllCoachings, searchCoaching } = require("../Controllers/CoachingController");
const { authMiddleware } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post('/addCoaching', authMiddleware, AddCoaching);
router.post('/editCoaching', authMiddleware, editCoaching)
router.get('/getAllCoachings', authMiddleware, getAllCoachings)
router.post('/searchCoaching', authMiddleware, searchCoaching)
router.delete('/deleteCoaching', authMiddleware, deleteCoaching);

module.exports = router;