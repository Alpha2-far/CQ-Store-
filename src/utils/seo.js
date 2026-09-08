const { formatFCFA } = require('./formatters');

/**
 * Détermine l'URL de base absolue pour le site
 * @param {object} req - Requête Express (optionnelle)
 * @returns {string}
 */
function getBaseUrl(req) {
  if (process.env.APP_URL && process.env.APP_URL.trim()) {
    return process.env.APP_URL.trim().replace(/\/$/, '');
  }
  if (req && req.protocol && req.get) {
    const host = req.get('host');
    if (host) {
      return `${req.protocol}://${host}`;
    }
  }
  return 'https://gqstore.bj';
}

/**
 * Nettoie une chaîne de texte pour les balises meta (supprime retours ligne et tronque)
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
function cleanMetaText(text, maxLength = 160) {
  if (!text) return '';
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength - 3).trim() + '...';
}

/**
 * Résout l'URL absolue d'une image
 * @param {string} imageUrl 
 * @param {string} baseUrl 
 * @returns {string}
 */
function resolveImageUrl(imageUrl, baseUrl) {
  if (!imageUrl) return `${baseUrl}/images/logo-gq-store.png`;
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Génère les métadonnées SEO pour la fiche d'un produit
 * @param {object} product 
 * @param {string} baseUrl 
 * @returns {object}
 */
function generateProductSeo(product, baseUrl) {
  const canonicalUrl = `${baseUrl}/produits/${product.slug}`;
  
  // Titre SEO : override admin ou formule dynamique
  const title = product.seoTitle && product.seoTitle.trim()
    ? product.seoTitle.trim()
    : `${product.name} — Achat au Bénin | GQ Store`;

  // Description SEO : override admin ou extrait informatif
  let description = '';
  if (product.seoDescription && product.seoDescription.trim()) {
    description = cleanMetaText(product.seoDescription.trim());
  } else if (product.description && product.description.trim()) {
    description = cleanMetaText(product.description.trim());
  } else {
    const condition = product.condition ? `État ${product.condition}. ` : '';
    const price = formatFCFA(product.promoPrice || product.price);
    description = cleanMetaText(`Achetez ${product.name} chez GQ Store au Bénin. ${condition}Prix : ${price}. Matériel certifié avec garantie et livraison rapide.`);
  }

  // Image principale
  const mainPhoto = (product.photos && product.photos.length > 0)
    ? (product.photos.find(p => p.isMain) || product.photos[0])
    : null;
  const ogImage = resolveImageUrl(mainPhoto ? mainPhoto.url : null, baseUrl);

  // Photos pour Schema.org
  const allImages = (product.photos && product.photos.length > 0)
    ? product.photos.map(p => resolveImageUrl(p.url, baseUrl))
    : [ogImage];

  // Fil d'Ariane
  const breadcrumbItems = [
    { name: 'Accueil', url: `${baseUrl}/` },
    { name: 'Catalogue', url: `${baseUrl}/catalogue` }
  ];

  if (product.category) {
    breadcrumbItems.push({
      name: product.category.name,
      url: `${baseUrl}/catalogue/${product.category.slug}`
    });
  }

  breadcrumbItems.push({
    name: product.name,
    url: canonicalUrl
  });

  // Schéma Schema.org BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  // Schéma Schema.org Product
  const productPrice = product.promoPrice || product.price;
  const isAvailable = product.stock > 0;
  const itemCondition = (product.condition && product.condition.toLowerCase().includes('neuf'))
    ? 'https://schema.org/NewCondition'
    : 'https://schema.org/RefurbishedCondition';

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    image: allImages,
    sku: product.reference,
    offers: {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'XOF',
      price: productPrice,
      priceValidUntil: '2027-12-31',
      itemCondition,
      availability: isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'GQ Store',
        url: baseUrl
      }
    }
  };

  if (product.brand && product.brand.name) {
    productJsonLd.brand = {
      '@type': 'Brand',
      name: product.brand.name
    };
  }

  if (product.category && product.category.name) {
    productJsonLd.category = product.category.name;
  }

  return {
    title,
    description,
    canonicalUrl,
    og: {
      type: 'product',
      title,
      description,
      url: canonicalUrl,
      image: ogImage
    },
    breadcrumbs: breadcrumbItems,
    jsonLd: [productJsonLd, breadcrumbJsonLd]
  };
}

/**
 * Génère les métadonnées SEO pour une page catégorie
 * @param {object} category 
 * @param {string} baseUrl 
 * @returns {object}
 */
function generateCategorySeo(category, baseUrl) {
  const canonicalUrl = `${baseUrl}/catalogue/${category.slug}`;

  // Titre SEO : override admin ou formule dynamique
  const title = category.seoTitle && category.seoTitle.trim()
    ? category.seoTitle.trim()
    : `${category.name} — Matériel Informatique au Bénin | GQ Store`;

  // Description SEO : override admin ou extrait
  let description = '';
  if (category.seoDescription && category.seoDescription.trim()) {
    description = cleanMetaText(category.seoDescription.trim());
  } else if (category.description && category.description.trim()) {
    description = cleanMetaText(category.description.trim());
  } else {
    description = cleanMetaText(`Découvrez notre sélection de ${category.name} chez GQ Store au Bénin. Ordinateurs et accessoires contrôlés avec garantie et livraison.`);
  }

  const ogImage = resolveImageUrl('/images/logo-gq-store.png', baseUrl);

  // Fil d'Ariane
  const breadcrumbItems = [
    { name: 'Accueil', url: `${baseUrl}/` },
    { name: 'Catalogue', url: `${baseUrl}/catalogue` },
    { name: category.name, url: canonicalUrl }
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return {
    title,
    description,
    canonicalUrl,
    og: {
      type: 'website',
      title,
      description,
      url: canonicalUrl,
      image: ogImage
    },
    breadcrumbs: breadcrumbItems,
    jsonLd: [breadcrumbJsonLd]
  };
}

/**
 * Génère les métadonnées SEO pour le catalogue général (y compris sous filtres)
 * @param {object} filters 
 * @param {string} baseUrl 
 * @returns {object}
 */
function generateCatalogSeo(filters, baseUrl) {
  // L'URL canonique reste TOUJOURS propre sur /catalogue
  const canonicalUrl = `${baseUrl}/catalogue`;

  let title = 'Catalogue Informatique | GQ Store';
  if (filters && filters.q && filters.q.trim()) {
    title = `Recherche « ${filters.q.trim()} » — Catalogue GQ Store`;
  } else if (filters && filters.condition) {
    title = `Matériel ${filters.condition} — Catalogue GQ Store`;
  }

  const description = cleanMetaText('Parcourez tout notre inventaire informatique disponible au Bénin : PC portables, ordinateurs de bureau, écrans, accessoires et consommables certifiés avec garantie.');
  const ogImage = resolveImageUrl('/images/logo-gq-store.png', baseUrl);

  const breadcrumbItems = [
    { name: 'Accueil', url: `${baseUrl}/` },
    { name: 'Catalogue', url: canonicalUrl }
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return {
    title,
    description,
    canonicalUrl,
    og: {
      type: 'website',
      title,
      description,
      url: canonicalUrl,
      image: ogImage
    },
    breadcrumbs: breadcrumbItems,
    jsonLd: [breadcrumbJsonLd]
  };
}

/**
 * Génère les métadonnées SEO pour la page d'accueil
 * @param {string} baseUrl 
 * @returns {object}
 */
function generateHomeSeo(baseUrl) {
  const canonicalUrl = `${baseUrl}/`;
  const title = 'GQ Store — Consommables & Matériel Informatique de Qualité';
  const description = cleanMetaText('Boutique informatique de référence au Bénin. Ordinateurs portables, PC de bureau et accessoires contrôlés avec garantie. Commande directe via WhatsApp.');
  const ogImage = resolveImageUrl('/images/logo-gq-store.png', baseUrl);

  const storeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ComputerStore',
    name: 'GQ Store',
    description,
    url: baseUrl,
    logo: resolveImageUrl('/images/logo-gq-store.png', baseUrl),
    image: resolveImageUrl('/images/logo-gq-store.png', baseUrl),
    telephone: '+229 98 47 13 66',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Abomey-Calavi',
      addressCountry: 'BJ'
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'BJ'
    },
    priceRange: 'FCFA'
  };

  return {
    title,
    description,
    canonicalUrl,
    og: {
      type: 'website',
      title,
      description,
      url: canonicalUrl,
      image: ogImage
    },
    jsonLd: [storeJsonLd]
  };
}

module.exports = {
  getBaseUrl,
  cleanMetaText,
  resolveImageUrl,
  generateProductSeo,
  generateCategorySeo,
  generateCatalogSeo,
  generateHomeSeo
};
