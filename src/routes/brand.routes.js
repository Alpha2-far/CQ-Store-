const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');
const { requireAuth } = require('../middlewares/auth');

router.use(requireAuth);

router.get('/', brandController.list);
router.get('/new', brandController.getCreate);
router.post('/', brandController.postCreate);

router.get('/:id/edit', brandController.getEdit);
router.post('/:id/edit', brandController.postEdit);
router.post('/:id/delete', brandController.delete);

module.exports = router;
