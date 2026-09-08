const bcrypt = require('bcryptjs');
const prisma = require('../config/prisma');

const authController = {
  // GET /admin/login
  getLogin(req, res) {
    res.render('admin/login', {
      title: 'Connexion Administration | GQ Store',
      layout: false
    });
  },

  // POST /admin/login
  async postLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      req.session.flash = {
        type: 'error',
        message: 'Veuillez saisir votre email et votre mot de passe.'
      };
      return res.redirect('/admin/login');
    }

    try {
      const admin = await prisma.admin.findUnique({
        where: { email: email.trim().toLowerCase() }
      });

      if (!admin) {
        req.session.flash = {
          type: 'error',
          message: 'Identifiants incorrects.'
        };
        return res.redirect('/admin/login');
      }

      const isMatch = await bcrypt.compare(password, admin.passwordHash);
      if (!isMatch) {
        req.session.flash = {
          type: 'error',
          message: 'Identifiants incorrects.'
        };
        return res.redirect('/admin/login');
      }

      // Connexion réussie : initialiser la session
      req.session.adminId = admin.id;
      req.session.admin = {
        id: admin.id,
        name: admin.name,
        email: admin.email
      };

      const destination = req.session.returnTo || '/admin';
      delete req.session.returnTo;

      req.session.flash = {
        type: 'success',
        message: `Ravi de vous revoir, ${admin.name} !`
      };

      return res.redirect(destination);
    } catch (error) {
      console.error('Erreur lors de la connexion admin :', error);
      req.session.flash = {
        type: 'error',
        message: 'Une erreur est survenue lors de la connexion.'
      };
      return res.redirect('/admin/login');
    }
  },

  // GET ou POST /admin/logout
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Erreur destruction session :', err);
      }
      res.clearCookie('connect.sid');
      return res.redirect('/admin/login');
    });
  }
};

module.exports = authController;
