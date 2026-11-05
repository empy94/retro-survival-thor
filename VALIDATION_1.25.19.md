# Compatibilité du jeu officiel — 1.25.19

5 novembre 2026. Page `page-CNHFarRB.js` : `e4bb15ff9d5d7d918c84bbf30da1a5d5469cf252812a4bc70dbc4363ce026239`. Données `discord-identity-BYNJkebs.js` : `fe2bac829e322573be8d90f90ae062c82464dc7528636623bc5a51ec158b9ffe`.

Les nouveaux contrats et points d’entrée conservent le pilotage Android de l’application. La lecture manette du navigateur reste neutralisée avant le montage React. Les trois réglages graphiques, le clavier, R3 et les sorts automatiques sont conservés. L’objet d’Arène est lu dans le catalogue natif ; son image absente reçoit un symbole neutre, sans inventer de caractéristiques.

Le test physique a identifié le refus d’un petit helper de clips non exporté, dont le corps ressemble à de nombreux autres helpers. Le profil courant ancre explicitement son nom `Tc` et conserve le contrôle de son corps complet. La limite de recherche, les refus des doublons et des changements de logique ne sont pas assouplis. Régénération : `node tools/build-module-contract.cjs build/update-audit-20261105/discord-identity-BYNJkebs.js assets/shared-contract-nov5.json assets/native-shared-hook-nov5.js --pin=Tc`.

Tests réussis : contrats page/données, transformation du rendu, refus des changements de logique et des doublons ; test spécifique du helper et de son ambiguïté ; pilotage unique, répétition de croix, raccourcis/R3, clavier, navigation, sorts automatiques, Crâ, Corbeau, collection, cache natif, rendu sans animations et adaptation graphique.

Sur le Thor : empreintes actuelles chargées, pilote Android unique, aucune manette relue par le navigateur, deux pressions de croix donnant exactement deux couples appui/relâchement. La partie Sadida/Astrub existante reprend à la vague 1, niveau 2, avec 16 PV et le choix de niveau en pause. Aucune amélioration choisie pour les essais. Pas de mesure FPS en combat complet et pas de test multijoueur réel.

Installation finale sans effacement : 1.25.19/code 77, UID et première installation inchangés. APK normale sans débogage : `e53f3ea50c996a4105b4bd12cbffd2b6e81d52c19dc4be98ed4898334a13f7ac`. Ancienne APK conservée dans `build/thor-before-20261105/`.
