# Validation 1.26.7 — 21 novembre 2026

- Modules officiels relus : `page-CEQT0AP-.js` (SHA-256 `c3a7613ab4306c6d7eb7e6379c661d03b7b9eb59777b0f1c6e07c61414adaa6d`) et `discord-identity-JCD8A3MI.js` (`cf673af30b9a12c73c5f00b94dbb5b73ca461f78cbf86fe1d312b2b07ccf363f`).
- Catalogue natif : neuf classes, 122 sorts, 80 succès. Ajout du Xélor et de Capture d’Âmes aux réglages ; passifs natifs exclus des commandes manuelles, Dimension miroir reconnue.
- 38 suites JavaScript réussies : commandes brèves, menus, raccourcis, annulation des touches, préférences, nouveaux sorts et graphismes.
- Contrats natifs et transformations actuels validés, doublons et changement du rendu rejetés. Les anciennes adaptations restent disponibles.
- 27 cas de direction et portée comparés à la formule tactile native actuelle.
- Chargement : le module partagé dépasse 24 Mo. La limite est portée à 32 Mo, avec lecture bornée et réponse composée de deux flux pour éviter la copie d’une chaîne géante. Un flux de 27 Mo passe sous un tas Java limité à 48 Mo.
- Lancement de la version normale validé sur émulateur après correction du pic mémoire ; menu du jeu chargé. Les trois réglages graphiques, les avertissements au sol et les nouvelles invocations restent visibles selon le mode choisi.
- Installation par mise à niveau sur émulateur et Thor ; identifiant Android et date de première installation conservés. Aucune suppression des données.

Les tests automatisés et le démarrage ne constituent pas une mesure de FPS à haute vague ni une validation avec une manette DualSense physique.
