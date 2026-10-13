# Validation 1.21.6

Cas signalé : Osamodas en pause, vague 14. Capture visuelle avant modification, sans relancer ni interrompre le combat. Les réglages précédents ne masquaient qu’une petite liste de particules décoratives, laissant les principaux effets de sorts dessinés.

Mode no-spells : acteur reconnu à partir des définitions de clips ennemis et des préfixes des invocations, avec cache de classification ; personnages, invocations, objets collectables et marqueur natif des pièges conservés. Les clips d’effets sont exclus du dessin ; les cellules utilisent un losange aux dimensions issues de la même échelle native. Projectiles matérialisés par des repères simples, faisceau par sa direction et sa longueur natives. Les autres chemins vectoriels d’avertissement restent dans le renderer officiel. Les tableaux de simulation ne sont pas modifiés.

Pause : limitation du redessin du canvas à environ quatre passages par seconde, avec invalidation immédiate lors d’un changement de qualité, dimension ou reprise. Les menus HTML et leurs commandes gardent leur fonctionnement.

Tests JavaScript sur les deux familles d’adaptateurs, tests Java d’ancres, analyse syntaxique des trois modules transformés et compilation. Tests spécifiques : acteurs conservés, effet lourd sans dessin de sprite, cellule à l’échelle native, projectile hostile et direction du faisceau, reprise du rendu, changement de qualité en pause. Cette préparation ne comporte aucune nouvelle mesure de FPS en combat.

Installation sur le Thor effectuée après accord, avec mise à jour conservant les données : version 1.21.6, code 47. Démarrage vérifié et mode « Sans animations de sorts » sélectionné par interaction avec le menu de l’écran inférieur. Le menu principal propose de reprendre la partie sur la Presqu’île des Dragoeufs, vague 14, niveau 26. La partie n’a pas été reprise pour cette vérification : le maintien de 60 FPS et le rendu des avertissements en combat chargé restent à mesurer sur le Thor.
