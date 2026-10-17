# Validation 1.23.0

Révision officielle auditée : `page-btswtYY6.js`, SHA-256 `707fcdf646b13f086b261af84039a2bf517a1f656352b8a18e13ef19b2b7518b` ; moteur `discord-identity-CHytj1vJ.js`, SHA-256 `147bdcf4f603c279dbd38995aa3a4b137e592d3f2f6cd6d49c82d57db6156f6c`.

Le code officiel rend les fenêtres du multijoueur avec `levelup-docked` et `aria-modal=false`. Les choix du solo restent modaux. L’application ne modifie ni cette distinction ni les messages réseau du jeu. La navigation sépare désormais la disponibilité d’une fenêtre de la prise de sélection par la croix. Les axes du joystick gauche et les axes HAT sont transmis séparément par Android.

Tests JavaScript : fenêtres non bloquantes initialement sans sélection, entrée par croix, A pour confirmer, retour au combat par les deux sticks, maintien d’un ancien mouvement, répétitions HAT, annulation d’un sort maintenu, protection contre un clic au curseur quand A est vide ou le choix indisponible. Navigation et retour aux offres du marchand conservés. La vraie pause et les menus bloquants restent navigables avec un stick.

Modules ES officiels exécutés avec leurs vraies dépendances dans une VM Node sans accès réseau : 25 combinaisons classe/carte, aperçus et dispatcher Brokle sur les cinq cartes. Vérification des ancres uniques de transformation ; les points de rendu conservent leur repli natif. Le catalogue contient 65 sorts et 225 objets. Ces tests ne sont pas une session multijoueur avec un partenaire et ne mesurent pas les FPS.

Thor : installation Android par-dessus 1.22.0, sans réinitialisation. Reprise de la partie solo proposée. Choix du niveau 5 parcourus à la croix et Brokle débloqué avec A ; axes du joystick reçus par le code Android. Le solo conserve sa pause lors des choix. Une vraie partie multijoueur avec un second joueur reste à valider ; les scénarios de bascule sont couverts localement.
