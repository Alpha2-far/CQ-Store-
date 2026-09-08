const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Démarrage du seed GQ Store...');

  // 1. Administrateur initial
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@gqstore.com';
  const adminName = process.env.ADMIN_NAME || 'GQ Store';
  const rawPassword = process.env.ADMIN_PASSWORD || 'adminGQ2026!';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(rawPassword, salt);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      passwordHash: passwordHash
    },
    create: {
      name: adminName,
      email: adminEmail,
      passwordHash: passwordHash
    }
  });
  console.log(`✅ Administrateur configuré : ${admin.email} (Nom : ${admin.name})`);

  // 2. Catégories initiales pour amorcer le catalogue
  const defaultCategories = [
    { name: 'Ordinateurs portables', slug: 'ordinateurs-portables', position: 1, description: 'PC portables bureautiques, professionnels et ultraportables.' },
    { name: 'PC Gamer', slug: 'pc-gamer', position: 2, description: 'Tours et PC portables haute performance dédiés au gaming et à la création.' },
    { name: 'Accessoires & Périphériques', slug: 'accessoires-peripheriques', position: 3, description: 'Claviers, souris, écrans, adaptateurs et connectique.' },
    { name: 'Consommables', slug: 'consommables', position: 4, description: 'Toners, cartouches, câblage et fournitures informatiques.' }
  ];

  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    });
  }
  console.log(`✅ ${defaultCategories.length} catégories initiales créées/vérifiées`);

  // 3. Marques informatiques de référence
  const defaultBrands = [
    { name: 'Lenovo', slug: 'lenovo' },
    { name: 'HP', slug: 'hp' },
    { name: 'Dell', slug: 'dell' },
    { name: 'Apple', slug: 'apple' },
    { name: 'Asus', slug: 'asus' },
    { name: 'Canon', slug: 'canon' }
  ];

  for (const brand of defaultBrands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand
    });
  }
  console.log(`✅ ${defaultBrands.length} marques initiales créées/vérifiées`);

  // 4. Produits de démonstration pour la vitrine publique
  const catLaptops = await prisma.category.findUnique({ where: { slug: 'ordinateurs-portables' } });
  const catGamer = await prisma.category.findUnique({ where: { slug: 'pc-gamer' } });
  const catAccess = await prisma.category.findUnique({ where: { slug: 'accessoires-peripheriques' } });
  const brandLenovo = await prisma.brand.findUnique({ where: { slug: 'lenovo' } });
  const brandDell = await prisma.brand.findUnique({ where: { slug: 'dell' } });
  const brandApple = await prisma.brand.findUnique({ where: { slug: 'apple' } });
  const brandHP = await prisma.brand.findUnique({ where: { slug: 'hp' } });

  const demoProducts = [
    {
      name: 'Lenovo ThinkPad T14 Gen 2 - Core i7 16Go 512Go SSD',
      slug: 'lenovo-thinkpad-t14-gen-2-i7-16-512',
      reference: 'GQ-THINKPAD-T14-G2',
      description: 'L\'ordinateur ultra-robuste des professionnels. Équipé d\'un processeur Intel Core i7 de 11e génération, 16 Go de mémoire vive et un stockage SSD NVMe ultra-rapide de 512 Go. Clavier rétroéclairé résistant aux éclaboussures, autonomie remarquable et châssis certifié MIL-STD-810H.',
      price: 420000,
      promoPrice: 385000,
      stock: 4,
      condition: 'Reconditionné',
      isFeatured: true,
      isVisible: true,
      categoryId: catLaptops.id,
      brandId: brandLenovo.id,
      specifications: [
        { label: 'Processeur', value: 'Intel Core i7-1165G7 (jusqu\'à 4.70 GHz)', position: 1 },
        { label: 'Mémoire vive (RAM)', value: '16 Go DDR4 3200 MHz', position: 2 },
        { label: 'Stockage', value: '512 Go SSD NVMe M.2', position: 3 },
        { label: 'Écran', value: '14" Full HD (1920 x 1080) Antireflet IPS', position: 4 },
        { label: 'Carte graphique', value: 'Intel Iris Xe Graphics', position: 5 },
        { label: 'Système d\'exploitation', value: 'Windows 11 Professionnel 64 bits', position: 6 },
        { label: 'Batterie', value: 'Excellente santé (> 88%), chargeur USB-C inclus', position: 7 }
      ]
    },
    {
      name: 'Dell Latitude 5420 - Core i5 11e Gén 16Go 256Go SSD',
      slug: 'dell-latitude-5420-i5-16-256',
      reference: 'GQ-DELL-LAT-5420',
      description: 'Ultraportable d\'entreprise fin, léger et performant. Parfait pour la bureautique avancée, la gestion et les déplacements professionnels réguliers.',
      price: 330000,
      promoPrice: 295000,
      stock: 6,
      condition: 'Reconditionné',
      isFeatured: true,
      isVisible: true,
      categoryId: catLaptops.id,
      brandId: brandDell.id,
      specifications: [
        { label: 'Processeur', value: 'Intel Core i5-1145G7 vPro', position: 1 },
        { label: 'Mémoire vive (RAM)', value: '16 Go DDR4', position: 2 },
        { label: 'Stockage', value: '256 Go SSD NVMe', position: 3 },
        { label: 'Écran', value: '14" FHD IPS Antireflet', position: 4 },
        { label: 'Connectivité', value: 'Thunderbolt 4, USB-A, HDMI, RJ45, Wi-Fi 6', position: 5 }
      ]
    },
    {
      name: 'Apple MacBook Pro 14" M2 Pro - 16Go 512Go SSD Gris Sidéral',
      slug: 'apple-macbook-pro-14-m2-pro-16-512',
      reference: 'GQ-APPLE-MBP14-M2P',
      description: 'Puissance phénoménale pour les créateurs de contenu, monteurs vidéo et développeurs. Puce Apple M2 Pro, écran Liquid Retina XDR exceptionnel et autonomie jusqu\'à 18 heures.',
      price: 1280000,
      promoPrice: 1150000,
      stock: 2,
      condition: 'Neuf',
      isFeatured: true,
      isVisible: true,
      categoryId: catLaptops.id,
      brandId: brandApple.id,
      specifications: [
        { label: 'Puce / CPU', value: 'Apple M2 Pro (CPU 10 cœurs / GPU 16 cœurs)', position: 1 },
        { label: 'Mémoire unifiée', value: '16 Go', position: 2 },
        { label: 'Stockage', value: '512 Go SSD haute vitesse', position: 3 },
        { label: 'Écran', value: '14,2" Liquid Retina XDR ProMotion 120Hz', position: 4 },
        { label: 'État', value: 'Neuf scellé d\'origine avec garantie constructeur', position: 5 }
      ]
    },
    {
      name: 'Lenovo ThinkPad X1 Carbon Gen 9 - Core i7 16Go (Épuisé)',
      slug: 'lenovo-thinkpad-x1-carbon-gen-9-epuise',
      reference: 'GQ-THINKPAD-X1-C9',
      description: 'Le fleuron des ultraportables professionnels en fibre de carbone. Poids plume de 1,13 kg avec robustesse militaire.',
      price: 520000,
      stock: 0, // RUPTURE DE STOCK VOLONTAIRE
      condition: 'Reconditionné',
      isFeatured: false,
      isVisible: true,
      categoryId: catLaptops.id,
      brandId: brandLenovo.id,
      specifications: [
        { label: 'Processeur', value: 'Intel Core i7-1185G7 vPro', position: 1 },
        { label: 'Mémoire vive (RAM)', value: '16 Go LPDDR4x', position: 2 },
        { label: 'Stockage', value: '512 Go SSD M.2 NVMe', position: 3 },
        { label: 'Disponibilité', value: 'Stock temporairement épuisé - Réapprovisionnement en cours', position: 4 }
      ]
    },
    {
      name: 'HP Victus 15 Gamer - Core i5 12e Gén RTX 3050 16Go 512Go',
      slug: 'hp-victus-15-gamer-i5-rtx3050',
      reference: 'GQ-HP-VICTUS-15',
      description: 'Idéal pour le jeu compétitif, la modélisation 3D et le rendu graphique. Carte graphique dédiée NVIDIA GeForce RTX 3050 et écran 144 Hz haute fluidité.',
      price: 590000,
      promoPrice: 540000,
      stock: 3,
      condition: 'Neuf',
      isFeatured: true,
      isVisible: true,
      categoryId: catGamer ? catGamer.id : catLaptops.id,
      brandId: brandHP.id,
      specifications: [
        { label: 'Processeur', value: 'Intel Core i5-12450H (8 cœurs, jusqu\'à 4.40 GHz)', position: 1 },
        { label: 'Carte graphique', value: 'NVIDIA GeForce RTX 3050 4 Go GDDR6', position: 2 },
        { label: 'Mémoire vive (RAM)', value: '16 Go DDR4 3200 MHz', position: 3 },
        { label: 'Écran', value: '15.6" Full HD 144 Hz IPS', position: 4 }
      ]
    }
  ];

  for (const prodData of demoProducts) {
    const { specifications, ...productFields } = prodData;
    const existing = await prisma.product.findUnique({ where: { slug: prodData.slug } });
    if (!existing) {
      const created = await prisma.product.create({
        data: {
          ...productFields,
          specifications: {
            create: specifications
          }
        }
      });
      console.log(`✅ Produit créé : ${created.name} (Stock : ${created.stock})`);
    }
  }

  console.log('🎉 Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
