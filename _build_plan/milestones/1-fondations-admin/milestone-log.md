# Journal du Jalon 1 — Fondations & back-office

## Ce qui est nouveau dans l'application

- **Accès sécurisé à l'administration** : Vous pouvez vous connecter et vous déconnecter de votre espace d'administration via l'adresse `/admin` avec vos identifiants protégés. En navigation privée ou sans connexion, l'accès est strictement verrouillé.
- **Tableau de bord de pilotage** : Vous retrouvez en un coup d'œil l'état de votre catalogue avec vos compteurs clés (Total produits, Catégories, Produits disponibles et Alertes de rupture de stock) ainsi que des listes d'accès rapide vers vos derniers ajouts et produits vedettes.
- **Gestion complète du catalogue** : Vous pouvez créer, modifier, dupliquer, masquer/publier et supprimer vos produits informatiques avec calcul de stock et référence interne.
- **Formulaire produit détaillé** : Vous pouvez définir le nom, la marque, la catégorie, le prix en FCFA, un éventuel prix promo barré, le stock, la description et l'état de l'appareil (neuf, reconditionné, occasion) avec suggestions automatiques.
- **Caractéristiques techniques personnalisées** : Vous pouvez ajouter librement vos caractéristiques techniques ligne par ligne (processeur, mémoire vive, stockage, taille d'écran, etc.) avec suggestion instantanée des termes déjà employés dans la boutique.
- **Galerie de photos produits** : Vous pouvez ajouter plusieurs photos pour chaque produit, définir la photo principale qui apparaîtra en couverture, saisir les descriptions pour l'accessibilité et supprimer les clichés obsolètes.
- **Organisation par catégories et marques** : Vous disposez d'un espace dédié pour créer et organiser vos catégories de catalogue (avec ordre d'affichage et visibilité) et vos marques partenaires.

---

## Détails d'implémentation (pour l'agent du Jalon suivant)

### Ce qui a été construit
- **Stack & Serveur** :
  - Architecture Node.js + Express avec rendu côté serveur en EJS (`src/app.js`, `src/server.js`).
  - Sessions sécurisées via `express-session` avec persistance `connect-pg-simple` en production (`src/middlewares/auth.js`).
  - Protection des routes `/admin/*` via le middleware `requireAuth`.
  - Intégration continue (CI) via GitHub Actions (`.github/workflows/ci.yml`) avec conteneur PostgreSQL pour les tests et la validation Prisma.
- **Base de données (Prisma + PostgreSQL)** :
  - Modèles définis dans `prisma/schema.prisma` : `Admin`, `Category`, `Brand`, `Product`, `ProductPhoto`, `Specification`.
  - Migration initiale appliquée : `migrations/20260908090027_init_milestone_1`.
  - Script de seed opérationnel (`prisma/seed.js`) créant l'administrateur par défaut (`admin@gqstore.com` / `adminGQ2026!`), 4 catégories de base et 6 marques de référence.
- **Téléversement & Stockage d'images** :
  - Service hybride dans `src/middlewares/upload.js` :
    - Si Cloudinary est configuré (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`), téléversement direct sur Cloudinary avec enregistrement du `publicId` pour suppression.
    - Si les variables Cloudinary sont absentes en local, fallback automatique et transparent sur le dossier statique `public/uploads/`.
- **Contrôleurs & Routes** :
  - `auth.controller.js` & `auth.routes.js` : login, logout, gestion session.
  - `dashboard.controller.js` : agrégation des métriques statistiques et listes de raccourcis.
  - `product.controller.js` & `product.routes.js` : liste avec recherche multi-critères, filtres par statut, pagination, création transactionnelle (produit + caractéristiques + photos), édition complète, duplication, bascule visibilité/mise en avant, suppression sécurisée.
  - `category.controller.js` & `category.routes.js` : CRUD catégories, gestion de l'ordre d'affichage, bascule de visibilité, protection contre la suppression de catégories contenant des produits.
  - `brand.controller.js` & `brand.routes.js` : CRUD marques avec contrôle d'intégrité référentielle.
- **Design System & Vues (Mobile First)** :
  - Feuille de style CSS vanilla `public/css/admin.css` respectant scrupuleusement la charte GQ Store (violet GQ `#431A69`, fond blanc/neutre `#FFFFFF` / `#F7F7F8`, boutons tactiles, tableau défilant ou cartes adaptatives).
  - Vues EJS modulaires avec structure `src/views/partials/header.ejs`, `admin-sidebar.ejs`, `admin-header.ejs` (tiroir mobile), `flash-messages.ejs` et `footer.ejs`.
  - Scripts interactifs légers `public/js/admin.js` (menu mobile, alertes) et `public/js/product-form.js` (ajout/suppression dynamique de caractéristiques, prévisualisation locale des photos sélectionnées).
- **Tests automatisés** :
  - Suite de tests complète dans `test/app.test.js` utilisant le runner natif `node:test` validant l'ensemble des critères d'acceptation du jalon (authentification, création de catégorie, marque, produit avec 3 photos et 5 caractéristiques, mise à jour stock à 0, masquage/démasquage, duplication, déconnexion et contrôle de navigation privée).

### Décisions prises pendant l'implémentation (non spécifiées dans le PRD)
1. **Fallback d'upload local** : Implémentation d'un adaptateur de stockage local automatique dans `src/middlewares/upload.js` pour permettre à l'équipe et aux tests de manipuler des photos sans nécessiter de clés Cloudinary actives immédiatement en développement local.
2. **Port par défaut 3333** : Choix de `PORT=3333` dans `.env` pour éviter les collisions fréquentes avec d'autres services locaux utilisant le port standard 3000.
3. **Duplication de produit** : Lors de la duplication d'un produit, le clone est créé avec le suffixe `(Copie)`, la référence `-COP`, un slug unique et passe automatiquement en `isVisible: false` pour permettre à l'administrateur d'ajuster les prix et stocks avant publication.

### Ce que le jalon suivant doit savoir (Jalon 2 — Site public)
- Les modèles Prisma et leurs relations sont prêts :
  - Pour afficher les produits publics, filtrer toujours sur `isVisible: true`.
  - Pour les produits vedettes de la page d'accueil, filtrer sur `isVisible: true` et `isFeatured: true`.
  - Les photos sont triées par `position: 'asc'`, et la photo de couverture porte le booléen `isMain: true`.
  - Les caractéristiques sont stockées dans la table `Specification` avec `label`, `value`, `position`.
  - Les prix sont des entiers en FCFA. Si `promoPrice` est non nul, il s'agit du prix d'achat et le champ `price` est l'ancien prix barré.
  - Un produit avec `stock <= 0` doit afficher le badge « Rupture de stock ».
- Les utilitaires `src/utils/formatters.js` (`formatFCFA`, `formatDate`) et `src/utils/slugify.js` (`createSlug`) sont déjà disponibles et réutilisables pour le catalogue public.
- Le logo officiel de GQ Store est accessible publiquement sur `/images/logo-gq-store.png`.

### Écarts par rapport au PRD et leurs raisons
- Aucun écart fonctionnel par rapport au périmètre du Jalon 1. Le critère d'acceptation « Terminé quand » est validé à 100 %.
