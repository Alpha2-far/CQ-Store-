const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

let server;
let baseUrl;

// Fixtures pour les tests SEO
let testCat;
let testCatHidden;
let testProdVisible;
let testProdHidden;
let testProdCustomSeo;

describe('GQ Store — Jalon 4 Tests SEO Automatique', () => {
  before(async () => {
    server = http.createServer(app);
    await new Promise((resolve) => {
      server.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });

    // Nettoyage préalable d'anciens enregistrements de test éventuels
    await prisma.specification.deleteMany({
      where: { product: { reference: { startsWith: 'TEST-SEO-' } } }
    });
    await prisma.productPhoto.deleteMany({
      where: { product: { reference: { startsWith: 'TEST-SEO-' } } }
    });
    await prisma.product.deleteMany({
      where: { reference: { startsWith: 'TEST-SEO-' } }
    });
    await prisma.category.deleteMany({
      where: { slug: { startsWith: 'cat-seo-test-' } }
    });

    // 1. Catégorie visible
    testCat = await prisma.category.create({
      data: {
        name: 'Écrans Professionnels SEO',
        slug: 'cat-seo-test-ecrans',
        description: 'Sélection d’écrans haute résolution pour développeurs et designers.',
        seoTitle: 'Écrans Pro 4K au Bénin | GQ Store',
        seoDescription: 'Achetez vos écrans professionnels haute définition chez GQ Store au Bénin. Livraison rapide et garantie.',
        isVisible: true
      }
    });

    // 2. Catégorie masquée
    testCatHidden = await prisma.category.create({
      data: {
        name: 'Catégorie Masquée SEO',
        slug: 'cat-seo-test-masquee',
        isVisible: false
      }
    });

    // 3. Produit visible standard (SEO automatique par défaut)
    testProdVisible = await prisma.product.create({
      data: {
        name: 'Moniteur Dell UltraSharp 27 SEO',
        slug: 'moniteur-dell-ultrasharp-27-seo',
        reference: 'TEST-SEO-DELL-27',
        description: 'Écran 4K IPS idéal pour les professionnels de l’image.',
        price: 275000,
        promoPrice: 250000,
        stock: 5,
        condition: 'Neuf',
        isVisible: true,
        categoryId: testCat.id,
        photos: {
          create: [
            {
              url: 'https://res.cloudinary.com/dxu5l4pr1/image/upload/v1/dell-27.jpg',
              alt: 'Moniteur Dell UltraSharp 27 pouces face avant',
              isMain: true,
              position: 1
            }
          ]
        }
      }
    });

    // 4. Produit avec overrides SEO personnalisés par l'admin
    testProdCustomSeo = await prisma.product.create({
      data: {
        name: 'Moniteur LG Ergo 32 SEO',
        slug: 'moniteur-lg-ergo-32-seo',
        reference: 'TEST-SEO-LG-32',
        description: 'Écran ergonomique avec bras articulé.',
        price: 340000,
        stock: 2,
        condition: 'Reconditionné',
        isVisible: true,
        seoTitle: 'Titre SEO Admin : Acheter LG Ergo 32 au Bénin',
        seoDescription: 'Description SEO Admin : Découvrez le moniteur LG Ergo 32 reconditionné chez GQ Store avec garantie 6 mois.',
        categoryId: testCat.id
      }
    });

    // 5. Produit masqué
    testProdHidden = await prisma.product.create({
      data: {
        name: 'Produit Secret SEO Masqué',
        slug: 'produit-secret-seo-masque',
        reference: 'TEST-SEO-SECRET',
        price: 150000,
        stock: 1,
        condition: 'Neuf',
        isVisible: false,
        categoryId: testCat.id
      }
    });
  });

  after(async () => {
    // Nettoyage des fixtures de test
    await prisma.specification.deleteMany({
      where: { product: { reference: { startsWith: 'TEST-SEO-' } } }
    });
    await prisma.productPhoto.deleteMany({
      where: { product: { reference: { startsWith: 'TEST-SEO-' } } }
    });
    await prisma.product.deleteMany({
      where: { reference: { startsWith: 'TEST-SEO-' } }
    });
    await prisma.category.deleteMany({
      where: { slug: { startsWith: 'cat-seo-test-' } }
    });

    await new Promise((resolve) => server.close(resolve));
    await prisma.$disconnect();
  });

  test('1. GET /robots.txt renvoie 200 text/plain, exclut /admin et pointe vers le sitemap', async () => {
    const res = await fetch(`${baseUrl}/robots.txt`);
    assert.strictEqual(res.status, 200);
    const contentType = res.headers.get('content-type');
    assert.ok(contentType.includes('text/plain'));

    const text = await res.text();
    assert.ok(text.includes('User-agent: *'));
    assert.ok(text.includes('Disallow: /admin'));
    assert.ok(text.includes('Disallow: /admin/'));
    assert.ok(text.includes('Disallow: /panier'));
    assert.ok(text.includes(`Sitemap: ${baseUrl}/sitemap.xml`));
  });

  test('2. GET /sitemap.xml renvoie un XML valide contenant les pages, catégories et produits visibles', async () => {
    const res = await fetch(`${baseUrl}/sitemap.xml`);
    assert.strictEqual(res.status, 200);
    const contentType = res.headers.get('content-type');
    assert.ok(contentType.includes('xml'));

    const xml = await res.text();
    // Structure XML
    assert.ok(xml.includes('<?xml version="1.0" encoding="UTF-8"?>'));
    assert.ok(xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));

    // URLs canoniques des pages statiques
    assert.ok(xml.includes(`<loc>${baseUrl}/</loc>`));
    assert.ok(xml.includes(`<loc>${baseUrl}/catalogue</loc>`));

    // Catégorie visible et produits visibles présents
    assert.ok(xml.includes(`<loc>${baseUrl}/catalogue/${testCat.slug}</loc>`));
    assert.ok(xml.includes(`<loc>${baseUrl}/produits/${testProdVisible.slug}</loc>`));
    assert.ok(xml.includes(`<loc>${baseUrl}/produits/${testProdCustomSeo.slug}</loc>`));

    // Vérification de lastmod, changefreq, priority
    assert.ok(xml.includes('<priority>1.0</priority>'));
    assert.ok(xml.includes('<priority>0.8</priority>'));
    assert.ok(xml.includes('<priority>0.7</priority>'));
  });

  test('3. GET /sitemap.xml EXCLUT formellement les produits masqués et les catégories masquées', async () => {
    const res = await fetch(`${baseUrl}/sitemap.xml`);
    const xml = await res.text();

    // Le produit masqué ne doit pas figurer dans le sitemap
    assert.ok(!xml.includes(testProdHidden.slug), 'Le produit masqué ne doit pas être dans le sitemap');
    // La catégorie masquée ne doit pas figurer dans le sitemap
    assert.ok(!xml.includes(testCatHidden.slug), 'La catégorie masquée ne doit pas être dans le sitemap');
  });

  test('4. Fiche produit par défaut : titre, meta description, canonique, OG et JSON-LD générés automatiquement', async () => {
    const res = await fetch(`${baseUrl}/produits/${testProdVisible.slug}`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    // 1. Titre et description générés
    assert.ok(html.includes(`<title>${testProdVisible.name} — Achat au Bénin | GQ Store</title>`));
    assert.ok(html.includes('Écran 4K IPS idéal pour les professionnels'));

    // 2. URL canonique propre
    assert.ok(html.includes(`<link rel="canonical" href="${baseUrl}/produits/${testProdVisible.slug}">`));

    // 3. Open Graph
    assert.ok(html.includes('<meta property="og:type" content="product">'));
    assert.ok(html.includes(`content="${baseUrl}/produits/${testProdVisible.slug}"`));
    assert.ok(html.includes('https://res.cloudinary.com/dxu5l4pr1/image/upload/v1/dell-27.jpg'));

    // 4. Données structurées JSON-LD Schema.org Product
    assert.ok(html.includes('"@type": "Product"'));
    assert.ok(html.includes('"priceCurrency": "XOF"'));
    assert.ok(html.includes('"price": 250000'));
    assert.ok(html.includes('"sku": "TEST-SEO-DELL-27"'));
    assert.ok(html.includes('https://schema.org/InStock'));
    assert.ok(html.includes('https://schema.org/NewCondition'));

    // 5. Données structurées JSON-LD Schema.org BreadcrumbList
    assert.ok(html.includes('"@type": "BreadcrumbList"'));
    assert.ok(html.includes(testCat.name));
    assert.ok(html.includes(testProdVisible.name));

    // 6. Fil d'Ariane visuel HTML
    assert.ok(html.includes('aria-label="Fil d\'Ariane"'));
    assert.ok(html.includes(`/catalogue/${testCat.slug}`));
  });

  test('5. Fiche produit avec champs SEO admin : les overrides prennent le pas sur les textes générés', async () => {
    const res = await fetch(`${baseUrl}/produits/${testProdCustomSeo.slug}`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    // Titre SEO admin prioritaire
    assert.ok(html.includes(`<title>Titre SEO Admin : Acheter LG Ergo 32 au Bénin</title>`));

    // Description SEO admin prioritaire
    assert.ok(html.includes('Description SEO Admin : Découvrez le moniteur LG Ergo 32'));

    // Open Graph utilise les overrides admin
    assert.ok(html.includes('content="Titre SEO Admin : Acheter LG Ergo 32 au Bénin"'));
    assert.ok(html.includes('content="Description SEO Admin : Découvrez le moniteur LG Ergo 32'));
  });

  test('6. Page Catégorie (/catalogue/:slug) : SEO de catégorie, description personnalisée et BreadcrumbList', async () => {
    const res = await fetch(`${baseUrl}/catalogue/${testCat.slug}`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    // Titre et description de la catégorie (override admin de testCat)
    assert.ok(html.includes('<title>Écrans Pro 4K au Bénin | GQ Store</title>'));
    assert.ok(html.includes('content="Achetez vos écrans professionnels haute définition'));

    // URL canonique propre
    assert.ok(html.includes(`<link rel="canonical" href="${baseUrl}/catalogue/${testCat.slug}">`));

    // Description de catégorie affichée dans la page
    assert.ok(html.includes(testCat.description));

    // JSON-LD BreadcrumbList
    assert.ok(html.includes('"@type": "BreadcrumbList"'));
    assert.ok(html.includes(testCat.name));
  });

  test('7. Balise canonique propre conservée sous filtres ou pagination', async () => {
    const res = await fetch(`${baseUrl}/catalogue?condition=Neuf&sort=price_desc&page=1`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    // L'URL canonique doit être propre sur /catalogue sans query string
    assert.ok(html.includes(`<link rel="canonical" href="${baseUrl}/catalogue">`));
    assert.ok(!html.includes(`<link rel="canonical" href="${baseUrl}/catalogue?`));
  });

  test('8. Masquage d’un produit : retiré du sitemap et 404 sur son URL directe', async () => {
    // 1. Accès direct au produit masqué -> 404
    const resDirect = await fetch(`${baseUrl}/produits/${testProdHidden.slug}`);
    assert.strictEqual(resDirect.status, 404);

    // 2. Vérification sitemap
    const resSitemap = await fetch(`${baseUrl}/sitemap.xml`);
    const xml = await resSitemap.text();
    assert.ok(!xml.includes(testProdHidden.slug));

    // 3. Masquage dynamique d'un produit précédemment visible
    await prisma.product.update({
      where: { id: testProdVisible.id },
      data: { isVisible: false }
    });

    // Doit maintenant renvoyer 404
    const resAfterHide = await fetch(`${baseUrl}/produits/${testProdVisible.slug}`);
    assert.strictEqual(resAfterHide.status, 404);

    // Et disparaître immédiatement du sitemap
    const resSitemapAfter = await fetch(`${baseUrl}/sitemap.xml`);
    const xmlAfter = await resSitemapAfter.text();
    assert.ok(!xmlAfter.includes(testProdVisible.slug));
  });
});
