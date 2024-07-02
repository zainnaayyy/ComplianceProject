const { addRole, getRoles, deleteRole, getRoleById, updateRole } = require('../Controllers/RolesController');
const router = require("express").Router();

router.post('/roles', addRole);
router.get('/roles', getRoles);
router.get('/roles/:id', getRoleById);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

module.exports = router;