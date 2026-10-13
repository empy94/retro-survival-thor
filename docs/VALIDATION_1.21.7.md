# Validation 1.21.7

Module officiel vérifié le 13 octobre 2026 : `page-D-GPJLS2.js`, SHA-256 `c3f2557230b1ea96cf1e33d0730864d48a31efa1367bc135e95b605724ec3149`. Adaptateurs précédents conservés. Toute version inconnue ou ancre absente/dupliquée conserve le comportement de repli sans adaptation.

L’analyse syntaxique distingue les fonctions officielles conservées des trois définitions transformées : boucle du canvas, renderer et exclusion des paires distantes. Le nouveau paramètre de coloration du sprite est conservé pour les acteurs, afin de garder le signal rose de charge. Le nouveau prédicat de visibilité des invocations reste l’autorité pour les cibles des monstres.

Cache d’équipement : seuls les indices des effets du catalogue fixe sont mémorisés ; identifiant, jets et état radiant restent lus à chaque appel. Addition dans le même ordre que la version native, sans liste intermédiaire. Recherche des cibles : mêmes priorités, limites et égalités ; passage direct dans la liste vivante avec exclusion conservative des candidats trop éloignés.

Fond de carte : une surface à la définition du canvas est préparée puis réutilisée, avec invalidation sur l’image, sa source, ses dimensions ou celles du rendu. Allocation bornée, repli sur le dessin original si le cache ne peut pas être construit. Les avertissements dynamiques restent dessinés après le fond.

Tests : comparaison avec les fonctions officielles sur 4 000 cas d’équipement et 6 000 cas de ciblage de monstre par famille ; mutation en place, première ligne d’effet, ordre et limites. Tests des cibles d’invocations, du mode sans animations, de Corbeau, de la sélection de trois options et des invalidations du cache. L’assistance réutilise les distances et l’ordre des candidats entre les sorts ; comparaison de 800 situations avec la version précédente : même sort, même cible et même score. Ces tests et la compilation ne constituent pas une mesure de FPS en combat sur le Thor.

## Mesures sur le Thor — 13 octobre 2026

Installation de diagnostic autorisée, puis APK normale réinstallée : version 1.21.7, code 48, sans mode de débogage. Le module chargé correspond au hash ci-dessus. Trois choix graphiques et sélection conservée de « Sans animations de sorts » vérifiés sur l’écran inférieur.

Partie normale Osamodas : échantillon de 30 secondes incluant des choix d’amélioration, 1 453 intervalles de combat actif mesurés, jusqu’à 10 monstres et 2 invocations. Moyenne 59,85 FPS ; intervalle p95 17,00 ms ; aucune image de plus de 25 ms dans cet échantillon. Cela ne valide pas une vague avancée.

Rendu seul sur copie en mémoire : 160 monstres, 24 invocations, 48 effets, 12 secondes par réglage. Sans animations : 59,87 FPS, dessin moyen 6,15 ms ; Fluidité : 59,86 FPS ; Qualité complète : 59,44 FPS. Simulation arrêtée dans ce test : ces nombres ne prouvent pas les performances d’un combat avec cette population.

Simulation et rendu sur copie détachée : 160 monstres regroupés, 24 invocations, 15 secondes. Moyenne 49,32 FPS ; intervalle p95 33,56 ms ; calcul moyen 10,00 ms (p95 22,10 ms), dessin moyen 7,54 ms. Population et PV maintenus pour la durée du test, callbacks d’interface et audio neutralisés, observateurs de progression non enregistrés sur cette copie. Cette charge artificielle ne reproduit pas une vraie vague 60 ; elle montre que les calculs peuvent encore dépasser le budget d’une image à 60 FPS.

La vraie partie est restée en pause pendant les tests de copies. Comparaison de son état et de la progression persistée avant/après : inchangés. Seule la date de l’enregistrement automatique de la vraie partie a changé. Les copies n’ont pas été appliquées à la sauvegarde.

Après installation de l’APK normale, menu affiché et reprise proposée pour la partie normale de test (vague 3, niveau 6). La partie antérieure à la mise à jour n’était pas proposée à la reprise. Aucun maintien de 60 FPS constants dans toutes les scènes n’est affirmé.
