# Journal de bord — Jalon 3 : Panier & Commande WhatsApp

Date : 8 Septembre 2026  
Statut : **100% Terminé & Validé**

---

## Ce qui est nouveau dans l'application

1. **Boutons « Ajouter au panier » sur le catalogue et les fiches produits** :
   - Sur chaque fiche produit : un sélecteur de quantité tactile (- / +) et un gros bouton violet « Ajouter au panier » actif si l'article est en stock.
   - Sur chaque carte produit de l'accueil et du catalogue : un bouton d'ajout rapide direct sans quitter la liste de résultats.
   - Sur les produits en rupture de stock (`stock = 0`) : le bouton d'ajout au panier est automatiquement désactivé avec la mention « Rupture de stock — Ajout impossible », et remplacé par un bouton WhatsApp de demande de réapprovisionnement.

2. **Compteur interactif dans l'en-tête** :
   - Icône de panier visible en permanence sur mobile et desktop avec une pastille badge (`#cartBadge`) indiquant le nombre total d'articles sélectionnés en temps réel.
   - Lien direct vers `/panier`.
   - Notification toast discrète (« [Produit] ajouté au panier ! ») confirmant instantanément l'action.

3. **Page Panier interactive (`/panier`)** :
   - Liste détaillée des articles avec photos, titres, références SKU, prix unitaires en FCFA.
   - Contrôles de quantité tactiles (+ / -) avec recalcul immédiat des sous-totaux par ligne.
   - Bouton de suppression individuelle d'un article et bouton pour vider le panier en un clic.
   - Affichage d'un « Total indicatif » mis en avant en grand en FCFA.
   - Écran « Votre panier est vide » chaleureux avec illustration et bouton d'action vers le catalogue lorsque le panier ne contient aucun article.

4. **Conservation persistante dans le navigateur** :
   - Le panier est sauvegardé dans le `localStorage` (`gq_cart`) : il survit aux changements de pages, aux rechargements (F5) et à la fermeture du navigateur sans perte de données.

5. **Génération de commande WhatsApp en un clic** :
   - Gros bouton vert officiel WhatsApp (`#25D366`) « Commander sur WhatsApp » dans le panier, générant un message complet pré-rempli adressé au numéro officiel GQ Store (`+229 98 47 13 66`) :
     - Liste numérotée de tous les articles.
     - Références et quantités sélectionnées.
     - Calcul des sous-totaux et total indicatif en FCFA.
     - Demande de confirmation de disponibilité et modalités de livraison.
   - Bouton « Commander sur WhatsApp » direct sur chaque fiche produit pour acheter un seul article sans passer par le panier.

6. **Bouton WhatsApp flottant persistant** :
   - Pastille flottante verte `#25D366` en bas à droite de toutes les pages publiques, discrète et ne masquant aucun contrôle mobile, permettant un contact direct immédiat avec GQ Store.

---

## Ce qui a été construit (Détail technique)

- **Fichiers créés** :
  - `src/views/public/cart.ejs` : Vue de la page panier avec mise en page responsive, réassurance sans risque (aucun paiement en ligne), et conteneur dynamique.
  - `test/cart.test.js` : Suite automatisée de 7 tests couvrant la route `/panier`, les badges, le bouton flottant, la désactivation sur rupture et la génération du message WhatsApp.
  - `_build_plan/milestones/3-panier-whatsapp/milestone-log.md` : Journal de bord du jalon.

- **Fichiers modifiés** :
  - `.env` et `.env.example` : Configuration de la variable `WHATSAPP_NUMBER="22998471366"`.
  - `src/app.js` : Middleware d'injection globale de `res.locals.whatsappNumber`.
  - `src/controllers/public.controller.js` : Méthode `getCart(req, res)`.
  - `src/routes/public.routes.js` : Route `GET /panier`.
  - `public/css/public.css` : Styles CSS vanilla pour `.cart-badge`, `.whatsapp-float-btn`, `.btn-whatsapp`, `.cart-layout`, `.cart-item-card`, `.cart-qty-wrapper`, `.cart-summary-card`, `.empty-cart-card`, et `.cart-toast`.
  - `public/js/public.js` : Module `GQCart` avec persistance `localStorage`, écouteurs d'événements, toast, et générateurs de liens `wa.me`.
  - `src/views/partials/public-header.ejs` : Icône panier avec badge réactif visible sur mobile et desktop, et entrée dans le menu tiroir mobile.
  - `src/views/partials/public-footer.ejs` : Bouton flottant WhatsApp persistant avec lien vers `wa.me/22998471366`.
  - `src/views/public/product.ejs` : Sélecteur de quantité, boutons d'ajout au panier et de commande WhatsApp directe.
  - `src/views/public/catalog.ejs` & `src/views/public/home.ejs` : Boutons d'ajout rapide au panier sur les cartes de produits disponibles.

---

## Décisions prises pendant l'implémentation

1. **Numéro WhatsApp officiel** :
   - L'utilisateur a confirmé le numéro de commande : `+229 98 47 13 66` (`22998471366` pour l'API `wa.me`), configuré via `WHATSAPP_NUMBER` dans `.env`.
2. **Gestion 100% Client du Panier** :
   - Conformément aux consignes du PRD, aucun enregistrement SQL ni table de panier n'a été créé côté serveur. La gestion par `localStorage` garantit une fluidité absolue, aucun appel API inutile, et la persistance intégrale entre sessions de navigation.
3. **Format du message WhatsApp** :
   - Le message est pré-formaté avec saut de ligne, puces, références, quantités et total en FCFA clair, respectant le protocole d'encodage URI pour WhatsApp Web et WhatsApp Mobile.
4. **Comportement Rupture de stock** :
   - Les boutons d'ajout au panier sont désactivés pour tout produit ayant `stock === 0`, tout en offrant un bouton direct pour demander un réapprovisionnement sur WhatsApp.

---

## Ce que le jalon suivant (Jalon 4 : SEO Automatique) doit savoir

- Les routes publiques actuelles sont :
  - `/` (Accueil)
  - `/catalogue` (Catalogue avec filtres et pagination)
  - `/catalogue/:slug` (Catégorie dédiée)
  - `/produits/:slug` (Fiche produit)
  - `/panier` (Page panier)
- Le modèle `Product` possède déjà les champs `seoTitle` et `seoDescription` (String optionnels).
- Le Jalon 4 pourra générer automatiquement le `sitemap.xml`, le `robots.txt`, les balises OpenGraph/Twitter Cards et les données structurées JSON-LD (Schema.org `Product` et `BreadcrumbList`).

---

## Validation des critères d'acceptation du jalon

| Critère officiel | Statut | Preuve de validation |
|---|---|---|
| Ajouter deux produits au panier | Validé | Module `GQCart.addItem` + bouton rapide sur catalogue et fiche produit |
| Modifier une quantité | Validé | Contrôles +/- et `updateQuantity` dans `/panier` recalculant le total |
| Recharger la page sans rien perdre | Validé | Persistance `localStorage` (`gq_cart`) testée et vérifiée |
| « Commander sur WhatsApp » ouvre WhatsApp pré-rempli | Validé | URL `wa.me/22998471366` générée avec les 2 produits, quantités et total indicatif en FCFA |
| Ajout au panier désactivé sur produit à stock 0 | Validé | Bouton désactivé et mention rupture sur produit épuisé (test n°5 dans `cart.test.js`) |
| 20/20 tests automatisés au vert | Validé | `npm test` : 20 tests passés, 0 échec |
