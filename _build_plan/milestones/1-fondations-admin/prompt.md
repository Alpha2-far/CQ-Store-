# Jalon 1 — Fondations & back-office

Tu entres en mode plan pour planifier puis construire le jalon 1 de ce projet.

## Contexte

- Lis `@_build_plan/prd.html` pour l'ensemble du contexte projet : périmètre, modèle de données, identité visuelle et stack technique.
- Lis les journaux des jalons précédents (`@_build_plan/milestones/1-*/milestone-log.md`, etc.) pour savoir ce qui a déjà été construit. S'il s'agit du jalon 1, il n'y a aucun journal antérieur.

## Ta tâche

1. Planifie l'implémentation du **seul** jalon 1 tel que défini dans le PRD. Ne planifie ni ne construis rien qui relève des jalons suivants.
2. Après validation du plan par l'utilisateur, construis uniquement ce qui est dans le périmètre du jalon 1.
3. Vérifie ton travail contre le critère « Terminé quand » du jalon 1 dans le PRD.
4. Une fois terminé, écris un `milestone-log.md` dans ce dossier (`_build_plan/milestones/1-fondations-admin/milestone-log.md`), structuré ainsi :
   - **Commence par une section `## Ce qui est nouveau dans l'application` tout en haut.** Liste à puces concise et lisible par un non-technicien : les fonctionnalités visibles ajoutées par ce jalon, formulées comme des capacités que l'utilisateur va voir ou pouvoir faire, pas comme des artefacts techniques. Court et parcourable.
   - Puis les sections de détail d'implémentation, pour l'agent du jalon suivant :
     - Ce qui a été construit (fichiers créés, modèles ajoutés, routes ajoutées, etc.)
     - Les décisions prises pendant l'implémentation qui n'étaient pas spécifiées dans le PRD
     - Ce que le jalon suivant doit savoir
     - Les écarts par rapport au PRD et leurs raisons

Pose-moi tes questions de clarification avec l'outil AskUserQuestion pour verrouiller le plan d'implémentation de ce jalon.
