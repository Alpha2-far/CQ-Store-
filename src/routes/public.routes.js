const express = require('express');
const router = express.Router();
const publicController = require('../controllers/public.controller');
const seoController = require('../controllers/seo.controller');

// SEO : robots.txt et sitemap.xml
router.get('/robots.txt', seoController.getRobots);
router.get('/sitemap.xml', seoController.getSitemap);

// Page d'accueil
router.get('/', publicController.getHome);

// Catalogue général
router.get('/catalogue', publicController.getCatalog);

// Page d'une catégorie dédiée
router.get('/catalogue/:slug', publicController.getCategoryPage);

// Fiche produit complète
router.get('/produits/:slug', publicController.getProductDetail);

// Panier & Commande
router.get('/panier', publicController.getCart);

module.exports = router;
