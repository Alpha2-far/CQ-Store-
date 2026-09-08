function notFoundHandler(req, res) {
  if (req.originalUrl.startsWith('/admin')) {
    return res.status(404).render('admin/login', {
      title: 'Page non trouvée | GQ Store Admin',
      flash: { type: 'error', message: 'La page demandée n’existe pas.' }
    });
  }

  return res.status(404).render('public/404', {
    title: 'Page non trouvée — GQ Store',
    seo: {
      title: 'Page non trouvée — GQ Store',
      description: 'La page ou le produit que vous cherchez n’existe pas sur GQ Store.',
      noindex: true
    }
  });
}

function errorHandler(err, req, res, next) {
  console.error('Erreur non capturée :', err);

  // Erreur Multer
  if (err.name === 'MulterError') {
    if (req.session) {
      req.session.flash = { type: 'error', message: `Erreur d'upload : ${err.message}` };
    }
    return res.redirect('back');
  }

  const statusCode = err.status || 500;

  // En développement, afficher les détails de l'erreur pour faciliter le débogage
  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode).send(`<pre style="padding: 20px; font-family: monospace; background: #fee2e2; color: #991b1b; border-radius: 8px;">${err.stack}</pre>`);
  }

  // En production, afficher la page 500 élégante
  return res.status(statusCode).render('public/500', {
    title: 'Erreur serveur — GQ Store',
    seo: {
      title: 'Erreur serveur — GQ Store',
      noindex: true
    }
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
