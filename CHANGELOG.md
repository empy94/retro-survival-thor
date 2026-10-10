## 1.20.1 — dernière révision du 10 octobre 2026

- Prise en charge de `page-DrMYqWc7.js` ; adaptations des commandes, visée Enutrof et cache d’animations actualisées.
- Conservation des adaptations du moteur local précédent, sans remplacement de sa copie figée ni transfert de progression.
- Vente automatique : les objets volés restent exclus, conformément à leur nouvelle valeur native nulle.

## 1.20.0 — sessions locales isolées — 10 octobre 2026

- L’extension personnelle peut relancer une session locale distincte : cache des fichiers publics, origine et sauvegarde séparées, réseau du jeu bloqué. Retour au jeu en ligne sans transfert de progression locale.
- Les scripts privés et les adaptations importées restent réservés au mode local. Un export local ne peut pas être importé dans la sauvegarde en ligne.
- Compatibilité avec `page-CDA_LRxd.js` et les deux révisions intermédiaires conservées.

## 1.19.1 — dernière révision et écran de connexion

- Compatibilité avec `page-CMBWUFaS.js`, adaptations de statistiques, équipement et vente actualisées ; révisions précédentes conservées.
- Écran de chargement visible dès l’ouverture. Connexion expirée, réponse HTTP refusée ou moteur indisponible : explication, bouton Réessayer et accès aux réglages Wi-Fi au lieu d’un écran blanc.
- La progression reste intacte lors des réessais.

## 1.19.0 — mises à jour locales des modules

- Prise en charge des fichiers de compatibilité importés par une extension de même signature : signature du fichier contrôlée également par l’application principale, scripts bornés et adaptation limitée au SHA-256 exact du module officiel.
- Retour aux adaptations intégrées si le fichier local est absent ou invalide. Les sauvegardes ne sont pas modifiées.

## 1.18.1 — compatibilité avec la dernière mise à jour

- Adaptations actualisées pour `page-CsVXhSaF.js`, statistiques et commandes privées incluses.
- Conservation des quatre révisions précédentes avec leurs propres adaptations.
- Vente automatique : conservation du nouveau placement natif des objets sur le terrain.

## 1.18.0 — Brokle à la manette

- Brokle utilise désormais le lancement natif au relâchement pour toutes ses évolutions. Sans Saut Dirigé, il reste centré sur le personnage ; avec Saut Dirigé, la visée conserve la portée de 220.
- Même correction pour l’assistance automatique ; indication « Relâcher pour lancer » lorsque Brokle frappe sur place.
- Contrôle des modes de lancement des 51 sorts et de leurs évolutions, dont le Glyphe Enflammé instantané après son évolution.
- Prise en charge de la nouvelle révision officielle et adaptation séparée de ses symboles, avec conservation des trois révisions précédentes auditées.

## 1.17.2 — dernière révision officielle

- Prise en charge de `page-BNONV-CU.js`, révision supplémentaire publiée pendant l’installation. Les 67 fonctions des adaptations sont toujours identiques.
- APK finale installée sur Thor avec extension 1.1.2 ; commandes Cheats actives sur la révision actuelle.

## 1.17.1 — rétablissement de l’extension Cheats

- Reconnaissance de la révision officielle `page-CMqUxGM4.js`, publiée après la 1.17.0. Les 67 fonctions nécessaires aux adaptations sont identiques à la version précédente.
- Acceptation des deux révisions auditées et de leur déclaration de compatibilité par l’extension, pour rétablir notamment les améliorations de statistiques +1/+5.
- Compatibilité des sauvegardes de combat entre ces deux révisions conservée, sans effacement.

## 1.17.0 — contenu du 9 octobre 2026

- Adaptation au nouveau moteur officiel, avec contrôle de version partagé entre l’application et l’extension.
- Enutrof/Sufokia, 51 sorts, 186 équipements et quatre Dofus dans les listes et l’écran secondaire.
- Nouveaux sorts Iop/Sram, sorts devenant passifs après évolution, visée d’Arnaque/Brokle et portées natives de Bond/Téléportation.
- Accents français corrigés dans les noms, effets et collection ; contrôle d’encodage ajouté aux tests.
- Icônes des exemplaires d’équipement distinguées par leurs jets. La vente facultative conserve les règles natives de la nouvelle version.

## 1.16.0 — équipement et alertes de mise à jour

- Icônes, noms et effets d’équipement lus à partir de l’identité réelle des objets dans le HUD, indépendamment du nom des images. Titre de colonne conservé pendant le défilement.
- B réservé aux sorts, sans pause automatique lorsqu’il est libre ou dans les menus. Start conserve la pause.
- Vérification de la dernière APK stable au lancement, bouton manuel et contrôle quotidien Android. Notifications activables, téléchargement volontaire et installation confirmée par Android.

# Versions

## 1.15.2 — 9 octobre 2026

- Classement : accès, démarrage des sessions et envoi des résultats rétablis, avec leurs validations originales côté serveur.

## 1.15.1 — 9 octobre 2026

- Sauvegarde en ligne : correction du filtrage réseau qui pouvait empêcher la synchronisation et la génération du code de récupération dans le menu nuage.
- Portée de Téléportation vérifiée : cercle et destination recalculés avec les améliorations, y compris pendant le maintien de la touche.

## 1.15.0 — 9 octobre 2026

- Vente automatique sécurisée, facultative : même objet équipé, tous les effets égaux ou inférieurs. Nouveaux objets, meilleur effet, rayonnants et objets permanents protégés.
- Export/import de progression au format JSON depuis les paramètres, avec le sélecteur Android. Cartes débloquées, records et collection permanente ; ne sauvegarde pas le combat en cours.
- Nouveaux réglages traduits en français, anglais et espagnol.

## 1.13.2 — 9 octobre 2026

- Cible Android 15 (API 35) : correction de la cause de l’alerte Play Protect « ancienne version d’Android » sur Android 16.
- Nouvelle icône : bouclier, épée et flamme, palette verte, parchemin et or.
- Marges adaptées aux barres système et encoches sur Android 15+.

## 1.13.1 — 9 octobre 2026

- Fermeture sur le second écran corrigée : les listes de raccourcis et d’assistance s’ouvrent directement dans la page, sans fenêtre native Android. Choix, fermeture et sauvegarde conservés.

## 1.13.0 — 9 octobre 2026

- Croix/stick dans les comparaisons de butin : actions du dialogue externe, sans blocage dans la carte de l’objet déjà équipé.
- Boutique : offre consultée conservée après A ; directions depuis sa position, retour conservé après un dialogue de confirmation.
- Huit touches directes, puis seize combinaisons : les sorts supplémentaires, dont Libération, gardent un accès manette. A/B lancent les sorts en combat ; A valide les menus et Start garde la pause.
- Raccourcis personnalisables et sauvegardés par classe depuis les paramètres ou chaque icône du second écran. FR/EN/ES.
- Combinaisons : annulation de la visée du modificateur, aucun double lancer, relâchement du sort propriétaire ; assistance suspendue pendant une commande maintenue.

## 1.12.0 — 9 octobre 2026

- Second écran interactif : pages Personnage, Sorts et Options, par glissement horizontal ou onglets. Défilement vertical conservé pour les listes longues.
- Onglets Féca, Iop et Sram avec les icônes originales. Toucher un sort actif pour choisir Auto ou Manuel ; exceptions sauvegardées par classe, même pour un sort encore à débloquer.
- Auto respecte le mode global (désactivé, buffs seuls ou tous les sorts). Les automatismes d’origine du jeu sont identifiés et conservés. Une exception manuelle annule aussi un ciblage automatique déjà en préparation.
- Mode d’assistance, visée radiale, curseur, repères, joystick, alerte PV, sensibilité et opacité modifiables depuis le bas. Interface FR/EN/ES et mises à jour différentielles des listes.

## 1.11.1 — 9 octobre 2026

- Maintien L2/R2 corrigé : les mouvements des sticks ne relâchent plus une gâchette signalée comme bouton par Android. Retour du Bâton et les autres sorts à viser restent en visée jusqu’au vrai relâchement.
- Les manettes qui signalent les gâchettes comme boutons, axes ou les deux sont gérées sans double lancer. Les maintiens sont annulés lors d’une perte de focus ou d’une déconnexion.

## 1.11.0 — 9 octobre 2026

- Trois choix exclusifs : désactivée, buffs auto uniquement, tous les sorts intelligents. Ancien réglage conservé lors de la mise à jour.
- Buffs seuls : Bouclier, Vitesse, Science du Bâton, Puissance et Invisibilité dès disponibilité, même sans monstre. Aucun lancer offensif, placement ou déplacement ; effets actifs conservés.
- Mode buffs plus léger : aucune liste de monstres ou de pièges à lire ni cible à rechercher. Priorité manuelle et suspension en pause/menus/arrière-plan conservées.
- Sélecteur et indicateur FR/EN/ES. README raccourci, captures actuelles uniquement en présentation ; ancien contenu déplacé dans le guide détaillé.

## 1.10.0 — 9 octobre 2026

- Lancement intelligent facultatif des sorts actifs : buffs, attaques dirigées, placement sur les groupes, repoussement et déplacements de secours évalués. Les sorts passifs déjà automatiques restent gérés par le jeu.
- Respect des effets actifs et cooldowns ; tous les boutons de sort actifs accessibles, même après six raccourcis. Annulation lors d’une action manuelle, pause, menu, désactivation ou arrière-plan.
- Planification bornée à 80 ms, un toucher à viser à la fois, relances rejetées temporisées. Aucun état du jeu écrit.
- Réglage persistant et repère discret traduits FR/EN/ES ; présentation GitHub et captures actualisées.

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
