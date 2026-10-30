# Compatibilité du nouveau correctif officiel — 1.25.17

30 octobre 2026. Un déploiement postérieur à 1.25.16 utilise `page-D8xDa_d-.js` (SHA-256 `19bbbc6ed02316897a13cf7882f110b7b6ccc6e01c4de96bc293baa18f7f7543`) et `discord-identity-CzO6i_X-.js` (`2809ed12b1ca404c0a6f5c86ab0fdd5925f415d0c5c7af923886c08c89b2e961`). Les nouveaux profils sont ajoutés sans retirer les précédents. Les références sont remappées à partir des fonctions et de leurs usages concordants ; les contrats contrôlent toujours le code accepté.

Le nom d’une variable locale de résolution est passé de `l` à `u`. Les deux variantes connues sont reconnues avec les mêmes contrôles d’unicité et sans modifier le sens du calcul natif. Le test sur le fichier officiel actuel accepte le rendu, refuse une ancre manquante et refuse les duplications. Les tests des transformations précédentes passent également. Les trois choix graphiques, la collection à sept Dofus et les commandes restent inchangés.

Évaluation native hors réseau sur sept classes, vérification des contrats page/données et refus des modifications/ambiguïtés. Validation de chargement sur le Thor avec les nouvelles empreintes. Il n’y a pas de nouvelle mesure FPS dans cette intervention.

APK normale 1.25.17/code 75 installée après diagnostic, SHA-256 `50130b9d707fcf8c7f4c8ec9728049545631a3c23a4cd84fac89a67d856a877c`. Empreinte installée identique, UID conservé, mode diagnostic retiré, aucune suppression de données et jeu rouvert au menu.
