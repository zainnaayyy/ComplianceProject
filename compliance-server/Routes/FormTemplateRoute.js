const { AddForm, getAllFormTemplates, editFormTemplate, searchFormTemplate, deleteFormTemplate } = require("../Controllers/FormTemplateController");
const { authMiddleware } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post('/addForm', authMiddleware, AddForm);
router.post('/editFormTemplate', authMiddleware, editFormTemplate)
router.get('/getAllFormTemplates', authMiddleware, getAllFormTemplates)
router.post('/searchFormTemplate', authMiddleware, searchFormTemplate)
router.delete('/deleteFormTemplate', authMiddleware, deleteFormTemplate);

module.exports = router;