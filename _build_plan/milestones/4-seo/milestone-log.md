# Journal de bord — Jalon 4 : SEO automatique

Date : 8 Septembre 2026  
Statut : **100% Terminé & Validé**

---

## Ce qui est nouveau dans l'application

- **Indexation automatique sur Google** : Chaque nouveau produit et chaque nouvelle catégorie créés dans le back-office deviennent immédiatement découvrables par les moteurs de recherche sans aucune action technique supplémentaire.
- **Titres et descriptions automatiques percutants** : Les pages produits et catégories affichent automatiquement des titres précis et des résumés attrayants (avec état du matériel, prix en FCFA et garantie) adaptés aux résultats de recherche Google.
- **Personnalisation SEO sur mesure** : L'administrateur peut saisir manuellement un titre ou une description personnalisée dans le formulaire produit ou catégorie ; ses saisies remplacent instantanément les textes automatiques.
- **Aperçus de partage soignés (WhatsApp, Facebook, Twitter/X)** : Le partage d'un lien de produit sur WhatsApp ou les réseaux sociaux affiche désormais une carte d'aperçu enrichie avec la photo officielle du produit, son nom et son prix.
- **Fil d'Ariane interactif et compréhensible** : Un chemin de navigation clair (Accueil > Catalogue > [Catégorie] > [Produit]) guide le visiteur et indique sa position exacte sur le site.
- **Affichage des fiches enrichies Google (Prix & Disponibilité)** : Le moteur de recherche Google peut afficher directement le prix en FCFA (XOF), la marque et la mention « En stock » ou « Rupture de stock » dans les résultats de recherche.
- **Plan de site automatique (`/sitemap.xml`)** : Un répertoire complet et mis à jour en continu liste uniquement les pages, catégories et produits visibles pour guider l'exploration de Google.
- **Protection du back-office (`/robots.txt`)** : Les moteurs de recherche sont automatiquement informés de ne pas explorer ni afficher les pages d'administration sécurisées et le panier.
- **Retrait instantané des produits masqués** : Dès qu'un produit ou une catégorie est désactivé ou masqué, il disparaît immédiatement du plan de site et son adresse directe renvoie une page introuvable (404), évitant tout mauvais aiguillage des clients.

---

## Ce qui a été construit (Détail technique)

- **Fichiers créés** :
  - `src/utils/seo.js` : Module utilitaire centralisant la résolution d'URL canonique (`getBaseUrl`), le nettoyage de texte meta (`cleanMetaText`), la génération des métadonnées produit (`generateProductSeo`), catégorie (`generateCategorySeo`), catalogue (`generateCatalogSeo`) et accueil (`generateHomeSeo`). Génère les schémas Schema.org JSON-LD `Product`, `Offer` (avec devise officielle `XOF`), `BreadcrumbList` et `ComputerStore`.
  - `src/controllers/seo.controller.js` : Contrôleur dédié générant dynamiquement `/sitemap.xml` (filtrage strict des produits/catégories visibles, encodage XML UTF-8, dates ISO `lastmod`, priorités et fréquences) et `/robots.txt` (autorisations, directives `Disallow: /admin`, `Disallow: /admin/`, `Disallow: /panier`, et balise `Sitemap`).
  - `test/seo.test.js` : Suite automatisée de 8 tests rigoureux validant `robots.txt`, `sitemap.xml`, l'exclusion des masqués, la génération des balises meta, canoniques et JSON-LD, les overrides admin, et la gestion du 404 lors du masquage.
  - `_build_plan/milestones/4-seo/milestone-log.md` : Journal de bord officiel du jalon.

- **Fichiers modifiés** :
  - `src/routes/public.routes.js` : Enregistrement des routes `GET /robots.txt` et `GET /sitemap.xml`.
  - `src/views/partials/public-header.ejs` : Remplacement du `<head>` statique par un bloc SEO dynamique complet avec `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta name="robots">`, Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`), Twitter Card (`summary_large_image`), et balises `<script type="application/ld+json">`.
  - `src/controllers/public.controller.js` : Injection systématique de l'objet `seo` dans `getHome`, `getCatalog`, `getCategoryPage`, `getProductDetail`, et `getCart`.
  - `src/views/public/product.ejs` : Correction de la liaison des attributs `alt` des photos (`photo.alt || product.name`), fil d'Ariane et conservation du `<h1>` sémantique unique.
  - `src/views/public/catalog.ejs` : Prise en charge dynamique de la description de catégorie sous le `<h1>` et fil d'Ariane enrichi.

---

## Décisions prises pendant l'implémentation

1. **Devise ISO 4217 pour Schema.org** :
   - Conformément aux spécifications Google et Schema.org, la devise du prix dans les balises structurées est `priceCurrency: "XOF"` (symbole international du Franc CFA d'Afrique de l'Ouest).
2. **Gestion de l'URL Canonique sous filtres et pagination** :
   - Pour éviter la duplication de contenu dans Googlebot lors de l'application de filtres de tri ou de recherche (ex: `/catalogue?condition=Neuf&sort=price_desc&page=2`), l'URL canonique reste strictement `${baseUrl}/catalogue` (ou `${baseUrl}/catalogue/:slug` pour une catégorie).
3. **Protection de la page panier** :
   - La page `/panier` n'ayant aucune utilité dans les résultats de recherche, elle intègre `<meta name="robots" content="noindex, nofollow">` ainsi qu'une directive `Disallow: /panier` dans `/robots.txt`.
4. **Cohérence sitemap / 404 sur les catégories masquées** :
   - Si une catégorie est masquée (`isVisible: false`), tous ses produits sont exclus du sitemap et renvoient un code 404 sur leur URL directe, garantissant une cohérence absolue entre l'indexation et la réalité du catalogue.

---

## Ce que le jalon suivant (Jalon 5 : Finition, sécurité & mise en ligne) doit savoir

- L'application dispose désormais de toutes ses routes publiques, SEO, panier et administration.
- Variables d'environnement pour la mise en ligne :
  - `APP_URL` : À configurer sur l'URL finale (ex: `https://gqstore.bj` ou `https://gq-store.onrender.com`) pour que les URLs canoniques, le sitemap et les aperçus Open Graph utilisent le domaine officiel en HTTPS.
  - `DATABASE_URL`, `SESSION_SECRET`, `CLOUDINARY_*`, `WHATSAPP_NUMBER` sont déjà configurés et fonctionnels.
- Total des tests automatisés au vert : **28 tests passés avec 0 échec** (`npm test`).
- Le graphe de connaissances Graphify est synchronisé avec 185 nœuds et 35 communautés.

---

## Écarts par rapport au PRD et leurs raisons

Aucun écart fonctionnel. Toutes les spécifications du Jalon 4 décrites dans le PRD ont été strictement respectées.

---

## Validation des critères d'acceptation du jalon

| Critère officiel | Statut | Preuve de validation |
|---|---|---|
| Adresse lisible générée à la création (`/produits/:slug`) | Validé | Slugs uniques générés par `generateUniqueSlug` et routés dans `public.routes.js` |
| Titre, description, H1 et textes alternatifs générés à partir de la fiche | Validé | Module `generateProductSeo` + `photo.alt` vérifiés dans `test/seo.test.js` (Test 4) |
| Champs SEO modifiables par l'admin qui prévalent sur le texte généré | Validé | `seoTitle` et `seoDescription` prioritaires sur fiche produit et catégorie (Test 5) |
| Données structurées `Product` (nom, image, description, marque, prix, devise, disponibilité) | Validé | Schéma JSON-LD Schema.org `Product` avec `Offer` en devise `XOF` (Test 4) |
| Fil d'Ariane affiché et déclaré en données structurées | Validé | Navigation visuelle + `BreadcrumbList` JSON-LD sur produits et catégories (Tests 4 & 6) |
| Aperçus de partage Open Graph avec photo principale | Validé | Balises `og:image`, `og:title`, `og:description`, `og:type` et Twitter Cards (Tests 4 & 5) |
| Adresse canonique sur chaque page, y compris sous filtres/pagination | Validé | Balise `<link rel="canonical">` propre épurée des query params (Test 7) |
| Pages catégorie indexables avec titre, description et contenu | Validé | `/catalogue/:slug` avec SEO propre, `<h1>`, description et produits (Test 6) |
| `/sitemap.xml` dynamique ne listant que les éléments visibles | Validé | Génération XML valide avec URLs canoniques, màj immédiate lors du masquage (Tests 2, 3 & 8) |
| `/robots.txt` excluant `/admin` de l'indexation | Validé | Fichier texte interdisant `/admin`, `/admin/` et `/panier`, pointant vers sitemap (Test 1) |
| Retrait du sitemap et 404 sur masquage d'un produit | Validé | Test automatisé complet validant l'éviction du sitemap et le statut 404 (Test 8) |
| Suite de tests automatisés | Validé | **28/28 tests réussis (100% de succès)** via `npm test` |
