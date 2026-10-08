# Objets rares, collection et jets

Vérification du jeu officiel le **8 octobre 2026**. Ces règles peuvent évoluer avec le site ; l’APK les observe sans modifier les sauvegardes ou débloquer des objets.

## Ce qui reste après une partie

Deux objets sont enregistrés dans la collection permanente : **Dofawa**, associé à Astrub, et **Dofus Cawotte**, associé à l’île Wabbit. Les versions rayonnantes sont conservées. Pour le Cawotte, le jeu mémorise le meilleur jet obtenu et accepté : vendre une nouvelle récompense ne remplace pas le jet conservé.

Au lancement d’une nouvelle partie, le jeu crée un équipement vide puis rééquipe les Dofus enregistrés. Les autres équipements sont propres à la partie. Aucun Dofus permanent de Litneg n’est défini dans cette version du jeu. On ne peut donc pas affirmer qu’un Dofus différent tombe dans chaque niveau.

Le Dofawa figure dans les butins du Bouftou Royal. Le Cawotte apparaît dans la salle de récompense Wabbit après le combat prévu dans cette salle. Kritter et Casque du Chafer figurent dans les butins de Kruorre ; ce sont des équipements rares, pas des objets permanents.

## Jets vérifiés

| Objet | Effet | Mini normal | Maxi normal | Rayonnant |
|---|---|---:|---:|---:|
| Dofawa | PV maximum | +1 | +1 | +2 |
| Dofus Cawotte | XP reçue | +6 % | +50 % | +75 % |
| Kritter | Chance de critique | +25 % | +40 % | +60 % |
| Casque du Chafer | Dommages | +50 % | +90 % | +135 % |
| Casque du Chafer | Dommages des sorts | +50 % | +90 % | +135 % |
| Casque du Chafer | Dommages d’attaque | +50 % | +90 % | +135 % |

Un jet normal est un entier entre les bornes incluses. Le rayonnant utilise le maximum multiplié par 1,5, arrondi au supérieur : il dépasse donc volontairement le maximum normal. Ce tableau décrit les bonus de l’objet, pas les valeurs finales du personnage après toutes les autres améliorations.

## Sur le second écran

La collection occupe deux petites cartes. Toucher une carte ouvre les bornes et, si obtenu, le bonus sauvegardé ; toucher à nouveau replie le détail. Toucher Kritter ou Casque du Chafer équipé ouvre leurs effets et bornes dans le détail d’équipement existant. Les autres équipements gardent leurs effets disponibles sans inventer de bornes inconnues. Les Dofus ne sont pas répétés dans la colonne d’équipement.

La fiche distingue une collection vide d’une sauvegarde inaccessible. Le Thor utilisé pour les captures possède **0/2 objets** : les images ne simulent aucun objet débloqué. Les cas possédés/rayonnants sont couverts par des tests isolés, pas par un drop obtenu sur cet appareil.

## Sources et méthode

- [Jeu officiel](https://retrosurvival.online/).
- [Module officiel audité](https://retrosurvival.online/_next/static/chunks/page-BH_6_gjC.js), chargé par le site à cette date. Le nom du module peut changer après une mise à jour.
- Métadonnées `Bc`, liste `zc`, catalogue `il`, fonctions de jets `fl`/`pl`/`ml`, équipement initial `r_`, traitement `rememberDofus` et sauvegarde `retro-survival.progress.v1` comparés.

L’application embarque seulement ses métadonnées de ces quatre objets, ses commandes et sa fiche. Elle charge le jeu officiel en ligne et ne redistribue pas son code ni ses ressources.
