# GQ Store

Catalogue informatique premium avec commande via WhatsApp. Site public + back-office, Mobile First.

- Stack : Node.js + Express, pages HTML rendues côté serveur, CSS/JS vanilla, PostgreSQL via Prisma, images sur Cloudinary, hébergement Render.
- Identité : violet GQ `#431A69` en signature sur fond blanc (80–90 % blanc/neutre, 10–20 % violet), argenté en détail. Logo source : `assets/logo-gq-store.png`.
- Le site ne prend aucun paiement : la commande se conclut sur WhatsApp.
- **Documentation Context7 obligatoire** : Avant d'écrire ou de modifier du code impliquant des frameworks ou bibliothèques externes, tu DOIS obligatoirement interroger le serveur MCP Context7 (`resolve-library-id` puis `query-docs`) afin de t'appuyer sur la documentation officielle en temps réel.
- **Graphe de connaissances Graphify obligatoire** : Sur tout projet de code, Graphify ([Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify.git)) doit être initialisé (`graphify update .`). Pour toute requête, compréhension ou recherche d'architecture, tu DOIS obligatoirement interroger le graphe (`graphify query "<question>"` ou outils de graphe). Le graphe doit être recalculé et tenu à jour après chaque modification de code.

## `_build_plan/`

Le dossier `_build_plan/` contient le PRD initial et les prompts par jalon utilisés pour amorcer ce projet pendant sa phase de construction initiale. Ces fichiers sont **temporaires** — ils existent uniquement à des fins de documentation et de guidage. Ils ne sont **pas** fonctionnels : aucun code, configuration ou logique d'exécution de ce projet ne doit importer, référencer ou dépendre de quoi que ce soit dans `_build_plan/`.

Ne traitez pas `_build_plan/` comme de la documentation durable. Le projet évoluera au-delà des hypothèses et décisions consignées ici. Une fois les jalons initiaux terminés, ce dossier a vocation à être supprimé.
