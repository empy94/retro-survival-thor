# Validation 1.21.7

Module officiel vérifié le 13 octobre 2026 : `page-D-GPJLS2.js`, SHA-256 `c3f2557230b1ea96cf1e33d0730864d48a31efa1367bc135e95b605724ec3149`. Adaptateurs précédents conservés. Toute version inconnue ou ancre absente/dupliquée conserve le comportement de repli sans adaptation.

L’analyse syntaxique distingue les fonctions officielles conservées des trois définitions transformées : boucle du canvas, renderer et exclusion des paires distantes. Le nouveau paramètre de coloration du sprite est conservé pour les acteurs, afin de garder le signal rose de charge. Le nouveau prédicat de visibilité des invocations reste l’autorité pour les cibles des monstres.

Cache d’équipement : seuls les indices des effets du catalogue fixe sont mémorisés ; identifiant, jets et état radiant restent lus à chaque appel. Addition dans le même ordre que la version native, sans liste intermédiaire. Recherche des cibles : mêmes priorités, limites et égalités ; passage direct dans la liste vivante avec exclusion conservative des candidats trop éloignés.

Fond de carte : une surface à la définition du canvas est préparée puis réutilisée, avec invalidation sur l’image, sa source, ses dimensions ou celles du rendu. Allocation bornée, repli sur le dessin original si le cache ne peut pas être construit. Les avertissements dynamiques restent dessinés après le fond.

Tests : comparaison avec les fonctions officielles sur 4 000 cas d’équipement et 6 000 cas de ciblage de monstre par famille ; mutation en place, première ligne d’effet, ordre et limites. Tests des cibles d’invocations, du mode sans animations, de Corbeau, de la sélection de trois options et des invalidations du cache. L’assistance réutilise les distances et l’ordre des candidats entre les sorts ; comparaison de 800 situations avec la version précédente : même sort, même cible et même score. Ces tests et la compilation ne constituent pas une mesure de FPS en combat sur le Thor.

Installation et mesure sur l’appareil en attente d’accord, car le combat est en pause. Aucun maintien de 60 FPS constants n’est affirmé.
