# Vérifications

Vérifications effectuées le 8 octobre 2026 sur un AYN Thor connecté, Android 13.

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
