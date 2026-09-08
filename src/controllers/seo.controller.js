const prisma = require('../config/prisma');
const { getBaseUrl } = require('../utils/seo');

/**
 * Échappe les caractères réservés XML
 * @param {string} unsafe 
 * @returns {string}
 */
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

/**
 * Formate une date en format ISO standard YYYY-MM-DD
 * @param {Date|string} date 
 * @returns {string}
 */
function formatDateIso(date) {
  if (!date) return new Date().toISOString().split('T')[0];
  try {
    return new Date(date).toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

const seoController = {
  /**
   * Génère le fichier dynamique /sitemap.xml
   * GET /sitemap.xml
   */
  async getSitemap(req, res) {
    try {
      const baseUrl = getBaseUrl(req);

      // Récupération concurrente des catégories et produits visibles
      const [categories, products] = await Promise.all([
        prisma.category.findMany({
          where: { isVisible: true },
          select: { slug: true, updatedAt: true },
          orderBy: { updatedAt: 'desc' }
        }),
        prisma.product.findMany({
          where: {
            isVisible: true,
            category: { isVisible: true }
          },
          select: { slug: true, updatedAt: true },
          orderBy: { updatedAt: 'desc' }
        })
      ]);

      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      // 1. Page d'accueil
      xml += '  <url>\n';
      xml += `    <loc>${escapeXml(`${baseUrl}/`)}</loc>\n`;
      xml += `    <lastmod>${formatDateIso(new Date())}</lastmod>\n`;
      xml += '    <changefreq>daily</changefreq>\n';
      xml += '    <priority>1.0</priority>\n';
      xml += '  </url>\n';

      // 2. Catalogue général
      xml += '  <url>\n';
      xml += `    <loc>${escapeXml(`${baseUrl}/catalogue`)}</loc>\n`;
      xml += `    <lastmod>${formatDateIso(new Date())}</lastmod>\n`;
      xml += '    <changefreq>daily</changefreq>\n';
      xml += '    <priority>0.9</priority>\n';
      xml += '  </url>\n';

      // 3. Catégories visibles
      for (const cat of categories) {
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(`${baseUrl}/catalogue/${cat.slug}`)}</loc>\n`;
        xml += `    <lastmod>${formatDateIso(cat.updatedAt)}</lastmod>\n`;
        xml += '    <changefreq>weekly</changefreq>\n';
        xml += '    <priority>0.8</priority>\n';
        xml += '  </url>\n';
      }

      // 4. Produits visibles
      for (const prod of products) {
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(`${baseUrl}/produits/${prod.slug}`)}</loc>\n`;
        xml += `    <lastmod>${formatDateIso(prod.updatedAt)}</lastmod>\n`;
        xml += '    <changefreq>daily</changefreq>\n';
        xml += '    <priority>0.7</priority>\n';
        xml += '  </url>\n';
      }

      xml += '</urlset>';

      res.header('Content-Type', 'application/xml; charset=utf-8');
      return res.status(200).send(xml);
    } catch (error) {
      console.error('Erreur génération sitemap.xml :', error);
      res.status(500).send('Erreur lors de la génération du sitemap');
    }
  },

  /**
   * Génère le fichier dynamique /robots.txt
   * GET /robots.txt
   */
  async getRobots(req, res) {
    const baseUrl = getBaseUrl(req);

    const robotsTxt = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin',
      'Disallow: /admin/',
      'Disallow: /panier',
      '',
      `Sitemap: ${baseUrl}/sitemap.xml`
    ].join('\n');

    res.header('Content-Type', 'text/plain; charset=utf-8');
    return res.status(200).send(robotsTxt);
  }
};

module.exports = seoController;
