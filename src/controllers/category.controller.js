const prisma = require('../config/prisma');
const { generateUniqueSlug } = require('../utils/slugify');
const { formatDate } = require('../utils/formatters');

const categoryController = {
  // GET /admin/categories
  async list(req, res) {
    try {
      const categories = await prisma.category.findMany({
        orderBy: [{ position: 'asc' }, { createdAt: 'desc' }],
        include: {
          _count: {
            select: { products: true }
          }
        }
      });

      res.render('admin/categories/index', {
        title: 'Catégories | Administration GQ Store',
        categories,
        formatDate
      });
    } catch (error) {
      console.error('Erreur liste catégories :', error);
      res.status(500).send('Erreur lors du chargement des catégories');
    }
  },

  // GET /admin/categories/new
  getCreate(req, res) {
    res.render('admin/categories/form', {
      title: 'Nouvelle Catégorie | Administration GQ Store',
      category: null
    });
  },

  // POST /admin/categories
  async postCreate(req, res) {
    const { name, description, position, isVisible, seoTitle, seoDescription } = req.body;

    if (!name || !name.trim()) {
      req.session.flash = { type: 'error', message: 'Le nom de la catégorie est obligatoire.' };
      return res.redirect('/admin/categories/new');
    }

    try {
      const slug = await generateUniqueSlug(prisma.category, name.trim());

      await prisma.category.create({
        data: {
          name: name.trim(),
          slug,
          description: description ? description.trim() : null,
          position: position ? parseInt(position, 10) : 0,
          isVisible: isVisible === 'on' || isVisible === true || isVisible === 'true',
          seoTitle: seoTitle ? seoTitle.trim() : null,
          seoDescription: seoDescription ? seoDescription.trim() : null
        }
      });

      req.session.flash = { type: 'success', message: 'Catégorie créée avec succès.' };
      return res.redirect('/admin/categories');
    } catch (error) {
      console.error('Erreur création catégorie :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors de la création de la catégorie.' };
      return res.redirect('/admin/categories/new');
    }
  },

  // GET /admin/categories/:id/edit
  async getEdit(req, res) {
    const { id } = req.params;
    try {
      const category = await prisma.category.findUnique({
        where: { id }
      });

      if (!category) {
        req.session.flash = { type: 'error', message: 'Catégorie introuvable.' };
        return res.redirect('/admin/categories');
      }

      res.render('admin/categories/form', {
        title: `Modifier « ${category.name} » | Administration GQ Store`,
        category
      });
    } catch (error) {
      console.error('Erreur chargement catégorie :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors du chargement de la catégorie.' };
      return res.redirect('/admin/categories');
    }
  },

  // POST /admin/categories/:id/edit
  async postEdit(req, res) {
    const { id } = req.params;
    const { name, description, position, isVisible, seoTitle, seoDescription } = req.body;

    if (!name || !name.trim()) {
      req.session.flash = { type: 'error', message: 'Le nom de la catégorie est obligatoire.' };
      return res.redirect(`/admin/categories/${id}/edit`);
    }

    try {
      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) {
        req.session.flash = { type: 'error', message: 'Catégorie introuvable.' };
        return res.redirect('/admin/categories');
      }

      // Si le nom a changé, recalculer le slug
      let slug = category.slug;
      if (category.name !== name.trim()) {
        slug = await generateUniqueSlug(prisma.category, name.trim(), id);
      }

      await prisma.category.update({
        where: { id },
        data: {
          name: name.trim(),
          slug,
          description: description ? description.trim() : null,
          position: position ? parseInt(position, 10) : 0,
          isVisible: isVisible === 'on' || isVisible === true || isVisible === 'true',
          seoTitle: seoTitle ? seoTitle.trim() : null,
          seoDescription: seoDescription ? seoDescription.trim() : null
        }
      });

      req.session.flash = { type: 'success', message: 'Catégorie modifiée avec succès.' };
      return res.redirect('/admin/categories');
    } catch (error) {
      console.error('Erreur modification catégorie :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors de la modification de la catégorie.' };
      return res.redirect(`/admin/categories/${id}/edit`);
    }
  },

  // POST /admin/categories/:id/toggle-visibility
  async toggleVisibility(req, res) {
    const { id } = req.params;
    try {
      const category = await prisma.category.findUnique({ where: { id } });
      if (!category) {
        req.session.flash = { type: 'error', message: 'Catégorie introuvable.' };
        return res.redirect('/admin/categories');
      }

      await prisma.category.update({
        where: { id },
        data: { isVisible: !category.isVisible }
      });

      req.session.flash = {
        type: 'success',
        message: `Catégorie « ${category.name} » passée en ${!category.isVisible ? 'visible' : 'masquée'}.`
      };
      return res.redirect('/admin/categories');
    } catch (error) {
      console.error('Erreur toggle visibilité catégorie :', error);
      req.session.flash = { type: 'error', message: 'Une erreur est survenue.' };
      return res.redirect('/admin/categories');
    }
  },

  // POST /admin/categories/:id/delete
  async delete(req, res) {
    const { id } = req.params;
    try {
      const category = await prisma.category.findUnique({
        where: { id },
        include: { _count: { select: { products: true } } }
      });

      if (!category) {
        req.session.flash = { type: 'error', message: 'Catégorie introuvable.' };
        return res.redirect('/admin/categories');
      }

      if (category._count.products > 0) {
        req.session.flash = {
          type: 'error',
          message: `Impossible de supprimer cette catégorie car ${category._count.products} produit(s) y sont rattaché(s). Déplacez ces produits d'abord.`
        };
        return res.redirect('/admin/categories');
      }

      await prisma.category.delete({ where: { id } });
      req.session.flash = { type: 'success', message: `Catégorie « ${category.name} » supprimée avec succès.` };
      return res.redirect('/admin/categories');
    } catch (error) {
      console.error('Erreur suppression catégorie :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors de la suppression de la catégorie.' };
      return res.redirect('/admin/categories');
    }
  }
};

module.exports = categoryController;
