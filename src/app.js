const express = require('express');
const path = require('path');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const { authLocals } = require('./middlewares/auth');
const adminRoutes = require('./routes/admin.routes');
const { notFoundHandler, errorHandler } = require('./middlewares/error');

const app = express();

// Compression HTTP automatique pour accélérer les transferts
app.use(compression());

// En-têtes HTTP de sécurité avec Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

// Configuration du moteur de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares pour le parsing des formulaires et JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Fichiers statiques avec mise en cache HTTP optimisée
app.use(
  express.static(path.join(__dirname, '../public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '30d' : 0,
    etag: true
  })
);

// Configuration de la session utilisateur
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'gq-store-session-secret-default',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 heures
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  }
};

// En production ou si DATABASE_URL est disponible, persister les sessions dans PostgreSQL
if (process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
  sessionConfig.store = new pgSession({
    pool: pool,
    tableName: 'session',
    createTableIfMissing: true
  });
}

app.use(session(sessionConfig));

// Injection des variables globales pour les vues (utilisateur connecté, flash, etc.)
app.use(authLocals);

// Injection des variables publiques globales (WhatsApp, nom du site)
app.use((req, res, next) => {
  res.locals.whatsappNumber = process.env.WHATSAPP_NUMBER || '22998471366';
  next();
});

// Montage des routes du back-office
app.use('/admin', adminRoutes);

// Montage des routes publiques (Accueil, Catalogue, Fiches produits)
const publicRoutes = require('./routes/public.routes');
app.use('/', publicRoutes);

// Gestion des erreurs 404 et globales
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
