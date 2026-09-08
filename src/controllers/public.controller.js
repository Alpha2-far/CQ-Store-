const prisma = require('../config/prisma');
const { formatFCFA, formatDate } = require('../utils/formatters');
const {
  getBaseUrl,
  generateProductSeo,
  generateCategorySeo,
  generateCatalogSeo,
  generateHomeSeo
} = require('../utils/seo');

const publicController = {
  // GET /
  async getHome(req, res) {
    try {
      const [categories, featuredProducts, recentProducts] = await Promise.all([
        // Catégories visibles avec ordre d'affichage
        prisma.category.findMany({
          where: { isVisible: true },
          orderBy: { position: 'asc' },
          take: 6,
          include: {
            _count: {
              select: { products: { where: { isVisible: true } } }
            }
          }
        }),
        // Produits mis en avant
        prisma.product.findMany({
          where: {
            isVisible: true,
            isFeatured: true,
            category: { isVisible: true }
          },
          take: 6,
          orderBy: { updatedAt: 'desc' },
          include: {
            category: true,
            brand: true,
            photos: {
              where: { isMain: true },
              take: 1
            }
          }
        }),
        // Nouveaux arrivages récents
        prisma.product.findMany({
          where: {
            isVisible: true,
            category: { isVisible: true }
          },
          take: 8,
          orderBy: { createdAt: 'desc' },
          include: {
            category: true,
            brand: true,
            photos: {
              where: { isMain: true },
              take: 1
            }
          }
        })
      ]);

      const baseUrl = getBaseUrl(req);
      const seo = generateHomeSeo(baseUrl);

      res.render('public/home', {
        title: seo.title,
        seo,
        categories,
        featuredProducts,
        recentProducts,
        formatFCFA,
        formatDate
      });
    } catch (error) {
      console.error('Erreur page d’accueil :', error);
      res.status(500).send('Erreur lors du chargement de la page d’accueil');
    }
  },

  // GET /catalogue
  async getCatalog(req, res) {
    try {
      const {
        q,
        category: categorySlug,
        brand: brandSlug,
        condition,
        minPrice,
        maxPrice,
        inStock,
        sort = 'recent',
        page = 1
      } = req.query;

      const pageSize = 12;
      const currentPage = Math.max(1, parseInt(page, 10) || 1);

      // Clause WHERE de base : produit visible ET catégorie visible
      const where = {
        isVisible: true,
        category: { isVisible: true }
      };

      // 1. Recherche globale textuelle
      if (q && q.trim()) {
        const term = q.trim();
        where.OR = [
          { name: { contains: term, mode: 'insensitive' } },
          { reference: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
          { brand: { name: { contains: term, mode: 'insensitive' } } },
          { category: { name: { contains: term, mode: 'insensitive' } } },
          {
            specifications: {
              some: {
                OR: [
                  { label: { contains: term, mode: 'insensitive' } },
                  { value: { contains: term, mode: 'insensitive' } }
                ]
              }
            }
          }
        ];
      }

      // 2. Filtre par Catégorie
      if (categorySlug) {
        where.category = {
          ...where.category,
          slug: categorySlug
        };
      }

      // 3. Filtre par Marque
      if (brandSlug) {
        where.brand = {
          slug: brandSlug
        };
      }

      // 4. Filtre par État
      if (condition) {
        where.condition = condition;
      }

      // 5. Filtre par Stock (disponible uniquement)
      if (inStock === '1' || inStock === 'true' || inStock === 'on') {
        where.stock = { gt: 0 };
      }

      // 6. Filtre par Prix
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice && !isNaN(parseInt(minPrice, 10))) {
          where.price.gte = parseInt(minPrice, 10);
        }
        if (maxPrice && !isNaN(parseInt(maxPrice, 10))) {
          where.price.lte = parseInt(maxPrice, 10);
        }
      }

      // 7. Tri
      let orderBy = { createdAt: 'desc' };
      if (sort === 'price_asc') {
        orderBy = { price: 'asc' };
      } else if (sort === 'price_desc') {
        orderBy = { price: 'desc' };
      } else if (sort === 'name_asc') {
        orderBy = { name: 'asc' };
      }

      // Exécution des requêtes en parallèle
      const [
        totalCount,
        products,
        categoriesList,
        brandsList,
        conditionsList,
        priceAggregate
      ] = await Promise.all([
        prisma.product.count({ where }),
        prisma.product.findMany({
          where,
          skip: (currentPage - 1) * pageSize,
          take: pageSize,
          orderBy,
          include: {
            category: true,
            brand: true,
            photos: {
              where: { isMain: true },
              take: 1
            }
          }
        }),
        // Toutes les catégories visibles avec compte
        prisma.category.findMany({
          where: { isVisible: true },
          orderBy: { position: 'asc' },
          include: {
            _count: {
              select: { products: { where: { isVisible: true } } }
            }
          }
        }),
        // Toutes les marques ayant des produits visibles
        prisma.brand.findMany({
          where: {
            products: {
              some: { isVisible: true }
            }
          },
          orderBy: { name: 'asc' },
          include: {
            _count: {
              select: { products: { where: { isVisible: true } } }
            }
          }
        }),
        // Liste distincte des états
        prisma.product.findMany({
          where: { isVisible: true },
          select: { condition: true },
          distinct: ['condition']
        }),
        // Prix min et max réels
        prisma.product.aggregate({
          where: { isVisible: true },
          _min: { price: true },
          _max: { price: true }
        })
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);

      const baseUrl = getBaseUrl(req);
      const activeCategory = res.locals.currentCategory || (categorySlug ? categoriesList.find((c) => c.slug === categorySlug) : null);
      let seo;
      if (activeCategory) {
        seo = generateCategorySeo(activeCategory, baseUrl);
      } else {
        seo = generateCatalogSeo(req.query, baseUrl);
      }

      res.render('public/catalog', {
        title: seo.title,
        seo,
        currentCategory: activeCategory,
        products,
        categories: categoriesList,
        brands: brandsList,
        conditions: conditionsList.map((c) => c.condition).filter(Boolean),
        priceBounds: {
          min: priceAggregate._min.price || 0,
          max: priceAggregate._max.price || 1000000
        },
        filters: {
          q: q || '',
          category: categorySlug || '',
          brand: brandSlug || '',
          condition: condition || '',
          minPrice: minPrice || '',
          maxPrice: maxPrice || '',
          inStock: inStock === '1' || inStock === 'true' || inStock === 'on',
          sort
        },
        pagination: {
          currentPage,
          totalPages,
          totalCount
        },
        formatFCFA,
        formatDate
      });
    } catch (error) {
      console.error('Erreur catalogue :', error);
      res.status(500).send('Erreur lors du chargement du catalogue');
    }
  },

  // GET /catalogue/:slug
  async getCategoryPage(req, res, next) {
    const { slug } = req.params;
    try {
      const category = await prisma.category.findUnique({
        where: { slug }
      });

      if (!category || !category.isVisible) {
        return next(); // 404
      }

      // Rediriger vers le catalogue filtré sur cette catégorie
      req.query.category = slug;
      res.locals.currentCategory = category;
      return publicController.getCatalog(req, res);
    } catch (error) {
      console.error('Erreur page catégorie :', error);
      res.status(500).send('Erreur lors du chargement de la catégorie');
    }
  },

  // GET /produits/:slug
  async getProductDetail(req, res, next) {
    const { slug } = req.params;
    try {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          brand: true,
          specifications: {
            orderBy: { position: 'asc' }
          },
          photos: {
            orderBy: [{ isMain: 'desc' }, { position: 'asc' }]
          }
        }
      });

      if (!product || !product.isVisible || (product.category && !product.category.isVisible)) {
        return next(); // 404
      }

      // Produits similaires : même catégorie ou même marque, hors produit courant
      const similarProducts = await prisma.product.findMany({
        where: {
          isVisible: true,
          id: { not: product.id },
          OR: [
            { categoryId: product.categoryId },
            ...(product.brandId ? [{ brandId: product.brandId }] : [])
          ]
        },
        take: 4,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          brand: true,
          photos: {
            where: { isMain: true },
            take: 1
          }
        }
      });

      const baseUrl = getBaseUrl(req);
      const seo = generateProductSeo(product, baseUrl);

      res.render('public/product', {
        title: seo.title,
        seo,
        product,
        similarProducts,
        formatFCFA,
        formatDate
      });
    } catch (error) {
      console.error('Erreur fiche produit :', error);
      res.status(500).send('Erreur lors du chargement du produit');
    }
  },

  // GET /panier
  async getCart(req, res) {
    try {
      const baseUrl = getBaseUrl(req);
      res.render('public/cart', {
        title: 'Mon Panier | GQ Store',
        seo: {
          title: 'Mon Panier | GQ Store',
          description: "Votre sélection d'articles informatiques prêts à être commandés sur WhatsApp chez GQ Store.",
          canonicalUrl: `${baseUrl}/panier`,
          noindex: true
        },
        formatFCFA
      });
    } catch (error) {
      console.error('Erreur page panier :', error);
      res.status(500).send('Erreur lors du chargement du panier');
    }
  }
};

module.exports = publicController;
