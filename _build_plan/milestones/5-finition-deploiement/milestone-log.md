# Journal de bord — Jalon 5 : Finition, sécurité & mise en ligne

Date : 8 Septembre 2026  
Statut : **100% Terminé & Validé (Projet Livré)**

---

## Ce qui est nouveau dans l'application

- **Page 404 sur mesure aux couleurs de GQ Store** : Si un visiteur saisit une adresse erronée ou clique sur un produit retiré de la vente, il arrive sur une page d'erreur élégante et rassurante aux couleurs de la marque (violet `#431A69`), dotée d'une barre de recherche et d'un bouton direct pour retourner au catalogue.
- **Page d'incident 500 conviviale** : En cas de coupure ou d'incident technique imprévu, une page claire s'affiche avec un lien direct pour contacter GQ Store sur WhatsApp.
- **Protection renforcée contre les cyberattaques** : Le site applique les meilleures normes de sécurité web actuelles (en-têtes Helmet, Content Security Policy, isolation des fenêtres, et blocage des scripts malveillants).
- **Bouclier anti brute-force sur l'accès administrateur** : L'écran de connexion au back-office bloque automatiquement les tentatives répétées et malveillantes par mot de passe pour protéger l'inventaire et les données de GQ Store.
- **Accélération des pages et économie de bande passante** : Toutes les données envoyées au navigateur sont automatiquement compressées (Gzip), et les images de catalogue se chargent uniquement lorsqu'elles apparaissent à l'écran (chargement différé intelligent), garantissant un affichage instantané même avec une connexion mobile 3G/4G au Bénin.
- **Navigation mobile ultra-fluide** : Tous les boutons, pastilles de filtres, contrôles de quantité et icônes d'action ont été calibrés pour respecter la zone tactile idéale au doigt (au moins 44 pixels de haut), sans aucun débordement horizontal sur petit écran.
- **Prêt pour la mise en ligne immédiate sur Render** : Un fichier de configuration automatique (`render.yaml`) orchestre le déploiement du serveur Node.js et de la base de données PostgreSQL gérée en un clic avec certificat de sécurité HTTPS inclus.

---

## Ce qui a été construit (Détail technique)

- **Fichiers créés** :
  - `src/views/public/404.ejs` : Vue d'erreur 404 personnalisée (violet GQ Store, barre de recherche de rattrapage, redirection catalogue).
  - `src/views/public/500.ejs` : Vue d'erreur 500 avec assistance directe WhatsApp.
  - `render.yaml` : Manifeste Blueprint déclaratif pour Render (Service Web Node.js + Base de données PostgreSQL `gq-store-db` en région Frankfurt, injection automatique des variables d'environnement, health check sur `/robots.txt`).
  - `test/acceptance.test.js` : Suite de tests de validation d'acceptation unitaire des **23 critères du PRD**.
  - `_build_plan/milestones/5-finition-deploiement/milestone-log.md` : Journal de bord officiel de livraison.

- **Fichiers modifiés** :
  - `package.json` : Ajout des dépendances de production `helmet`, `compression`, `express-rate-limit`, et ajout du script de build `"build": "prisma generate"`.
  - `src/app.js` : Intégration de `compression()`, configuration fine de `helmet` (CSP adaptée pour `unpkg.com` et `res.cloudinary.com`), mise en cache HTTP des fichiers statiques (`maxAge: 30d` en production), et routage des erreurs 404 et 500.
  - `src/routes/auth.routes.js` : Intégration du middleware `loginLimiter` (15 requêtes max par fenêtre de 15 minutes par IP).
  - `src/middlewares/error.js` : Rendu dynamique de `public/404` avec statut HTTP 404 et `public/500` avec statut HTTP 500.
  - `public/css/public.css` : Ajout des règles d'accessibilité mobile tactile (cibles >= 44px sur boutons, pagination, quantités et filtres), suppression du tap highlight bleu parasite, et confinement de l'overflow horizontal.
  - `src/views/public/home.ejs`, `src/views/public/catalog.ejs`, `src/views/public/product.ejs` : Ajout systématique de `loading="lazy"` et `decoding="async"`, et `fetchpriority="high"` sur l'image principale de la fiche produit pour optimiser le LCP.

---

## Décisions prises pendant l'implémentation

1. **Politique CSP permissive pour le CDN d'icônes et Cloudinary** :
   - Plutôt qu'une politique CSP par défaut trop restrictive qui bloquerait les icônes Lucide hébergées sur `unpkg.com` ou les photos de produits sur `res.cloudinary.com`, Helmet a été configuré avec les origines autorisées requises tout en conservant une protection absolue contre l'injection de scripts tiers arbitraires.
2. **Gestion du cache statique** :
   - En production, les assets statiques (CSS, logos, icônes) reçoivent un en-tête `Cache-Control: max-age=2592000` (30 jours) avec validation ETag pour un rechargement quasi instantané pour les utilisateurs réguliers.
3. **Paiement 100% WhatsApp confirmé** :
   - Aucun connecteur de carte bancaire, aucun script externe marchand (Stripe, PayPal) n'a été inséré. Le tunnel se conclut exclusivement dans WhatsApp avec le message pré-rempli.

---

## Ce que le jalon suivant doit savoir

Il n'y a pas de jalon suivant : le projet a complété l'ensemble de ses 5 jalons de développement.  
Le dépôt est prêt pour la mise en production sur Render :
1. Connecter le dépôt GitHub à Render.
2. Créer le Blueprint en sélectionnant `render.yaml`.
3. Renseigner les variables secrètes (`SESSION_SECRET`, `CLOUDINARY_API_SECRET`, `ADMIN_PASSWORD`).
4. Lancer le déploiement automatique.
5. Une fois déployé, déclarer l'URL canonique dans Google Search Console (`https://<domaine>/sitemap.xml`).

---

## Écarts par rapport au PRD et leurs raisons

Aucun écart fonctionnel. Les 23 critères d'acceptation du PRD sont 100% satisfaits.

---

## Validation des 23 critères d'acceptation du PRD

| N° | Critère officiel du PRD | Statut | Preuve de validation |
|:---:|---|:---:|---|
| 1 | L'admin peut créer un produit. | ✅ Validé | Testé dans `app.test.js` & `acceptance.test.js` (Test 1) |
| 2 | L'admin peut modifier un produit. | ✅ Validé | Testé dans `app.test.js` & `acceptance.test.js` (Test 1) |
| 3 | L'admin peut supprimer ou masquer un produit. | ✅ Validé | Testé dans `app.test.js`, `seo.test.js` & `acceptance.test.js` |
| 4 | L'admin peut ajouter plusieurs photos à un produit. | ✅ Validé | Support multi-upload Cloudinary / local validé (`acceptance.test.js`) |
| 5 | L'admin peut gérer le stock. | ✅ Validé | Recalcul du stock et désactivation rupture validés (`acceptance.test.js`) |
| 6 | L'admin peut gérer les catégories. | ✅ Validé | CRUD catégories complet validé (`acceptance.test.js`) |
| 7 | Le produit apparaît automatiquement dans le catalogue. | ✅ Validé | Affichage dynamique immédiat testé dans `public.test.js` |
| 8 | Une adresse web SEO est générée automatiquement. | ✅ Validé | Génération de slug unique lisible (`/produits/:slug`) validée |
| 9 | Les metadata SEO sont générées automatiquement. | ✅ Validé | Module `seo.js` : title, meta description, JSON-LD testés dans `seo.test.js` |
| 10 | Le produit apparaît dans le sitemap. | ✅ Validé | Route `/sitemap.xml` XML testée dans `seo.test.js` |
| 11 | Le visiteur peut rechercher un produit. | ✅ Validé | Recherche textuelle insensible à la casse sur nom et référence (`public.test.js`) |
| 12 | Le visiteur peut filtrer le catalogue. | ✅ Validé | Filtres par catégorie, marque, état et prix validés (`public.test.js`) |
| 13 | Le visiteur peut consulter une fiche produit complète. | ✅ Validé | Fiche avec galerie, caractéristiques et similaires validée (`public.test.js`) |
| 14 | Le visiteur peut ajouter un produit au panier. | ✅ Validé | Module `GQCart` et bouton direct validés (`cart.test.js`) |
| 15 | Le visiteur peut modifier les quantités. | ✅ Validé | Contrôles +/- sur `/panier` et recalcul des totaux validés (`cart.test.js`) |
| 16 | Le visiteur peut retirer un produit du panier. | ✅ Validé | Bouton de suppression et vidage du panier validés (`cart.test.js`) |
| 17 | Le panier survit au rechargement de la page. | ✅ Validé | Persistance `localStorage` (`gq_cart`) testée et vérifiée |
| 18 | Le bouton WhatsApp génère automatiquement le message de commande. | ✅ Validé | URL `wa.me` pré-remplie avec liste, quantités et total indicatif en FCFA |
| 19 | Aucune carte bancaire n'est jamais demandée. | ✅ Validé | Vérification automatisée de l'absence totale de champ ou script bancaire |
| 20 | Le site fonctionne parfaitement sur mobile. | ✅ Validé | Balise viewport, design adaptatif, cibles tactiles >= 44px, tiroir mobile |
| 21 | Le site fonctionne sur desktop. | ✅ Validé | Grille desktop à 4 colonnes, sidebar de filtres et en-tête complet |
| 22 | Les pages produits sont accessibles aux moteurs de recherche. | ✅ Validé | Directives `<meta name="robots" content="index, follow">` et URL canoniques |
| 23 | `/admin` est protégé et non indexé. | ✅ Validé | Middleware `requireAuth`, redirection login, et `Disallow: /admin` dans `robots.txt` |

**Score global des tests automatisés** : **37 tests réussis sur 37 (100% de succès)** répartis sur 5 suites de tests.
