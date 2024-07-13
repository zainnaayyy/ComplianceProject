const { addRole, getRoles, deleteRole, getRoleById, updateRole } = require('../Controllers/RolesController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');
const router = require("express").Router();

router.post('/roles', authMiddleware, addRole);
router.get('/roles', getRoles);
router.get('/roles/:id',authMiddleware, getRoleById);
router.put('/roles/:id',authMiddleware, updateRole);
router.delete('/roles/:id',authMiddleware, deleteRole);

module.exports = router;