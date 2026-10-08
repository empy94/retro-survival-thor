# Retro Survival — Android & manettes

Application personnelle de lancement du site officiel https://retrosurvival.online/ en interface Android tactile. Connexion Internet nécessaire. Entrée ajoutée au menu principal de Cocoon le 8 octobre 2026.

| Commande | Action |
|---|---|
| Stick gauche ou croix | Déplacement par le joystick tactile du jeu |
| Stick droit | Déplacement du pointeur doré |
| R3 ou A | Appui tactile à la position du pointeur |
| L1, R1, L2, R2 | Priorité aux sorts à viser |
| X, Y | Priorité aux sorts instantanés ; les boutons libres accueillent les autres sorts |
| Bouton de sort maintenu + stick droit | Viser les sorts qui demandent une direction, puis relâcher |
| Start ou B | Pause / reprise |
| Select / bouton ⚙ APK | Paramètres des commandes et aide |

Le tactile reste disponible. Version 1.7.0 : parcourir les boutons avec le stick gauche ou la croix ; R3 ou A valide le contour doré. Le stick droit retrouve le pointeur. Les attaques automatiques du mode Android restent gérées par le jeu. Version 1.3.0 : les sorts à viser reçoivent en priorité L1/R1/L2/R2 ; maintenir, viser au stick droit, relâcher. Les repères sur les sorts donnent leur affectation actuelle, qui peut changer après un déblocage. Six sorts maximum sur les boutons ; les autres restent accessibles au tactile/pointeur. L’évolution instantanée du Glyphe enflammé est prise en compte.

Version 1.5.0 : **Téléportation du Féca** et **Bond du Iop** ont une visée radiale. Maintenir leur touche : destination devant le personnage, selon le stick gauche ou son orientation à l’arrêt. Le stick droit choisit directement une direction dans le rayon de portée ; elle reste choisie quand le stick revient au centre. Relâcher la touche du sort pour lancer à portée maximale. La destination suit le déplacement du personnage et le jeu gère les obstacles. L’évolution de Téléportation permettant un retour garde son point de départ imposé.

Version 1.6.0 : les sorts à cibler ou à placer utilisent également le mode radial par défaut. Maintenir leur touche, régler la direction au stick droit et, pour les placements, la distance avec l’inclinaison du stick. Relâcher la touche pour lancer. La cible choisie suit le personnage et reste choisie lorsque le stick revient au centre. Les améliorations de portée sont prises en compte ; agrandir la zone d’un glyphe ne change pas sa portée de placement.

Le pointeur est masqué pendant la visée radiale et retrouve sa position précédente ensuite. **Select / ⚙ APK → Visée radiale des sorts à cibler** permet de retrouver la visée au pointeur pour ces sorts, tout en gardant le radial des téléportations. Dans **Sensibilité du curseur**, régler la vitesse du pointeur de 25 % à 250 % ; 100 % par défaut, réglages mémorisés.

Depuis la version 1.2.0 : fiche de personnage sur l’écran du bas, avec PV, kamas, caractéristiques et équipement porté. Toucher un objet puis faire défiler la colonne pour lire ses effets. Le panneau se désactive dans **Select / ⚙ APK → Personnage sur le second écran**.

Le joystick visuel est ancré en bas à gauche ; les étiquettes X/Y/L1/R1/L2/R2 sur les sorts actifs débloqués, leur affichage et leur opacité sont réglables dans les paramètres. Les réglages sont enregistrés. Voir également [README.md](README.md).

La sauvegarde locale de cette application est distincte de celle de Chrome. Les fichiers et sauvegardes Chrome existants ne sont pas modifiés. Pour conserver les données de cette application, la mettre à jour avec installation de remplacement plutôt que la désinstaller.

## Assistance des sorts (1.10.0)

**Select / ⚙ APK → Lancement intelligent des sorts** active une aide facultative, désactivée par défaut : buffs disponibles, attaques et zones sur les monstres, repoussement et déplacements de secours évalués. Tu gardes le déplacement et les choix. Les sorts déjà automatiques restent gérés par le jeu. Le stick droit, les sorts manuels et les actions tactiles sont prioritaires ; les lancers cessent dans les menus, en pause et hors de l’application. L’aide utilise les commandes du jeu et ne garantit pas la survie.

## Vérification sur le Thor

- Appareil identifié en direct : AYN_Thor, Android 13.
- Construction, signature et installation APK réussies.
- Affichage Android observé : interface tactile, sans sélecteur WASD desktop ; joystick et boutons tactiles présents en partie.
- Lancement depuis l’entrée du menu Cocoon observé.
- R3 injecté par Android : événements tactiles natifs reconnus par le navigateur (`isTrusted=true`) et choix de niveau validé.
- Croix droite injectée via Android : déplacement réel du personnage de x=750 à x=815.869, y stable.
- Mouvements du stick droit physique reçus et pointeur doré visible.
- Pause via Start vérifiée en partie après correction du déclenchement tactile.
- Le test manuel complet des sticks, de la visée et des sorts avec les boutons physiques reste à faire par l’utilisateur.

L’application charge le jeu en ligne ; les mises à jour du site peuvent nécessiter une adaptation des commandes.

Android 9 ou plus : manettes USB/Bluetooth reconnues après connexion dans Android, avec leur nom dans les paramètres. Aucun modèle AYN ni second écran exigé. La fiche utilise uniquement un second écran compatible détecté. Autres Android et manettes externes non encore essayés.

Les indications, paramètres, aide et fiche suivent la langue du jeu : français, anglais ou espagnol. La fiche ne reconstruit plus l’équipement lors d’un simple changement de PV ; les lectures de repères sont mises en cache avec actualisation immédiate au lancement du sort.

Version 1.8.0 : collection permanente des Dofawa et Dofus Cawotte dans une zone compacte du second écran. Lecture seule de la sauvegarde du jeu ; aucun déblocage ajouté. Les Dofus ne sont plus répétés dans l’équipement. Les équipements rayonnants de la partie ont un repère dans leur ligne. Le fichier distribué est désormais Retro-Survival-Android.apk ; installer par-dessus l’application existante pour garder les données.

Version 1.9.0 : pointeur masqué en combat, choix et fenêtres au pad. Le stick droit peut le montrer dans les menus ; la visée précise reste disponible. Sur le second écran : cœur de PV à remplissage vertical dans le style du jeu et alerte Danger à 25 % de vie ou moins, désactivable. Aucun compteur d’ennemis ajouté.
