const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/auth.controller');
const { redirectIfAuth, requireAuth } = require('../middlewares/auth');

// Limiteur de tentatives de connexion anti brute-force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // 15 tentatives maximum par fenêtre
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    if (req.session) {
      req.session.flash = {
        type: 'error',
        message: 'Trop de tentatives de connexion. Par mesure de sécurité, veuillez patienter 15 minutes.'
      };
      return res.redirect('/admin/login');
    }
    return res.status(options.statusCode).send('Trop de tentatives de connexion.');
  }
});

// Formulaire de connexion
router.get('/login', redirectIfAuth, authController.getLogin);

// Traitement de la connexion avec rate limiter
router.post('/login', loginLimiter, redirectIfAuth, authController.postLogin);

// Déconnexion
router.get('/logout', authController.logout);
router.post('/logout', authController.logout);

module.exports = router;
