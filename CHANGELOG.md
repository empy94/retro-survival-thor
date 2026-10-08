# Versions

## 1.9.0 — 9 octobre 2026

- Pointeur masqué en combat et dans les choix/fenêtres parcourus au pad. Utiliser le stick droit révèle le pointeur dans les menus ; le pad et les changements de fenêtre le masquent. Exception pour la visée précise au pointeur ; le relâchement radial ne fait plus réapparaître le curseur en combat.
- Cœur de PV du second écran dans le style du jeu, remplissage vertical et valeurs actuelles/maximum, remplaçant la barre horizontale.
- Symbole des kamas identique au jeu, chargé depuis son site officiel.
- Alerte de PV faibles à 25 % ou moins dans la zone des PV existante, désactivable. Aucun compteur d’ennemis sur la fiche. Lecture seule à 2 Hz, sans commande automatique.
- Réglages FR/EN/ES ; tests du pointeur, du cœur et du seuil d’alerte.
- Une seule requête en attente par boucle de commandes/fiche, résultats périmés ignorés après navigation et fiches inchangées non renvoyées.

## 1.8.0 — 8 octobre 2026

- Présentation Android et manettes USB/Bluetooth, commandes intégrées et double écran compatible ; téléchargement `Retro-Survival-Android.apk`. Identité de l’application et signature conservées pour les mises à jour.
- Collection permanente Dofawa/Cawotte sur deux cartes compactes, disponible même à l’accueil, bonus sauvegardé et versions rayonnantes. Aucun déblocage ni modification de sauvegarde.
- Jets mini/maxi normaux et rayonnants consultables sur les cartes Dofus et dans le détail de Kritter/Casque du Chafer.
- Dofus retirés des lignes d’équipement pour éviter la répétition ; équipements rayonnants distingués dans leur ligne. Collection mise en cache et blocs inchangés conservés.
- Documentation des règles actuelles de butin et permanence, capture réelle de la collection vide, FR/EN/ES.

## 1.7.0 — 8 octobre 2026

- Paramètres, aide, indications de visée et fiche du personnage en français, anglais ou espagnol selon la langue choisie dans le jeu.
- Lectures de repères mises en cache avec actualisation immédiate au lancement ; décorations regroupées, navigation au repos allégée et panneau actualisé sans reconstruire les blocs inchangés.
- Captures radiales mises en avant dans le README.

- Navigation entre les boutons des menus et choix au stick gauche ou à la croix : contour doré, répétition temporisée, validation R3/A et retour au pointeur avec le stick droit.
- Prise en compte directe des pressions brèves sur la croix.
- Détection des manettes Android USB/Bluetooth, nom dans les paramètres et annulation des commandes lors d’une déconnexion.
- Zones mortes déclarées par la manette, axes du stick droit Z/RZ ou RX/RY et gâchettes analogiques ; aucun matériel AYN ni second écran exigé.
- Présence du second écran compatible indiquée dans les paramètres ; fiche utilisée après détection Android.

## 1.6.0 — 8 octobre 2026

- Visée radiale étendue aux sorts dirigés et aux sorts à placer : glyphes, pièges, invocation du Double, attaques ciblées.
- Pour les sorts à placer, le stick droit règle direction et distance selon son inclinaison ; la cible choisie est conservée au retour au centre et suit le personnage.
- Portée actualisée depuis les améliorations de la partie, notamment Retour du Bâton et Couper ; portée de placement fixe des glyphes respectée, distincte de leur taille.
- Les attaques purement directionnelles gardent un guide de direction sans rayon de portée fictif. Les échanges avec un Double existant gardent leur destination imposée.
- Réglage mémorisé **Visée radiale des sorts à cibler**, activé par défaut ; le désactiver rétablit le pointeur pour ces sorts. Téléportation et Bond gardent leur mode radial.

## 1.5.0 — 8 octobre 2026

- Visée radiale dédiée à Téléportation (Féca) et Bond (Iop), identifiés automatiquement parmi les sorts débloqués.
- Direction initiale donnée par le stick gauche, ou l’orientation du personnage à l’arrêt ; le stick droit choisit ensuite directement une direction, conservée lorsqu’il revient au centre.
- Rayon de portée centré sur le personnage, actualisé pendant son déplacement, avec améliorations et évolutions de portée prises en compte.
- Curseur de souris masqué pendant cette visée et conservé à sa position précédente pour les menus et les autres sorts.
- L’évolution de Téléportation qui ramène au point de départ affiche cette destination imposée ; pas de direction trompeuse.

## 1.4.0 — 8 octobre 2026

- Correction de la visée : la direction est calculée depuis le personnage, et non depuis l’icône du sort.
- Départ de la trajectoire actualisé à chaque image pendant le maintien, même lorsque seul le personnage se déplace ; la cible choisie reste fixe à l’écran.
- Position du personnage recalculée également au relâchement, sans modifier l’état du jeu.
- Sensibilité du curseur réglable de 25 % à 250 % dans les paramètres, enregistrée entre les sessions ; 100 % par défaut.
- Paramètres défilables pour garder tous les réglages accessibles.
- Captures réelles de la visée et du réglage de sensibilité ajoutées à la galerie.

## 1.3.0 — 8 octobre 2026

- Attribution automatique de L1/R1/L2/R2 en priorité aux sorts à viser ; X/Y en priorité aux sorts instantanés.
- Identification par les identifiants du jeu, indépendante de la langue ; prise en compte de l’évolution instantanée du Glyphe enflammé.
- Repères des touches mis à jour après le déblocage des sorts.
- Une visée maintenue n’est plus terminée par le relâchement d’un autre bouton ; un sort instantané peut être lancé pendant la visée.
- Annulation de la visée lors de la perte de focus ou de l’ouverture des paramètres.
- Aide des commandes et tests de routage mis à jour.

## 1.2.0 — 8 octobre 2026

- Fiche de personnage sur le deuxième écran : PV, kamas, niveau, vague et 13 caractéristiques.
- Équipement porté avec icônes, noms et effets consultables au toucher.
- Style repris du menu de caractéristiques du jeu : parchemin, en-tête brun et accents dorés.
- Lecture des informations de la partie sans modification du jeu ; actualisation deux fois par seconde.
- Activation configurable dans les paramètres, conservée après fermeture et mise à jour.
- Jeu utilisable sur un seul écran si aucun écran secondaire compatible n’est disponible.
- Captures réelles du panneau ajoutées au README.

## 1.1.0 — 8 octobre 2026

- Joystick visuel du stick gauche déplacé dans le coin inférieur gauche.
- Étiquettes des boutons physiques sur les sorts actifs débloqués.
- Menu **Paramètres AYN Thor**, accessible avec **Select** ou **⚙ Thor**.
- Affichage des étiquettes et du joystick configurable, opacité des étiquettes de 15 % à 85 %.
- Préférences persistantes et pause automatique pendant les paramètres.
- Sources et APK disponibles pour la communauté.

## 1.0 — 8 octobre 2026

- Lanceur du jeu en interface Android tactile.
- Déplacement avec stick gauche ou croix.
- Pointeur au stick droit et clic R3/A.
- Sorts actifs sur X/Y/L1/R1/L2/R2 et pause Start/B.
