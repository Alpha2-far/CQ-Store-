const prisma = require('../config/prisma');
const { formatFCFA, formatDate } = require('../utils/formatters');

const dashboardController = {
  // GET /admin
  async getDashboard(req, res) {
    try {
      // 1. Compteurs statistiques
      const [
        totalProducts,
        totalCategories,
        totalAvailable,
        totalOutOfStock
      ] = await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
        prisma.product.count({ where: { stock: { gt: 0 } } }),
        prisma.product.count({ where: { stock: { lte: 0 } } })
      ]);

      // 2. Raccourcis : 5 derniers produits ajoutés
      const recentProducts = await prisma.product.findMany({
        take: 5,
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

      // 3. Raccourcis : Produits en rupture de stock
      const outOfStockProducts = await prisma.product.findMany({
        where: { stock: { lte: 0 } },
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: {
          category: true,
          brand: true
        }
      });

      // 4. Raccourcis : Produits mis en avant (populaires)
      const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: {
          category: true,
          brand: true
        }
      });

      res.render('admin/dashboard', {
        title: 'Tableau de bord | Administration GQ Store',
        stats: {
          totalProducts,
          totalCategories,
          totalAvailable,
          totalOutOfStock
        },
        recentProducts,
        outOfStockProducts,
        featuredProducts,
        formatFCFA,
        formatDate
      });
    } catch (error) {
      console.error('Erreur chargement dashboard :', error);
      res.status(500).send('Erreur lors du chargement du tableau de bord');
    }
  }
};

module.exports = dashboardController;
