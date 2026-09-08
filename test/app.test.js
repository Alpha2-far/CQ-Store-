const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../src/app');
const prisma = require('../src/config/prisma');

let server;
let baseUrl;

describe('GQ Store — Jalon 1 Tests Back-Office & Fondations', () => {
  before(async () => {
    // Démarrer le serveur HTTP sur un port dynamique
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

  test('1. Accès non authentifié à /admin redirige vers /admin/login', async () => {
    const res = await fetch(`${baseUrl}/admin`, { redirect: 'manual' });
    assert.strictEqual(res.status, 302);
    assert.strictEqual(res.headers.get('location'), '/admin/login');
  });

  test('2. Accès à la page de connexion /admin/login renvoie 200 OK', async () => {
    const res = await fetch(`${baseUrl}/admin/login`);
    assert.strictEqual(res.status, 200);
    const text = await res.text();
    assert.ok(text.includes('Espace Administrateur'));
    assert.ok(text.includes('Se connecter'));
  });

  test('3. Connexion admin échoue avec de mauvais identifiants', async () => {
    const params = new URLSearchParams();
    params.append('email', 'admin@gqstore.com');
    params.append('password', 'mauvais-mot-de-passe');

    const res = await fetch(`${baseUrl}/admin/login`, {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      redirect: 'manual'
    });

    assert.strictEqual(res.status, 302);
    assert.strictEqual(res.headers.get('location'), '/admin/login');
  });

  test('4. Scénario complet : Connexion, Catégorie, Marque, Produit, Stock, Masquage et Déconnexion', async () => {
    // A. Connexion réussie
    const loginParams = new URLSearchParams();
    loginParams.append('email', 'admin@gqstore.com');
    loginParams.append('password', process.env.ADMIN_PASSWORD || 'adminGQ2026!');

    const loginRes = await fetch(`${baseUrl}/admin/login`, {
      method: 'POST',
      body: loginParams,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      redirect: 'manual'
    });

    assert.strictEqual(loginRes.status, 302);
    const cookieHeader = loginRes.headers.get('set-cookie');
    assert.ok(cookieHeader, 'Un cookie de session doit être renvoyé');
    const sessionCookie = cookieHeader.split(';')[0];

    // B. Accès authentifié au tableau de bord /admin
    const dashRes = await fetch(`${baseUrl}/admin`, {
      headers: { Cookie: sessionCookie }
    });
    assert.strictEqual(dashRes.status, 200);
    const dashText = await dashRes.text();
    assert.ok(dashText.includes('Bonjour'));
    assert.ok(dashText.includes('Tableau de bord'));

    // C. Création d'une catégorie
    const catParams = new URLSearchParams();
    const uniqueCatName = `PC Portables Test ${Date.now()}`;
    catParams.append('name', uniqueCatName);
    catParams.append('description', 'Catégorie de test pour les ordinateurs portables');
    catParams.append('position', '1');
    catParams.append('isVisible', 'on');

    const catRes = await fetch(`${baseUrl}/admin/categories`, {
      method: 'POST',
      body: catParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: sessionCookie
      },
      redirect: 'manual'
    });
    assert.strictEqual(catRes.status, 302);
    assert.strictEqual(catRes.headers.get('location'), '/admin/categories');

    const createdCategory = await prisma.category.findFirst({
      where: { name: uniqueCatName }
    });
    assert.ok(createdCategory, 'La catégorie doit exister dans la base');

    // D. Création d'une marque
    const brandParams = new URLSearchParams();
    const uniqueBrandName = `Lenovo Test ${Date.now()}`;
    brandParams.append('name', uniqueBrandName);

    const brandRes = await fetch(`${baseUrl}/admin/brands`, {
      method: 'POST',
      body: brandParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: sessionCookie
      },
      redirect: 'manual'
    });
    assert.strictEqual(brandRes.status, 302);

    const createdBrand = await prisma.brand.findFirst({
      where: { name: uniqueBrandName }
    });
    assert.ok(createdBrand, 'La marque doit exister dans la base');

    // E. Création d'un produit avec 3 photos et 5 caractéristiques
    const formData = new FormData();
    const uniqueProdName = `Lenovo ThinkPad T14 Gen 2 - Test ${Date.now()}`;
    const uniqueRef = `GQ-T14-${Date.now().toString().slice(-4)}`;

    formData.append('name', uniqueProdName);
    formData.append('reference', uniqueRef);
    formData.append('categoryId', createdCategory.id);
    formData.append('brandId', createdBrand.id);
    formData.append('price', '450000');
    formData.append('promoPrice', '420000');
    formData.append('stock', '5');
    formData.append('condition', 'Reconditionné');
    formData.append('isVisible', 'on');
    formData.append('isFeatured', 'on');
    formData.append('description', 'Test produit complet avec photos');

    // 5 Caractéristiques
    const specs = [
      { label: 'Processeur', value: 'Intel Core i5-1135G7' },
      { label: 'RAM', value: '16 Go DDR4' },
      { label: 'Stockage', value: '512 Go SSD NVMe' },
      { label: 'Écran', value: '14 pouces Full HD IPS' },
      { label: 'Système', value: 'Windows 11 Pro' }
    ];

    specs.forEach((spec) => {
      formData.append('specLabels', spec.label);
      formData.append('specValues', spec.value);
    });

    // 3 Photos simulées (fichiers PNG valides en mémoire)
    const dummyImageBuffer = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    );

    for (let i = 1; i <= 3; i++) {
      formData.append(
        'photos',
        new Blob([dummyImageBuffer], { type: 'image/png' }),
        `photo-${i}.png`
      );
    }

    const prodRes = await fetch(`${baseUrl}/admin/products`, {
      method: 'POST',
      body: formData,
      headers: {
        Cookie: sessionCookie
      },
      redirect: 'manual'
    });
    assert.strictEqual(prodRes.status, 302);

    const createdProduct = await prisma.product.findFirst({
      where: { reference: uniqueRef },
      include: { specifications: true, photos: true, category: true, brand: true }
    });
    assert.ok(createdProduct, 'Le produit doit exister en base');
    assert.strictEqual(createdProduct.specifications.length, 5, 'Le produit doit comporter 5 caractéristiques');
    assert.strictEqual(createdProduct.photos.length, 3, 'Le produit doit comporter 3 photos');
    assert.strictEqual(createdProduct.photos[0].isMain, true, 'La première photo doit être définie comme principale');
    assert.strictEqual(createdProduct.stock, 5);
    assert.strictEqual(createdProduct.isVisible, true);

    // F. Modification du stock (passer de 5 à 0)
    const updateParams = new URLSearchParams();
    updateParams.append('name', createdProduct.name);
    updateParams.append('reference', createdProduct.reference);
    updateParams.append('categoryId', createdProduct.categoryId);
    updateParams.append('brandId', createdProduct.brandId);
    updateParams.append('price', createdProduct.price.toString());
    updateParams.append('stock', '0'); // Rupture
    updateParams.append('condition', createdProduct.condition);
    updateParams.append('isVisible', 'on');

    const updateRes = await fetch(`${baseUrl}/admin/products/${createdProduct.id}/edit`, {
      method: 'POST',
      body: updateParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: sessionCookie
      },
      redirect: 'manual'
    });
    assert.strictEqual(updateRes.status, 302);

    const updatedProduct = await prisma.product.findUnique({
      where: { id: createdProduct.id }
    });
    assert.strictEqual(updatedProduct.stock, 0, 'Le stock doit être mis à jour à 0');

    // G. Masquer le produit
    const hideRes = await fetch(`${baseUrl}/admin/products/${createdProduct.id}/toggle-visibility`, {
      method: 'POST',
      headers: { Cookie: sessionCookie },
      redirect: 'manual'
    });
    assert.strictEqual(hideRes.status, 302);
    const hiddenProduct = await prisma.product.findUnique({
      where: { id: createdProduct.id }
    });
    assert.strictEqual(hiddenProduct.isVisible, false, 'Le produit doit être masqué');

    // H. Réafficher le produit
    const unhideRes = await fetch(`${baseUrl}/admin/products/${createdProduct.id}/toggle-visibility`, {
      method: 'POST',
      headers: { Cookie: sessionCookie },
      redirect: 'manual'
    });
    assert.strictEqual(unhideRes.status, 302);
    const unhiddenProduct = await prisma.product.findUnique({
      where: { id: createdProduct.id }
    });
    assert.strictEqual(unhiddenProduct.isVisible, true, 'Le produit doit être republié');

    // I. Dupliquer le produit
    const dupRes = await fetch(`${baseUrl}/admin/products/${createdProduct.id}/duplicate`, {
      method: 'POST',
      headers: { Cookie: sessionCookie },
      redirect: 'manual'
    });
    assert.strictEqual(dupRes.status, 302);

    const duplicatedProduct = await prisma.product.findFirst({
      where: { reference: `${createdProduct.reference}-COP` }
    });
    assert.ok(duplicatedProduct, 'Le produit dupliqué doit exister');
    assert.ok(duplicatedProduct.name.includes('(Copie)'));

    // J. Déconnexion
    const logoutRes = await fetch(`${baseUrl}/admin/logout`, {
      headers: { Cookie: sessionCookie },
      redirect: 'manual'
    });
    assert.strictEqual(logoutRes.status, 302);
    assert.strictEqual(logoutRes.headers.get('location'), '/admin/login');

    // K. Vérifier qu'en session privée / sans cookie, l'accès à /admin ou /admin/products redirige vers /admin/login
    const privateAccessRes = await fetch(`${baseUrl}/admin/products`, {
      redirect: 'manual'
    });
    assert.strictEqual(privateAccessRes.status, 302);
    assert.strictEqual(privateAccessRes.headers.get('location'), '/admin/login');
  });
});
