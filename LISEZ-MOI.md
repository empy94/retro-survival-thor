# Retro Survival sur AYN Thor

Application personnelle de lancement du site officiel https://retrosurvival.online/ en interface Android tactile. Connexion Internet nécessaire. Entrée ajoutée au menu principal de Cocoon le 8 octobre 2026.

| Commande | Action |
|---|---|
| Stick gauche ou croix | Déplacement par le joystick tactile du jeu |
| Stick droit | Déplacement du pointeur doré |
| R3 ou A | Appui tactile à la position du pointeur |
| X, Y, L1, R1, L2, R2 | Sorts actifs de gauche à droite, de 1 à 6 |
| Bouton de sort maintenu + stick droit | Viser les sorts qui demandent une direction, puis relâcher |
| Start ou B | Pause / reprise |
| Select / bouton ⚙ Thor | Paramètres des commandes et aide |

Le tactile reste disponible. Les choix de niveau, menus et achats se font au pointeur avec R3. Les attaques automatiques du mode Android restent gérées par le jeu.

Version 1.1.0 : joystick visuel ancré en bas à gauche, étiquettes X/Y/L1/R1/L2/R2 sur les sorts actifs débloqués, affichage et opacité réglables dans les paramètres. Les réglages sont enregistrés. Voir également [README.md](README.md).

La sauvegarde locale de cette application est distincte de celle de Chrome. Les fichiers et sauvegardes Chrome existants ne sont pas modifiés. Pour conserver les données de cette application, la mettre à jour avec installation de remplacement plutôt que la désinstaller.

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
