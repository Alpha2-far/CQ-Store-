const prisma = require('../config/prisma');
const { generateUniqueSlug } = require('../utils/slugify');
const { formatFCFA, formatDate } = require('../utils/formatters');
const { uploadToStorage, deleteFromStorage } = require('../middlewares/upload');

const productController = {
  // GET /admin/products
  async list(req, res) {
    try {
      const { q, categoryId, status, page = 1 } = req.query;
      const pageSize = 15;
      const currentPage = Math.max(1, parseInt(page, 10) || 1);

      // Construction des filtres de recherche
      const where = {};

      if (q && q.trim()) {
        const query = q.trim();
        where.OR = [
          { name: { contains: query, mode: 'insensitive' } },
          { reference: { contains: query, mode: 'insensitive' } },
          { condition: { contains: query, mode: 'insensitive' } },
          { brand: { name: { contains: query, mode: 'insensitive' } } },
          { category: { name: { contains: query, mode: 'insensitive' } } }
        ];
      }

      if (categoryId) {
        where.categoryId = categoryId;
      }

      if (status === 'available') {
        where.stock = { gt: 0 };
        where.isVisible = true;
      } else if (status === 'out_of_stock') {
        where.stock = { lte: 0 };
      } else if (status === 'hidden') {
        where.isVisible = false;
      } else if (status === 'featured') {
        where.isFeatured = true;
      }

      const [totalCount, products, categories] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
          include: {
            category: true,
            brand: true,
            photos: {
              where: { isMain: true },
              take: 1
            }
          }
        }),
        prisma.category.findMany({ orderBy: { name: 'asc' } })
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);

      res.render('admin/products/index', {
        title: 'Produits | Administration GQ Store',
        products,
        categories,
        filters: { q, categoryId, status },
        pagination: {
          currentPage,
          totalPages,
          totalCount
        },
        formatFCFA,
        formatDate
      });
    } catch (error) {
      console.error('Erreur liste produits :', error);
      res.status(500).send('Erreur lors du chargement des produits');
    }
  },

  // GET /admin/products/new
  async getCreate(req, res) {
    try {
      const [categories, brands, specLabelsRaw, conditionsRaw] = await Promise.all([
        prisma.category.findMany({ orderBy: { position: 'asc' } }),
        prisma.brand.findMany({ orderBy: { name: 'asc' } }),
        prisma.specification.findMany({
          select: { label: true },
          distinct: ['label']
        }),
        prisma.product.findMany({
          select: { condition: true },
          distinct: ['condition']
        })
      ]);

      const existingSpecLabels = specLabelsRaw.map((s) => s.label).filter(Boolean);
      const existingConditions = conditionsRaw.map((c) => c.condition).filter(Boolean);

      // Suggestions par défaut si la base est encore vide
      const defaultSuggestions = ['Processeur', 'RAM', 'Stockage', 'Écran', 'Carte Graphique', 'Système d’exploitation', 'Batterie'];
      const combinedSpecLabels = Array.from(new Set([...existingSpecLabels, ...defaultSuggestions]));
      const defaultConditions = ['Neuf', 'Reconditionné', 'Occasion'];
      const combinedConditions = Array.from(new Set([...existingConditions, ...defaultConditions]));

      res.render('admin/products/form', {
        title: 'Nouveau Produit | Administration GQ Store',
        product: null,
        categories,
        brands,
        specLabels: combinedSpecLabels,
        existingConditions: combinedConditions
      });
    } catch (error) {
      console.error('Erreur formulaire création produit :', error);
      res.status(500).send('Erreur lors de l’ouverture du formulaire');
    }
  },

  // POST /admin/products
  async postCreate(req, res) {
    try {
      const {
        name,
        categoryId,
        brandId,
        description,
        price,
        promoPrice,
        stock,
        reference,
        condition,
        isFeatured,
        isVisible,
        seoTitle,
        seoDescription,
        specLabels,
        specValues
      } = req.body;

      if (!name || !categoryId || !price || !reference) {
        req.session.flash = {
          type: 'error',
          message: 'Veuillez remplir tous les champs obligatoires (nom, catégorie, référence, prix).'
        };
        return res.redirect('/admin/products/new');
      }

      const slug = await generateUniqueSlug(prisma.product, name.trim());

      // Parse specs
      const specificationsData = [];
      if (specLabels && specValues) {
        const labels = Array.isArray(specLabels) ? specLabels : [specLabels];
        const values = Array.isArray(specValues) ? specValues : [specValues];

        for (let i = 0; i < labels.length; i++) {
          if (labels[i] && labels[i].trim() && values[i] && values[i].trim()) {
            specificationsData.push({
              label: labels[i].trim(),
              value: values[i].trim(),
              position: i + 1
            });
          }
        }
      }

      // Traitement des photos uploadées
      const uploadedFiles = req.files || [];
      const photosData = [];

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const { url, publicId } = await uploadToStorage(file, 'gq-store/products');
        photosData.push({
          url,
          publicId,
          alt: `${name.trim()} - Vue ${i + 1}`,
          position: i + 1,
          isMain: i === 0 // Première photo principale par défaut
        });
      }

      // Création du produit en base
      const newProduct = await prisma.product.create({
        data: {
          name: name.trim(),
          slug,
          description: description ? description.trim() : null,
          price: parseInt(price, 10),
          promoPrice: promoPrice && promoPrice.trim() !== '' ? parseInt(promoPrice, 10) : null,
          stock: stock !== undefined && stock !== '' ? parseInt(stock, 10) : 0,
          reference: reference.trim(),
          condition: condition && condition.trim() ? condition.trim() : 'Neuf',
          isFeatured: isFeatured === 'on' || isFeatured === true || isFeatured === 'true',
          isVisible: isVisible === 'on' || isVisible === true || isVisible === 'true',
          seoTitle: seoTitle ? seoTitle.trim() : null,
          seoDescription: seoDescription ? seoDescription.trim() : null,
          categoryId,
          brandId: brandId && brandId.trim() !== '' ? brandId : null,
          specifications: {
            create: specificationsData
          },
          photos: {
            create: photosData
          }
        }
      });

      req.session.flash = {
        type: 'success',
        message: `Produit « ${newProduct.name} » créé avec succès.`
      };
      return res.redirect('/admin/products');
    } catch (error) {
      console.error('Erreur création produit :', error);
      req.session.flash = {
        type: 'error',
        message: `Erreur lors de la création du produit : ${error.message}`
      };
      return res.redirect('/admin/products/new');
    }
  },

  // GET /admin/products/:id/edit
  async getEdit(req, res) {
    const { id } = req.params;
    try {
      const [product, categories, brands, specLabelsRaw, conditionsRaw] = await Promise.all([
        prisma.product.findUnique({
          where: { id },
          include: {
            category: true,
            brand: true,
            specifications: { orderBy: { position: 'asc' } },
            photos: { orderBy: { position: 'asc' } }
          }
        }),
        prisma.category.findMany({ orderBy: { position: 'asc' } }),
        prisma.brand.findMany({ orderBy: { name: 'asc' } }),
        prisma.specification.findMany({ select: { label: true }, distinct: ['label'] }),
        prisma.product.findMany({ select: { condition: true }, distinct: ['condition'] })
      ]);

      if (!product) {
        req.session.flash = { type: 'error', message: 'Produit introuvable.' };
        return res.redirect('/admin/products');
      }

      const existingSpecLabels = specLabelsRaw.map((s) => s.label).filter(Boolean);
      const existingConditions = conditionsRaw.map((c) => c.condition).filter(Boolean);

      const defaultSuggestions = ['Processeur', 'RAM', 'Stockage', 'Écran', 'Carte Graphique', 'Système d’exploitation', 'Batterie'];
      const combinedSpecLabels = Array.from(new Set([...existingSpecLabels, ...defaultSuggestions]));
      const defaultConditions = ['Neuf', 'Reconditionné', 'Occasion'];
      const combinedConditions = Array.from(new Set([...existingConditions, ...defaultConditions]));

      res.render('admin/products/form', {
        title: `Modifier « ${product.name} » | Administration GQ Store`,
        product,
        categories,
        brands,
        specLabels: combinedSpecLabels,
        existingConditions: combinedConditions
      });
    } catch (error) {
      console.error('Erreur chargement édition produit :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors du chargement du produit.' };
      return res.redirect('/admin/products');
    }
  },

  // POST /admin/products/:id/edit
  async postEdit(req, res) {
    const { id } = req.params;
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id },
        include: { photos: true, specifications: true }
      });

      if (!existingProduct) {
        req.session.flash = { type: 'error', message: 'Produit introuvable.' };
        return res.redirect('/admin/products');
      }

      const {
        name,
        categoryId,
        brandId,
        description,
        price,
        promoPrice,
        stock,
        reference,
        condition,
        isFeatured,
        isVisible,
        seoTitle,
        seoDescription,
        specLabels,
        specValues,
        mainPhotoId,
        deletePhotos
      } = req.body;

      if (!name || !categoryId || !price || !reference) {
        req.session.flash = {
          type: 'error',
          message: 'Veuillez remplir tous les champs obligatoires (nom, catégorie, référence, prix).'
        };
        return res.redirect(`/admin/products/${id}/edit`);
      }

      // Slug unique si changement de nom
      let slug = existingProduct.slug;
      if (existingProduct.name !== name.trim()) {
        slug = await generateUniqueSlug(prisma.product, name.trim(), id);
      }

      // 1. Mise à jour des caractéristiques : supprimer et recréer
      await prisma.specification.deleteMany({ where: { productId: id } });

      const specificationsData = [];
      if (specLabels && specValues) {
        const labels = Array.isArray(specLabels) ? specLabels : [specLabels];
        const values = Array.isArray(specValues) ? specValues : [specValues];

        for (let i = 0; i < labels.length; i++) {
          if (labels[i] && labels[i].trim() && values[i] && values[i].trim()) {
            specificationsData.push({
              label: labels[i].trim(),
              value: values[i].trim(),
              position: i + 1,
              productId: id
            });
          }
        }
        if (specificationsData.length > 0) {
          await prisma.specification.createMany({ data: specificationsData });
        }
      }

      // 2. Traitement des suppressions de photos demandées
      const photosToDeleteIds = deletePhotos
        ? (Array.isArray(deletePhotos) ? deletePhotos : [deletePhotos])
        : [];

      for (const photoId of photosToDeleteIds) {
        const photo = existingProduct.photos.find((p) => p.id === photoId);
        if (photo) {
          await deleteFromStorage(photo.url, photo.publicId);
          await prisma.productPhoto.delete({ where: { id: photoId } });
        }
      }

      // 3. Traitement des nouvelles photos uploadées
      const uploadedFiles = req.files || [];
      const currentPhotoCount = await prisma.productPhoto.count({ where: { productId: id } });

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const { url, publicId } = await uploadToStorage(file, 'gq-store/products');
        await prisma.productPhoto.create({
          data: {
            url,
            publicId,
            alt: `${name.trim()} - Photo ${currentPhotoCount + i + 1}`,
            position: currentPhotoCount + i + 1,
            isMain: false,
            productId: id
          }
        });
      }

      // 4. Mise à jour de la photo principale et des textes alternatifs
      const remainingPhotos = await prisma.productPhoto.findMany({
        where: { productId: id },
        orderBy: { position: 'asc' }
      });

      if (remainingPhotos.length > 0) {
        const targetMainId = mainPhotoId && remainingPhotos.some((p) => p.id === mainPhotoId)
          ? mainPhotoId
          : remainingPhotos[0].id;

        for (const photo of remainingPhotos) {
          const photoAlt = req.body[`photo_alt_${photo.id}`];
          await prisma.productPhoto.update({
            where: { id: photo.id },
            data: {
              isMain: photo.id === targetMainId,
              alt: photoAlt ? photoAlt.trim() : photo.alt
            }
          });
        }
      }

      // 5. Mise à jour des informations produit
      await prisma.product.update({
        where: { id },
        data: {
          name: name.trim(),
          slug,
          description: description ? description.trim() : null,
          price: parseInt(price, 10),
          promoPrice: promoPrice && promoPrice.trim() !== '' ? parseInt(promoPrice, 10) : null,
          stock: stock !== undefined && stock !== '' ? parseInt(stock, 10) : 0,
          reference: reference.trim(),
          condition: condition && condition.trim() ? condition.trim() : 'Neuf',
          isFeatured: isFeatured === 'on' || isFeatured === true || isFeatured === 'true',
          isVisible: isVisible === 'on' || isVisible === true || isVisible === 'true',
          seoTitle: seoTitle ? seoTitle.trim() : null,
          seoDescription: seoDescription ? seoDescription.trim() : null,
          categoryId,
          brandId: brandId && brandId.trim() !== '' ? brandId : null
        }
      });

      req.session.flash = {
        type: 'success',
        message: `Produit « ${name.trim()} » mis à jour avec succès.`
      };
      return res.redirect('/admin/products');
    } catch (error) {
      console.error('Erreur modification produit :', error);
      req.session.flash = {
        type: 'error',
        message: `Erreur lors de la modification : ${error.message}`
      };
      return res.redirect(`/admin/products/${id}/edit`);
    }
  },

  // POST /admin/products/:id/duplicate
  async duplicate(req, res) {
    const { id } = req.params;
    try {
      const original = await prisma.product.findUnique({
        where: { id },
        include: {
          specifications: true,
          photos: true
        }
      });

      if (!original) {
        req.session.flash = { type: 'error', message: 'Produit original introuvable.' };
        return res.redirect('/admin/products');
      }

      const newName = `${original.name} (Copie)`;
      const newSlug = await generateUniqueSlug(prisma.product, newName);
      const newReference = `${original.reference}-COP`;

      const duplicated = await prisma.product.create({
        data: {
          name: newName,
          slug: newSlug,
          description: original.description,
          price: original.price,
          promoPrice: original.promoPrice,
          stock: original.stock,
          reference: newReference,
          condition: original.condition,
          isVisible: false, // Par précaution, produit cloné masqué au départ
          isFeatured: false,
          seoTitle: original.seoTitle,
          seoDescription: original.seoDescription,
          categoryId: original.categoryId,
          brandId: original.brandId,
          specifications: {
            create: original.specifications.map((s) => ({
              label: s.label,
              value: s.value,
              position: s.position
            }))
          },
          photos: {
            create: original.photos.map((p) => ({
              url: p.url,
              publicId: p.publicId,
              alt: p.alt,
              position: p.position,
              isMain: p.isMain
            }))
          }
        }
      });

      req.session.flash = {
        type: 'success',
        message: `Produit dupliqué avec succès : « ${duplicated.name} » (masqué par défaut).`
      };
      return res.redirect(`/admin/products/${duplicated.id}/edit`);
    } catch (error) {
      console.error('Erreur duplication produit :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors de la duplication du produit.' };
      return res.redirect('/admin/products');
    }
  },

  // POST /admin/products/:id/toggle-visibility
  async toggleVisibility(req, res) {
    const { id } = req.params;
    try {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) {
        req.session.flash = { type: 'error', message: 'Produit introuvable.' };
        return res.redirect('/admin/products');
      }

      const updated = await prisma.product.update({
        where: { id },
        data: { isVisible: !product.isVisible }
      });

      req.session.flash = {
        type: 'success',
        message: `Produit « ${product.name} » ${updated.isVisible ? 'publié' : 'masqué'}.`
      };
      return res.redirect('/admin/products');
    } catch (error) {
      console.error('Erreur visibilité produit :', error);
      req.session.flash = { type: 'error', message: 'Une erreur est survenue.' };
      return res.redirect('/admin/products');
    }
  },

  // POST /admin/products/:id/toggle-featured
  async toggleFeatured(req, res) {
    const { id } = req.params;
    try {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) {
        req.session.flash = { type: 'error', message: 'Produit introuvable.' };
        return res.redirect('/admin/products');
      }

      const updated = await prisma.product.update({
        where: { id },
        data: { isFeatured: !product.isFeatured }
      });

      req.session.flash = {
        type: 'success',
        message: `Produit « ${product.name} » ${updated.isFeatured ? 'mis en avant' : 'retiré des sélections'}.`
      };
      return res.redirect('/admin/products');
    } catch (error) {
      console.error('Erreur mise en avant produit :', error);
      req.session.flash = { type: 'error', message: 'Une erreur est survenue.' };
      return res.redirect('/admin/products');
    }
  },

  // POST /admin/products/:id/delete
  async delete(req, res) {
    const { id } = req.params;
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: { photos: true }
      });

      if (!product) {
        req.session.flash = { type: 'error', message: 'Produit introuvable.' };
        return res.redirect('/admin/products');
      }

      // Nettoyer les fichiers de photos
      for (const photo of product.photos) {
        await deleteFromStorage(photo.url, photo.publicId);
      }

      await prisma.product.delete({ where: { id } });

      req.session.flash = {
        type: 'success',
        message: `Produit « ${product.name} » supprimé définitivement.`
      };
      return res.redirect('/admin/products');
    } catch (error) {
      console.error('Erreur suppression produit :', error);
      req.session.flash = { type: 'error', message: 'Erreur lors de la suppression du produit.' };
      return res.redirect('/admin/products');
    }
  }
};

module.exports = productController;
