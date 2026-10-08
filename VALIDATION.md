# Vérifications

Vérifications effectuées le 8 octobre 2026 sur un AYN Thor connecté, Android 13.

## Version 1.7.0

- APK signé 1.7.0 installé en remplacement sans désinstallation ; version 8 / 1.7.0 et débogage désactivé vérifiés. Scripts embarqués comparés exactement aux sources vérifiées.
- En partie active pendant cinq secondes : 592 callbacks d’animation du navigateur, soit 118,36 par seconde sur le Thor ; intervalle maximum 16,67 ms, toutes les observations en phase-playing. Ce relevé ponctuel concerne l’animation de la WebView, pas un compteur interne des FPS du jeu ni un essai prolongé de toutes les situations.

- Langue changée par les vrais boutons du jeu : anglais, espagnol puis français. Titres, contrôles, réglages et boutons du dialogue Android relevés sur le Thor dans les trois langues. Même essai depuis la pause pour la fiche réelle du second écran : titres, caractéristiques et valeurs numériques conservées, dont +15 % de dommages d’attaque. Retour au français à la fin.
- Suite langue/panneau : synchronisation initiale, FR/EN/ES, langue invalide ignorée et mises à jour incrémentales. Suite observateur : valeurs de caractéristiques anglaises/espagnoles, expiration du cache et lecture immédiate au lancement couverts.
- Mesure ponctuelle sur Thor : 100 lectures forcées des améliorations prennent 2,5 ms ; 100 lectures en cache sont en dessous de la résolution du chronomètre. Une autre mesure donne 20 snapshots en 2,1 ms. Ce sont des coûts de fonctions, pas une comparaison des FPS avant/après ni une garantie de performance dans toutes les scènes. Le relevé d’animation à 118,8 images/s a été pris pendant une transition de sélection de niveau et n’est donc pas présenté comme une validation du gameplay en combat.
- Désactivation de la fiche dans les paramètres : sa WebView disparaît alors que celle du jeu reste présente ; réactivation vérifiée. Second écran compatible détecté affiché dans les paramètres.

- Six suites Node réussies, dont la navigation : pressions distinctes, répétition temporisée, boucle entre boutons, choix désactivés ignorés, changement de phase, sélection périmée rejetée et validation unique. Les quatre suites précédentes restent réussies.
- Sur le Thor, croix droite injectée via Android : JOUER sélectionné à l’accueil, puis R3 ouvre le choix de niveau. Sélection de JOUER et lancement de partie par R3 observés après la transition du jeu.
- Choix d’amélioration débloqué naturellement : droite sélectionne Science du Bâton, droite passe aux dommages d’attaque, gauche retrouve Science du Bâton. R3 ferme le choix et reprend la partie. Capture réelle ajoutée au README. Aucun état de jeu modifié pour forcer le niveau ou les choix.
- Pause réelle ouverte avec Start injecté via Android ; manette interne « Odin Controller » détectée et affichée dans les paramètres. Le stick est vérifié par le même pont que la boucle native et par les tests automatisés ; les pressions sur la croix et R3 sont des événements Android injectés.
- Les fenêtres avec saisie de texte et les sélecteurs non constitués de boutons peuvent encore nécessiter le tactile ou le pointeur.
- Une manette Xbox/Switch externe, son appairage Bluetooth, sa déconnexion physique et un autre appareil Android n’ont pas été essayés. Leurs chemins d’entrée sont compilés et comparés aux API Android, sans prétendre à une validation matérielle. Le retrait physique d’un second écran n’a pas été essayé.

## Version 1.6.0

- Quatre suites Node réussies. Direction, distance réglable et conservée au retour au centre, seuil tactile minimal, évolution dynamique de portée de Couper, destination imposée du Double, attaques directionnelles sans faux rayon et exception du Glyphe enflammé instantané couverts.
- Portées comparées aux fonctions du jeu actuel. Téléportation, Bond, Retour du Bâton et Couper lisent leurs améliorations à chaque image ; la taille des zones de glyphes reste distincte de leur portée de placement fixe de 200 unités.
- Glyphe d’immobilisation débloqué normalement sur le Thor. Maintien de la touche du sort et déplacement injectés par Android ; direction et inclinaison envoyées au pont du stick droit. Aucun déblocage ou déplacement forcé par écriture dans l’état du jeu.
- Guide observé à la position du personnage pendant son déplacement. Inclinaison à mi-course utile : vecteur (0 ; -53,522) pixels CSS. Stick à fond : (0 ; -107,045). Retour au centre : direction et distance conservées. Relâchement d’une autre touche : maintien conservé. Relâchement de la touche du sort : récupération réelle démarrée, guide et rayon supprimés, pointeur réaffiché.
- Nouveau réglage affiché sur l’appareil, désactivation/réactivation au toucher et stockage de la préférence activée vérifiés. Sensibilité existante à 200 % et opacité à 45 % conservées.
- APK signé 1.6.0 installé en remplacement sans désinstallation. Version 7 / 1.6.0, débogage désactivé et préférence radiale activée après mise à jour vérifiés.
- Capture réelle du placement ajoutée au README. Les améliorations de portée et les autres classes sont vérifiées par tests automatisés et lecture des fonctions du jeu, pas toutes essayées en partie. Les sticks physiques ensemble restent à essayer manuellement.

## Version 1.5.0

- Quatre suites Node réussies : visée radiale, suivi de visée au pointeur, attribution des sorts et observateur. Direction du stick gauche, orientation à l’arrêt, suivi du personnage, direction directe du stick droit, conservation au retour au centre, portée de Bond améliorée et doublée, destination de retour imposée et restauration du pointeur couverts.
- Types et portées comparés aux fonctions du jeu : Téléportation (`dash`), Bond (`jump`) ; Double du Sram conserve son échange avec un double existant plutôt qu’une destination libre.
- Téléportation débloquée normalement dans une partie réelle sur le Thor, attribuée à R1. R1 et croix droite injectés via Android : vecteur initial de visée (80,409 ; 0) pixels CSS, conservé pendant le déplacement du personnage ; rayon et destination suivent sa position.
- Direction haute envoyée au même pont que le stick droit : vecteur (0 ; -80,283). Retour au centre du stick : direction haute conservée. Curseur habituel masqué pendant le maintien ; rayon visible. Relâchement de R1 : déplacement réel du personnage, récupération du sort démarrée, rayon supprimé et curseur réaffiché.
- Capture réelle ajoutée au README. Les déblocages et déplacements n’ont pas été forcés par écriture dans l’état du jeu.
- APK signé 1.5.0 installé en remplacement sur le Thor, sans désinstallation ; numéro de version et débogage désactivé vérifiés, accueil du jeu observé après lancement.
- Bond et l’évolution de retour sont couverts par les tests automatisés et la comparaison aux fonctions du jeu ; ils n’ont pas été essayés en partie. L’essai manuel des sticks et gâchettes physiques ensemble reste à faire. Le rayon représente la portée du sort ; la position d’arrivée effective reste décidée par le jeu selon le terrain.

## Version 1.4.0

- Tests Node de la visée, des affectations et de l’observateur réussis. Visée depuis une position différente de l’icône, déplacement du personnage avec cible fixe, actualisation entre deux images au relâchement, annulation si la position devient indisponible, coordonnées avec mise à l’échelle du canvas et remplacement du modèle de partie couverts.
- Partie réelle sur Thor, Glyphe d’immobilisation débloqué normalement. L1 et croix droite maintenus par injection Android ; pointeur déplacé par le pont utilisé par le stick droit.
- Position initiale du personnage lue à (410,708 ; 312,861), puis à (414,489 ; 312,662), en pixels CSS. Départ du guide observé aux mêmes coordonnées. Cible immobile à (249,9 ; 211,05) ; le vecteur de visée lu dans le jeu correspond exactement à cible moins position actuelle du personnage dans les deux relevés.
- Relâchement de L1 : guide supprimé et récupération du glyphe commencée. Aucun état de jeu modifié pour forcer les déblocages ou la position.
- Réglage de sensibilité affiché sur l’appareil, extrêmes 25 % et 250 % sélectionnés au toucher ; stockage Android vérifié. Retour à 100 % et réouverture du menu vérifiés.
- APK signé 1.4.0 installé en remplacement sans désinstallation. Version installée vérifiée, débogage désactivé, réglage 100 % conservé après mise à jour et observé dans les paramètres de cet APK.
- Les essais utilisent des commandes Android injectées et le pont du pointeur. Un essai manuel combinant les deux sticks et toutes les gâchettes physiques reste nécessaire pour valider le confort ; tous les sorts et toutes les situations de déplacement n’ont pas été essayés.

## Version 1.3.0

- Tests Node du routage des sorts et de l’observateur réussis ; compilation et signature vérifiées.
- Classification comparée au gestionnaire tactile du site en ligne : 14 types de sorts à viser, avec exception du Glyphe enflammé à l’évolution 2. Aucune modification de l’état du jeu pour ces vérifications.
- Sur le Thor, Glyphe d’immobilisation débloqué normalement et attribué à L1 ; Bouclier Féca attribué à X.
- Sur une autre partie, Glyphe enflammé débloqué normalement : maintien de L1 injecté via Android, déplacement du pointeur par le même pont JavaScript que le stick droit. Guide de visée réellement affiché. Relâchement d’un autre bouton : guide conservé. Relâchement de L1 : guide disparu et récupération du glyphe démarrée (`aria-disabled=true`).
- Les tests automatisés couvrent aussi le lancement instantané sans terminer une visée maintenue et l’annulation sans lancement lors de la perte de focus.
- APK signé 1.3.0 installé en remplacement sur le Thor, sans désinstallation ; lancement du jeu sur l’écran supérieur et fiche de personnage sur l’écran inférieur observés. Le débogage WebView est désactivé dans cet APK publié.
- La visée a été observée dans le jeu réel avec une commande Android injectée. Un essai manuel des gâchettes et du stick droit physiques ensemble reste à faire ; toutes les classes et évolutions n’ont pas été testées en partie.

## Version 1.2.0

- Compilation, signature APK et syntaxe JavaScript vérifiées ; contrat de l’observateur validé avec `node tests/telemetry.test.js`.
- Le test de l’observateur couvre la branche React montée, les totaux avec bonus, plusieurs anneaux, l’absence de statistiques, les valeurs invalides et l’absence d’écriture dans l’état du jeu. Il reste distinct des essais sur appareil.
- Panneau réellement affiché sur l’écran inférieur du Thor, pendant que le site officiel s’exécute sur l’écran supérieur.
- Lecture de 5/5 PV, puis actualisation après dégât à 4/5 PV, observée pendant une partie d’essai.
- Ceinture du Piou Jaune obtenue en partie : nom, icône et effet +15 % de vitesse d’attaque lus depuis le jeu ; total +15 % et bonus d’équipement +15 % vérifiés face aux caractéristiques du menu pause.
- Amélioration de vitesse d’attaque choisie en partie : +15 % affiché avec bonus d’équipement vide, ce qui distingue l’amélioration du personnage du bonus d’un objet.
- Kamas : compteur réel observé à 0, puis à 100 pendant la partie sur la version signée ; capture du panneau avec 100 kamas.
- Version signée : Chapeau du Piou Jaune affiché avec icône et bonus ; appui tactile sur l’objet puis défilement de la colonne pour lire son effet +15 % de vitesse d’attaque.
- Pause affichée sur la fiche ; suppression puis recréation du panneau vérifiées avec le réglage de deuxième écran.
- Après un appui tactile sur l’écran inférieur, Start injecté via Android continue à commander la pause du jeu sur l’écran supérieur.
- Version signée 1.2.0 installée sur le Thor ; captures du panneau issues de cet APK sans débogage.

La lecture s’appuie sur l’état et le HUD actuellement exposés par le site. Une évolution de leur structure peut rendre le panneau indisponible. Le cycle de déconnexion physique d’un écran et les autres appareils Android n’ont pas été testés.

## Version 1.1.0

- Compilation Java et vérification de syntaxe JavaScript réussies.
- Construction et signature APK vérifiées.
- Interface Android tactile conservée : pointeur tactile, joystick et sorts visibles pendant la partie.
- Déplacement par une commande de croix injectée via Android, avec le joystick visuel observé dans le coin inférieur gauche.
- Un sort débloqué affiche la touche **X** ; aucun repère de bouton n’est ajouté aux emplacements inexistants.
- Désactivation des étiquettes vérifiée sur un sort débloqué ; opacité à 30 % puis à 45 % vérifiée.
- Préférences enregistrées dans Android : affichage des étiquettes et valeur d’opacité.
- Étiquette réaffichée après fermeture puis reprise du menu pause.
- Menu de paramètres observé sur le Thor et accessible avec Select.
- Bouton **⚙ Thor** vérifié par un appui tactile ; les paramètres s’ouvrent et affichent les préférences enregistrées après mise à jour.
- Ouverture des paramètres en partie : pause activée automatiquement ; fermeture : reprise vérifiée. Une pause déjà ouverte est conservée.

## Contrôles de base

- Lancement depuis le menu Cocoon observé.
- R3 injecté via Android produit un clic tactile natif reconnu par le navigateur et valide un choix de niveau.
- Croix droite injectée via Android : déplacement réel de x=750 à x=815.869, y stable.
- Mouvements du stick droit physique reçus et pointeur doré visible.
- Pause via Start vérifiée en partie.

Ces vérifications ne remplacent pas un test manuel complet des boutons physiques, de tous les sorts, de leurs directions de visée et d’une session longue. Les autres appareils Android n’ont pas été testés.
