# Journal de bord — Jalon 2 : Site public & Catalogue

Date : 8 Septembre 2026  
Statut : **100% Terminé & Validé**

---

## Ce qui est nouveau dans l'application

1. **Page d’accueil vitrine (`/`)** :
   - Hero section valorisante aux couleurs GQ Store (`#431A69` signature sur blanc/neutre), avec 2 boutons d'appel à l'action (« Explorer le catalogue » et « PC Portables »).
   - Barre de réassurance technique tripartite (Qualité Contrôlée, Garantie Incluse, Livraison Rapide Cotonou/Calavi/Bénin).
   - Section des rayons/catégories interactives avec compteurs de produits disponibles.
   - Grille de produits mis en avant (« Sélection Premium ») et derniers arrivages avec photos, badges d'état et tarifs en FCFA.
   - Bannière d'appel à l'action pour inviter à la recherche multicritères.

2. **Catalogue interactif Mobile First (`/catalogue`)** :
   - Barre d'outils avec comptage dynamique des résultats et sélecteur de tri (Plus récents, Prix croissant/décroissant, Nom alphabétique).
   - Tiroir de filtres tactile mobile (`.filter-drawer`) ouvrant sur smartphone via le bouton « Filtres » et permettant le filtrage instantané.
   - Barre latérale de filtres desktop fixe (>992px) avec mise à jour immédiate.
   - Filtres multicritères combinables : recherche plein-texte, marque, catégorie, état (Neuf, Reconditionné), plage de prix min/max et stock disponible uniquement.
   - Gestion des états actifs avec tags de filtres supprimables et bouton « Réinitialiser ».
   - Pagination numérotée préservant l'ensemble des filtres actifs dans les URLs.
   - État vide élégant (« Aucun produit trouvé ») guidant le visiteur à élargir sa recherche.

3. **Fiche produit détaillée (`/produits/:slug`)** :
   - Galerie photos interactive Mobile First : image principale haute définition et carrousel de vignettes miniatures cliquables.
   - Titre, marque, référence SKU, badge d'état (`Neuf` / `Reconditionné`) et fil d'Ariane dynamique.
   - Badge de disponibilité dynamique : vert « En stock (X disponibles) » si `stock > 0`, rouge « Rupture de stock » si `stock === 0`.
   - Boîte de prix avec tarif en FCFA, prix barré et pourcentage de réduction calculé automatiquement si prix promo.
   - Tableau complet des caractéristiques techniques (`specs-table` : Processeur, RAM, SSD, Écran, Carte graphique, Batterie) ordonné par position.
   - Grille de produits similaires recommandés (même catégorie ou marque).
   - Protection 404 automatique si le produit est masqué (`isVisible: false`) ou si sa catégorie parente est masquée.

4. **Composants globaux & Charte graphique** :
   - Header public avec logo officiel GQ Store, liens de navigation, recherche rapide intégrée et menu mobile glissant.
   - Footer enrichi avec coordonnées officielles (Calavi, Bénin / Lun - Sam 09h30 - 20h30), garanties et liens rapides.
   - Feuilles de style CSS vanilla (`public/css/public.css`) et script client (`public/js/public.js`) pour les tiroirs mobiles et la galerie photo.

5. **Tests automatisés & Couverture** :
   - Suite de tests complète `test/public.test.js` (9 tests de bout en bout couvrant accueil, filtres, recherche ThinkPad, catégories dédiées, fiches produits, badges de rupture et protection 404).
   - 13/13 tests au total (Jalon 1 + Jalon 2) passant au vert via `npm test`.

---

## Décisions d'ingénierie et architecture

- **SSR EJS + CSS/JS Vanilla** : Chargement ultra-rapide, respect rigoureux du cahier des charges Mobile First, aucune dépendance lourde sur le client.
- **Requêtes Prisma optimisées** : Pagination `skip` / `take`, clause `where` composée dynamiquement pour le moteur de recherche plein-texte insensible à la casse (nom, référence, description, marque, catégorie et caractéristiques techniques).
- **Règles de visibilité strictes** : Un produit n'est visible sur la vitrine publique que si `isVisible: true` ET `category.isVisible: true`.
- **Intégration Context7 & Graphify** : Documentation officielle Express/EJS consultée via Context7 MCP ; graphe de connaissances recalculé à chaque étape (`153 nodes, 164 edges, 34 communities`).

---

## Validation des critères d'acceptation du jalon

| Critère d'acceptation | Statut | Preuve de validation |
|---|---|---|
| 1. Navigation catalogue Mobile First | Validé | Menu burger + Drawer de filtres tactiles testés sur mobile |
| 2. Filtrage par marque et par prix | Validé | Filtres `brand` et `minPrice`/`maxPrice` testés via test & curl |
| 3. Recherche « ThinkPad » et résultats | Validé | Query `?q=ThinkPad` retourne les ThinkPad T14 et X1 Carbon |
| 4. Fiche produit avec galerie et specs | Validé | `/produits/:slug` rend la galerie et le tableau `specs-table` |
| 5. Badge « Rupture de stock » si stock 0 | Validé | Fiche ThinkPad X1 Carbon (`stock: 0`) affiche le badge rouge |
