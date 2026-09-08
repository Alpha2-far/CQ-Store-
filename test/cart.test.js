const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

let server;
let baseUrl;

describe('GQ Store — Jalon 3 Tests Panier & Commande WhatsApp', () => {
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

  test('1. La page /panier renvoie 200 OK avec le conteneur du panier et le numéro WhatsApp', async () => {
    const res = await fetch(`${baseUrl}/panier`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    assert.ok(html.includes('Mon Panier'));
    assert.ok(html.includes('id="cartPageContainer"'));
    assert.ok(html.includes('data-whatsapp-number="22998471366"'));
    assert.ok(html.includes('Commande simplifiée'));
  });

  test('2. L’en-tête public intègre le bouton Panier avec badge sur toutes les pages', async () => {
    // Vérifier sur l'accueil
    const resHome = await fetch(`${baseUrl}/`);
    assert.strictEqual(resHome.status, 200);
    const htmlHome = await resHome.text();
    assert.ok(htmlHome.includes('href="/panier"'));
    assert.ok(htmlHome.includes('id="cartBadge"'));

    // Vérifier sur le catalogue
    const resCat = await fetch(`${baseUrl}/catalogue`);
    assert.strictEqual(resCat.status, 200);
    const htmlCat = await resCat.text();
    assert.ok(htmlCat.includes('href="/panier"'));
    assert.ok(htmlCat.includes('id="cartBadge"'));
  });

  test('3. Le bouton WhatsApp flottant est présent sur le site avec le bon numéro', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    assert.ok(html.includes('class="whatsapp-float-btn"'));
    assert.ok(html.includes('https://wa.me/22998471366'));
  });

  test('4. Fiche produit disponible : bouton « Ajouter au panier » et bouton « Commander sur WhatsApp »', async () => {
    // Trouver un produit en stock
    const product = await prisma.product.findFirst({
      where: {
        isVisible: true,
        stock: { gt: 0 }
      }
    });

    assert.ok(product, 'Un produit avec stock > 0 doit exister');

    const res = await fetch(`${baseUrl}/produits/${product.slug}`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    // Bouton ajouter au panier avec data-action
    assert.ok(html.includes('data-action="add-to-cart"'));
    assert.ok(html.includes(`data-product-id="${product.id}"`));
    assert.ok(html.includes('Ajouter au panier'));

    // Sélecteur de quantité
    assert.ok(html.includes('id="productDetailQty"'));

    // Bouton WhatsApp direct pour l'article
    assert.ok(html.includes('id="btnDirectWhatsApp"'));
    assert.ok(html.includes('data-whatsapp-number="22998471366"'));
    assert.ok(html.includes('Commander sur WhatsApp'));
  });

  test('5. Fiche produit en rupture : bouton d’ajout désactivé et bouton de renseignement WhatsApp', async () => {
    // Trouver ou créer un produit en rupture (stock = 0)
    let outOfStockProduct = await prisma.product.findFirst({
      where: {
        isVisible: true,
        stock: 0
      }
    });

    if (!outOfStockProduct) {
      const category = await prisma.category.findFirst({ where: { isVisible: true } });
      outOfStockProduct = await prisma.product.create({
        data: {
          name: 'Produit Epuisé Test Jalon 3',
          slug: 'produit-epuise-test-jalon-3',
          reference: 'GQ-TEST-OUT-J3',
          price: 250000,
          stock: 0,
          condition: 'Reconditionné',
          isVisible: true,
          categoryId: category.id
        }
      });
    }

    const res = await fetch(`${baseUrl}/produits/${outOfStockProduct.slug}`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    // Bouton désactivé
    assert.ok(html.includes('Rupture de stock — Ajout impossible'));
    assert.ok(html.includes('disabled'));

    // Bouton WhatsApp pour se renseigner
    assert.ok(html.includes('Se renseigner sur WhatsApp'));
    assert.ok(html.includes('https://wa.me/22998471366'));
  });

  test('6. Les cartes de produits disponibles intègrent le bouton rapide d’ajout au panier', async () => {
    const res = await fetch(`${baseUrl}/catalogue`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();

    assert.ok(html.includes('data-action="add-to-cart"'));
    assert.ok(html.includes('title="Ajouter au panier"'));
  });

  test('7. Simulation complète du message WhatsApp de commande avec 2 produits et quantité modifiée', () => {
    // Deux articles ajoutés au panier, dont un avec quantité modifiée à 2
    const cartItems = [
      {
        name: 'Lenovo ThinkPad T14 Gen 2 - Core i7 16Go 512Go SSD',
        reference: 'GQ-THINKPAD-T14-G2',
        price: 385000,
        quantity: 2 // Modifié de 1 à 2
      },
      {
        name: 'Dell Latitude 5420 - Core i5 11e Gén 16Go 256Go SSD',
        reference: 'GQ-DELL-LAT-5420',
        price: 295000,
        quantity: 1
      }
    ];

    const totalIndicatif = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    assert.strictEqual(totalIndicatif, 1065000); // 385000*2 + 295000

    const formatFCFA = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F') + ' FCFA';

    let message = `Bonjour GQ Store, je souhaite commander les articles suivants depuis votre catalogue en ligne :\n\n`;
    cartItems.forEach((item, index) => {
      const lineTotal = item.price * item.quantity;
      message += `${index + 1}. ${item.name}`;
      if (item.reference) message += ` (Réf : ${item.reference})`;
      message += `\n   Quantité : ${item.quantity} x ${formatFCFA(item.price)} = ${formatFCFA(lineTotal)}\n\n`;
    });
    message += `Total indicatif : ${formatFCFA(totalIndicatif)}\n\n`;
    message += `Pouvez-vous me confirmer la disponibilité et les modalités de livraison à Cotonou/Calavi ? Merci !`;

    const whatsappUrl = `https://wa.me/22998471366?text=${encodeURIComponent(message)}`;

    assert.ok(whatsappUrl.startsWith('https://wa.me/22998471366?text='));
    const decoded = decodeURIComponent(whatsappUrl.split('?text=')[1]);

    assert.ok(decoded.includes('Lenovo ThinkPad T14 Gen 2'));
    assert.ok(decoded.includes('Quantité : 2 x 385\u202F000 FCFA = 770\u202F000 FCFA'));
    assert.ok(decoded.includes('Dell Latitude 5420'));
    assert.ok(decoded.includes('Quantité : 1 x 295\u202F000 FCFA = 295\u202F000 FCFA'));
    assert.ok(decoded.includes('Total indicatif : 1\u202F065\u202F000 FCFA'));
  });
});
