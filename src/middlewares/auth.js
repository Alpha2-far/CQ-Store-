/**
 * Middleware d'authentification pour le back-office GQ Store
 */
function requireAuth(req, res, next) {
  if (req.session && req.session.adminId) {
    return next();
  }
  
  // Stocker l'URL demandée pour redirection après connexion
  req.session.returnTo = req.originalUrl;
  
  if (req.session) {
    req.session.flash = {
      type: 'error',
      message: 'Veuillez vous connecter pour accéder à l’administration.'
    };
  }
  
  return res.redirect('/admin/login');
}

function redirectIfAuth(req, res, next) {
  if (req.session && req.session.adminId) {
    return res.redirect('/admin');
  }
  return next();
}

function authLocals(req, res, next) {
  res.locals.adminUser = req.session ? req.session.admin : null;
  res.locals.isAuthenticated = Boolean(req.session && req.session.adminId);
  res.locals.currentPath = req.baseUrl + req.path;
  
  // Flash messages
  res.locals.flash = (req.session && req.session.flash) ? req.session.flash : null;
  if (req.session) {
    delete req.session.flash;
  }
  
  next();
}

module.exports = {
  requireAuth,
  redirectIfAuth,
  authLocals
};
