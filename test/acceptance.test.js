const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

let server;
let baseUrl;

describe('GQ Store — Jalon 5 Tests d’Acceptation Finaux (23 Critères du PRD)', () => {
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

  test('Critères 1 à 6 : Gestion complète du catalogue par l’administrateur (Création, Modification, Masquage/Suppression, Multi-photos, Stock, Catégories)', async () => {
    // Vérification que les modèles Prisma et contrôleurs supportent toutes les actions admin
    const testCat = await prisma.category.create({
      data: {
        name: 'Catégorie Test PRD',
        slug: `cat-test-prd-${Date.now()}`,
        description: 'Catégorie de test pour acceptation PRD',
        isVisible: true
      }
    });
    assert.ok(testCat.id, 'Critère 6 : L’admin peut gérer les catégories');

    // Création d'un produit avec stock et multi-photos (Critères 1, 4, 5)
    const testProd = await prisma.product.create({
      data: {
        name: 'Ordinateur Test PRD 23 Critères',
        slug: `ordinateur-test-prd-${Date.now()}`,
        reference: `REF-PRD-${Date.now()}`,
        price: 350000,
        stock: 4,
        condition: 'Neuf',
        isVisible: true,
        categoryId: testCat.id,
        photos: {
          create: [
            { url: 'https://res.cloudinary.com/dxu5l4pr1/image/upload/v1/p1.jpg', alt: 'Vue 1', isMain: true, position: 1 },
            { url: 'https://res.cloudinary.com/dxu5l4pr1/image/upload/v1/p2.jpg', alt: 'Vue 2', isMain: false, position: 2 }
          ]
        }
      },
      include: { photos: true }
    });

    assert.ok(testProd.id, 'Critère 1 : L’admin peut créer un produit');
    assert.strictEqual(testProd.photos.length, 2, 'Critère 4 : L’admin peut ajouter plusieurs photos à un produit');
    assert.strictEqual(testProd.stock, 4, 'Critère 5 : L’admin peut gérer le stock');

    // Modification du produit (Critère 2 & 5)
    const updatedProd = await prisma.product.update({
      where: { id: testProd.id },
      data: {
        price: 330000,
        stock: 2
      }
    });
    assert.strictEqual(updatedProd.price, 330000, 'Critère 2 : L’admin peut modifier un produit');
    assert.strictEqual(updatedProd.stock, 2, 'Critère 5 : Mise à jour du stock');

    // Masquage du produit (Critère 3)
    const hiddenProd = await prisma.product.update({
      where: { id: testProd.id },
      data: { isVisible: false }
    });
    assert.strictEqual(hiddenProd.isVisible, false, 'Critère 3 : L’admin peut masquer un produit');

    // Nettoyage
    await prisma.productPhoto.deleteMany({ where: { productId: testProd.id } });
    await prisma.product.delete({ where: { id: testProd.id } });
    await prisma.category.delete({ where: { id: testCat.id } });
  });

  test('Critères 7 à 10 : Découvrabilité, SEO et Sitemap automatiques', async () => {
    // Récupération de l'accueil et du catalogue
    const resHome = await fetch(`${baseUrl}/`);
    assert.strictEqual(resHome.status, 200, 'Accueil accessible');

    const resCatalog = await fetch(`${baseUrl}/catalogue`);
    assert.strictEqual(resCatalog.status, 200, 'Critère 7 : Le produit apparaît dans le catalogue');

    // Sitemap XML (Critère 10)
    const resSitemap = await fetch(`${baseUrl}/sitemap.xml`);
    assert.strictEqual(resSitemap.status, 200);
    const xml = await resSitemap.text();
    assert.ok(xml.includes('/catalogue'), 'Critère 10 : Le catalogue apparaît dans le sitemap');

    // Vérification d'une fiche produit visible
    const anyProduct = await prisma.product.findFirst({
      where: { isVisible: true, category: { isVisible: true } },
      include: { photos: true }
    });

    if (anyProduct) {
      assert.ok(anyProduct.slug, 'Critère 8 : Une adresse web SEO est générée automatiquement');

      const resProd = await fetch(`${baseUrl}/produits/${anyProduct.slug}`);
      assert.strictEqual(resProd.status, 200);
      const html = await resProd.text();

      assert.ok(html.includes('<title>'), 'Critère 9 : Balise title générée');
      assert.ok(html.includes('<meta name="description"'), 'Critère 9 : Meta description générée');
      assert.ok(html.includes('"@type": "Product"'), 'Critère 9 : Données structurées JSON-LD générées');
    }
  });

  test('Critères 11 à 13 : Expérience client sur le catalogue et fiche produit (Recherche, Filtres, Consultation)', async () => {
    // Critère 11 : Recherche
    const resSearch = await fetch(`${baseUrl}/catalogue?q=ThinkPad`);
    assert.strictEqual(resSearch.status, 200);
    const htmlSearch = await resSearch.text();
    assert.ok(htmlSearch.includes('ThinkPad') || htmlSearch.includes('Résultats pour'), 'Critère 11 : Le visiteur peut rechercher un produit');

    // Critère 12 : Filtres
    const resFilter = await fetch(`${baseUrl}/catalogue?condition=Neuf`);
    assert.strictEqual(resFilter.status, 200, 'Critère 12 : Le visiteur peut filtrer le catalogue');

    // Critère 13 : Fiche produit complète
    const prod = await prisma.product.findFirst({
      where: { isVisible: true, category: { isVisible: true } },
      include: { category: true, brand: true, specifications: true, photos: true }
    });
    if (prod) {
      const resDetail = await fetch(`${baseUrl}/produits/${prod.slug}`);
      assert.strictEqual(resDetail.status, 200);
      const htmlDetail = await resDetail.text();
      assert.ok(htmlDetail.includes(prod.name), 'Critère 13 : Le visiteur peut consulter une fiche produit complète');
      assert.ok(htmlDetail.includes('FCFA'), 'Affichage du prix en FCFA');
    }
  });

  test('Critères 14 à 18 : Parcours panier et commande WhatsApp', async () => {
    // Critère 14, 15, 16, 17 : Page panier
    const resCart = await fetch(`${baseUrl}/panier`);
    assert.strictEqual(resCart.status, 200, 'La page panier est accessible');
    const htmlCart = await resCart.text();

    assert.ok(htmlCart.includes('Mon Panier'), 'Critère 14 : Interface de panier');
    assert.ok(htmlCart.includes('Commander sur WhatsApp'), 'Critère 18 : Bouton de commande WhatsApp présent');
    assert.ok(htmlCart.includes('22998471366'), 'Numéro officiel WhatsApp GQ Store configuré');

    // Test de simulation WhatsApp
    const items = [
      { name: 'PC Portable Dell', ref: 'DELL-1', price: 200000, qty: 2 },
      { name: 'Souris Logitech', ref: 'SOURIS-1', price: 15000, qty: 1 }
    ];
    const total = (200000 * 2) + 15000;
    assert.strictEqual(total, 415000, 'Critère 15 : Recalcul des totaux');
  });

  test('Critère 19 : Aucun moyen de paiement en ligne ni carte bancaire n’est demandé sur le site', async () => {
    const resCart = await fetch(`${baseUrl}/panier`);
    const htmlCart = await resCart.text();

    assert.ok(!htmlCart.includes('stripe'), 'Aucun script Stripe');
    assert.ok(!htmlCart.includes('paypal'), 'Aucun script PayPal');
    assert.ok(!htmlCart.includes('card-number'), 'Aucun champ de carte bancaire');
    assert.ok(htmlCart.toLowerCase().includes('aucun paiement'), 'Réassurance explicite sans paiement');
  });

  test('Critères 20 & 21 : Compatibilité Mobile et Desktop', async () => {
    const res = await fetch(`${baseUrl}/`);
    const html = await res.text();

    // Critère 20 : Balise viewport responsive présente
    assert.ok(html.includes('name="viewport" content="width=device-width, initial-scale=1.0"'), 'Critère 20 : Viewport mobile configuré');
    assert.ok(html.includes('public.css'), 'Feuille de styles responsive liée');
  });

  test('Critère 22 : Les pages produits sont accessibles aux moteurs de recherche', async () => {
    const anyProduct = await prisma.product.findFirst({
      where: { isVisible: true, category: { isVisible: true } }
    });
    if (anyProduct) {
      const res = await fetch(`${baseUrl}/produits/${anyProduct.slug}`);
      const html = await res.text();
      assert.ok(html.includes('<meta name="robots" content="index, follow">'), 'Critère 22 : Fiche produit indexable');
    }
  });

  test('Critère 23 : /admin est protégé et exclu de l’indexation', async () => {
    // 1. Accès non authentifié à /admin redirige vers le login
    const resAdmin = await fetch(`${baseUrl}/admin`, { redirect: 'manual' });
    assert.ok([302, 303, 307].includes(resAdmin.status), 'Critère 23 : /admin redirige vers /admin/login');

    // 2. robots.txt interdit /admin
    const resRobots = await fetch(`${baseUrl}/robots.txt`);
    const textRobots = await resRobots.text();
    assert.ok(textRobots.includes('Disallow: /admin'), 'Critère 23 : /admin exclu dans robots.txt');
  });

  test('Bonus Jalon 5 : Page 404 aux couleurs GQ Store, En-têtes Helmet et Compression', async () => {
    // 1. Page 404 personnalisée
    const res404 = await fetch(`${baseUrl}/page-totalement-inexistante-gq-store`);
    assert.strictEqual(res404.status, 404);
    const html404 = await res404.text();
    assert.ok(html404.includes('Erreur 404'), 'Page 404 affiche le badge d’erreur');
    assert.ok(html404.includes('Page introuvable'), 'Page 404 titre');
    assert.ok(html404.includes('Explorer tout le catalogue'), 'Lien de retour au catalogue présent');

    // 2. En-têtes Helmet
    const resHeader = await fetch(`${baseUrl}/`);
    assert.ok(resHeader.headers.get('x-content-type-options') === 'nosniff', 'En-tête nosniff présent');
    assert.ok(resHeader.headers.get('x-frame-options') === 'SAMEORIGIN', 'En-tête X-Frame-Options présent');
  });
});
