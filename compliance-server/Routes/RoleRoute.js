const { addRole, getRoles, deleteRole, getRoleById, searchRole } = require('../Controllers/RolesController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/roles', authMiddleware, addRole);
router.get('/getAllRoles', getRoles);
router.post('/roles',authMiddleware, getRoleById);
router.delete('/deleteRoles',authMiddleware, deleteRole);
router.post('/searchRoles',authMiddleware, searchRole);

module.exports = router;