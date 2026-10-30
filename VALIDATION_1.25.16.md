# Collection complète et contrôle graphique — 1.25.16

30 octobre 2026. La version précédente avait bien adapté le jeu courant, mais le second écran conservait une liste de six Dofus. Le Vinaigrette de Moon est maintenant présent, avec son icône officielle, sa propriété permanente, son jet de prospection de 6 à 30 et son maximum rayonnant de 45. Les sept icônes sont actualisées. Le catalogue et les bornes des objets reprennent désormais les données natives disponibles ; leur chargement invalide le cache d’affichage même si la sauvegarde n’a pas changé. Un futur objet dépourvu de correspondance de jet est affiché sans inventer son bonus.

L’observateur reste en lecture seule. Vérification réelle sur les deux WebView du Thor : sept entrées dans les données du jeu et compteur `6 / 7` sur le second écran, avec l’image Vinaigrette dans la liste. Les accents français ont été contrôlés. Les tests couvrent les valeurs normales/rayonnantes, les sauvegardes invalides et le chargement tardif du catalogue.

La comparaison du cache avec les fonctions du jeu actuel a identifié une exception native pour le chapeau Sram : le bonus de taille des pièges reste fixé à 50. Cette exception est conservée dans le profil courant, sans allocation par appel. Les comparaisons des objets actuels et des jets modifiés passent, ainsi que les tests des profils antérieurs.

Les trois réglages graphiques conservent leur comportement. Sur le Thor, une scène indépendante a dessiné les vrais sprites de 150 monstres et 400 particules, pendant 8 secondes par réglage :

| Réglage | Cadence mesurée | Dessin, percentile 95 |
| --- | ---: | ---: |
| Complet | 59,10 images/s | 6,2 ms |
| Équilibré | 59,35 images/s | 5,0 ms |
| Sans animations de sorts | 59,85 images/s | 5,1 ms |

Ces mesures portent sur le rendu, avec une scène construite séparément de la partie et sans écriture de sauvegarde. Elles ne comprennent pas une simulation complète de combat, la navigation des monstres ou une garantie de 60 FPS à toutes les vagues. Les tests du profil oct30 vérifient aussi l’adaptation de résolution, le budget en pause, les avertissements et la visibilité des créatures de Moon et des poupées Sadida.

APK normale installée après retrait de la version de diagnostic : 1.25.16/code 74, empreinte SHA-256 `a502c25ded84274b9f33b0d2480f5e1437642c81ee4efcd77f03a07f929a1b34`. Empreinte sur appareil identique, identité Android conservée, débogage désactivé, aucune suppression des données. Le jeu a été rouvert au menu.
