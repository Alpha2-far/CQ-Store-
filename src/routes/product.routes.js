const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { requireAuth } = require('../middlewares/auth');
const { upload } = require('../middlewares/upload');

router.use(requireAuth);

router.get('/', productController.list);
router.get('/new', productController.getCreate);
router.post('/', upload.array('photos', 10), productController.postCreate);

router.get('/:id/edit', productController.getEdit);
router.post('/:id/edit', upload.array('photos', 10), productController.postEdit);

router.post('/:id/duplicate', productController.duplicate);
router.post('/:id/toggle-visibility', productController.toggleVisibility);
router.post('/:id/toggle-featured', productController.toggleFeatured);
router.post('/:id/delete', productController.delete);

module.exports = router;
