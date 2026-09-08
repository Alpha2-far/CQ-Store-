const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

let server;
let baseUrl;

describe('GQ Store — Jalon 2 Tests Vitrine Publique & Catalogue', () => {
  before(async () => {
    server = http.createServer(app);
    await new Promise((resolve) => {
      server.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await prisma.$disconnect();
  });

  test('1. Page d’accueil (/) renvoie 200 avec hero, réassurance et catalogue', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    // Vérifier les éléments clés de la charte GQ Store
    assert.ok(html.includes('GQ Store'));
    assert.ok(html.includes('Explorer le catalogue'));
    assert.ok(html.includes('Qualité Contrôlée'));
    assert.ok(html.includes('Garantie Incluse'));
    assert.ok(html.includes('Livraison Rapide'));
    assert.ok(html.includes('FCFA'));
  });

  test('2. Page catalogue (/catalogue) affiche les filtres et produits', async () => {
    const res = await fetch(`${baseUrl}/catalogue`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    assert.ok(html.includes('Tous nos Produits Informatiques') || html.includes('Catalogue'));
    assert.ok(html.includes('Filtres'));
    assert.ok(html.includes('Prix (FCFA)'));
    assert.ok(html.includes('En stock uniquement'));
    assert.ok(html.includes('Trier par') || html.includes('sortSelect'));
  });

  test('3. Recherche textuelle (?q=ThinkPad) filtre les résultats', async () => {
    const res = await fetch(`${baseUrl}/catalogue?q=ThinkPad`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    assert.ok(html.includes('ThinkPad'));
    assert.ok(html.includes('Résultats pour « ThinkPad »') || html.includes('Recherche: &quot;ThinkPad&quot;') || html.includes('ThinkPad'));
  });

  test('4. Filtrage par marque (?brand=lenovo)', async () => {
    // Vérifier si la marque lenovo existe
    const brand = await prisma.brand.findFirst({ where: { slug: 'lenovo' } });
    if (brand) {
      const res = await fetch(`${baseUrl}/catalogue?brand=${brand.slug}`);
      assert.strictEqual(res.status, 200);
      const html = await res.text();
      assert.ok(html.includes(brand.name));
    }
  });

  test('5. Filtrage par prix (?minPrice & maxPrice)', async () => {
    const res = await fetch(`${baseUrl}/catalogue?minPrice=200000&maxPrice=500000`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes('produit'));
  });

  test('6. Page catégorie dédiée (/catalogue/:slug)', async () => {
    const category = await prisma.category.findFirst({ where: { isVisible: true } });
    assert.ok(category, 'Au moins une catégorie visible en base');

    // Catégorie valide
    const res = await fetch(`${baseUrl}/catalogue/${category.slug}`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes(category.name));

    // Catégorie inexistante -> 404
    const res404 = await fetch(`${baseUrl}/catalogue/categorie-qui-n-existe-pas-12345`);
    assert.strictEqual(res404.status, 404);
  });

  test('7. Fiche produit (/produits/:slug) avec galerie, specs et produits similaires', async () => {
    // Récupérer un produit visible ayant des caractéristiques
    const product = await prisma.product.findFirst({
      where: {
        isVisible: true,
        category: { isVisible: true }
      },
      include: {
        specifications: true,
        photos: true
      }
    });

    assert.ok(product, 'Un produit visible doit exister en base');

    const res = await fetch(`${baseUrl}/produits/${product.slug}`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    // Vérifier le titre et le prix
    assert.ok(html.includes(product.name));
    assert.ok(html.includes('FCFA'));

    // Vérifier les spécifications si le produit en a
    if (product.specifications.length > 0) {
      assert.ok(html.includes('Caractéristiques Techniques'));
      assert.ok(html.includes(product.specifications[0].label));
      const escapedVal = product.specifications[0].value.replace(/'/g, '&#39;');
      assert.ok(html.includes(escapedVal) || html.includes(product.specifications[0].value));
    }

    // Vérifier la galerie d'images
    assert.ok(html.includes('galleryMainImage') || html.includes('product-gallery'));
  });

  test('8. Vérification du badge "Rupture de stock" quand stock = 0', async () => {
    // Créer un produit temporaire avec stock = 0 pour tester
    const category = await prisma.category.findFirst({ where: { isVisible: true } });
    const outOfStockProduct = await prisma.product.create({
      data: {
        name: 'Produit Test Epuisé Jalon 2',
        slug: 'produit-test-epuise-jalon-2',
        reference: 'GQ-TEST-OUT-001',
        price: 350000,
        stock: 0,
        condition: 'Reconditionné',
        isVisible: true,
        categoryId: category.id
      }
    });

    try {
      const res = await fetch(`${baseUrl}/produits/${outOfStockProduct.slug}`);
      assert.strictEqual(res.status, 200);
      const html = await res.text();

      assert.ok(
        html.includes('Rupture de stock'),
        'Le produit avec stock 0 doit afficher le badge Rupture de stock'
      );
    } finally {
      // Nettoyer
      await prisma.product.delete({ where: { id: outOfStockProduct.id } });
    }
  });

  test('9. Un produit masqué (isVisible: false) renvoie 404', async () => {
    const category = await prisma.category.findFirst({ where: { isVisible: true } });
    const hiddenProduct = await prisma.product.create({
      data: {
        name: 'Produit Test Masqué Jalon 2',
        slug: 'produit-test-masque-jalon-2',
        reference: 'GQ-TEST-HIDDEN-001',
        price: 250000,
        stock: 5,
        condition: 'Neuf',
        isVisible: false, // MASQUÉ
        categoryId: category.id
      }
    });

    try {
      const res = await fetch(`${baseUrl}/produits/${hiddenProduct.slug}`);
      assert.strictEqual(res.status, 404);
    } finally {
      // Nettoyer
      await prisma.product.delete({ where: { id: hiddenProduct.id } });
    }
  });
});
