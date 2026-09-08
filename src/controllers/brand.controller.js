const prisma = require('../config/prisma');
const { generateUniqueSlug } = require('../utils/slugify');
const { formatDate } = require('../utils/formatters');

const brandController = {
  // GET /admin/brands
  async list(req, res) {
    try {
      const brands = await prisma.brand.findMany({
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: { products: true }
          }
        }
      });

      res.render('admin/brands/index', {
        title: 'Marques | Administration GQ Store',
        brands,
        formatDate
      });
    } catch (error) {
      console.error('Erreur liste marques :', error);
      res.status(500).send('Erreur lors du chargement des marques');
    }
  },

  // GET /admin/brands/new
  getCreate(req, res) {
    res.render('admin/brands/form', {
      title: 'Nouvelle Marque | Administration GQ Store',
      brand: null
    });
  },

  // POST /admin/brands
  async postCreate(req, res) {
    const { name } = req.body;

    if (!name || !name.trim()) {
      req.session.flash = { type: 'error', message: 'Le nom de la marque est obligatoire.' };
      return res.redirect('/admin/brands/new');
    }

    try {
      const slug = await generateUniqueSlug(prisma.brand, name.trim());

      await prisma.brand.create({
        data: {
          name: name.trim(),
          slug
        }
      });

      req.session.flash = { type: 'success', message: 'Marque créée avec succès.' };
      return res.redirect('/admin/brands');
    } catch (error) {
      console.error('Erreur création marque :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors de la création de la marque.' };
      return res.redirect('/admin/brands/new');
    }
  },

  // GET /admin/brands/:id/edit
  async getEdit(req, res) {
    const { id } = req.params;
    try {
      const brand = await prisma.brand.findUnique({ where: { id } });
      if (!brand) {
        req.session.flash = { type: 'error', message: 'Marque introuvable.' };
        return res.redirect('/admin/brands');
      }

      res.render('admin/brands/form', {
        title: `Modifier « ${brand.name} » | Administration GQ Store`,
        brand
      });
    } catch (error) {
      console.error('Erreur chargement marque :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors du chargement de la marque.' };
      return res.redirect('/admin/brands');
    }
  },

  // POST /admin/brands/:id/edit
  async postEdit(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      req.session.flash = { type: 'error', message: 'Le nom de la marque est obligatoire.' };
      return res.redirect(`/admin/brands/${id}/edit`);
    }

    try {
      const brand = await prisma.brand.findUnique({ where: { id } });
      if (!brand) {
        req.session.flash = { type: 'error', message: 'Marque introuvable.' };
        return res.redirect('/admin/brands');
      }

      let slug = brand.slug;
      if (brand.name !== name.trim()) {
        slug = await generateUniqueSlug(prisma.brand, name.trim(), id);
      }

      await prisma.brand.update({
        where: { id },
        data: {
          name: name.trim(),
          slug
        }
      });

      req.session.flash = { type: 'success', message: 'Marque modifiée avec succès.' };
      return res.redirect('/admin/brands');
    } catch (error) {
      console.error('Erreur modification marque :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors de la modification de la marque.' };
      return res.redirect(`/admin/brands/${id}/edit`);
    }
  },

  // POST /admin/brands/:id/delete
  async delete(req, res) {
    const { id } = req.params;
    try {
      const brand = await prisma.brand.findUnique({
        where: { id },
        include: { _count: { select: { products: true } } }
      });

      if (!brand) {
        req.session.flash = { type: 'error', message: 'Marque introuvable.' };
        return res.redirect('/admin/brands');
      }

      if (brand._count.products > 0) {
        req.session.flash = {
          type: 'error',
          message: `Impossible de supprimer cette marque car ${brand._count.products} produit(s) y sont rattaché(s).`
        };
        return res.redirect('/admin/brands');
      }

      await prisma.brand.delete({ where: { id } });
      req.session.flash = { type: 'success', message: `Marque « ${brand.name} » supprimée avec succès.` };
      return res.redirect('/admin/brands');
    } catch (error) {
      console.error('Erreur suppression marque :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors de la suppression de la marque.' };
      return res.redirect('/admin/brands');
    }
  }
};

module.exports = brandController;
