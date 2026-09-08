const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { requireAuth } = require('../middlewares/auth');

const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const categoryRoutes = require('./category.routes');
const brandRoutes = require('./brand.routes');

// Routes d'authentification (login, logout)
router.use('/', authRoutes);

// Tableau de bord principal /admin
router.get('/', requireAuth, dashboardController.getDashboard);

// Sous-sections du back-office
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);

module.exports = router;
