const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { requireAuth } = require('../middlewares/auth');

router.use(requireAuth);

router.get('/', categoryController.list);
router.get('/new', categoryController.getCreate);
router.post('/', categoryController.postCreate);

router.get('/:id/edit', categoryController.getEdit);
router.post('/:id/edit', categoryController.postEdit);
router.post('/:id/toggle-visibility', categoryController.toggleVisibility);
router.post('/:id/delete', categoryController.delete);

module.exports = router;
