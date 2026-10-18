# Validation 1.23.1 — 18 octobre 2026

Régression reproduite avec les scripts 1.23.0 et la cadence de lecture Android : un maintien de 150 ms sur l’axe directionnel, intercalé avec le joystick neutre, produisait dix sélections. Le joystick neutre remettait le minuteur à zéro avant chaque lecture de croix. Le test échoue avant correction et passe ensuite avec une seule sélection.

Les sources touche et axe sont maintenant réunies avant navigation. Les répétitions Android ne créent pas un nouvel appui ; une source ne peut pas réarmer le minuteur de l’autre. Le joystick neutre ne remet plus à zéro la répétition d’une croix maintenue dans un menu. Les appuis brefs entre deux lectures du joystick restent traités immédiatement. Répétition volontaire : 500 ms initialement, puis 200 ms. Les deux sources sont libérées à la perte de focus.

Tests : appuis brefs successifs, touche avant axe et axe avant touche, relâchements décalés, événements de répétition, maintien borné, appuis entre deux images et remise à zéro du focus. Suite JavaScript complète réussie, dont bascule combat/choix, sorts maintenus, raccourcis et visée. Les modules ES officiels sont chargés avec leurs vraies dépendances en VM sans réseau sur 25 combinaisons classe/carte ; Brokle exercé sur les cinq cartes. Ce ne sont pas des mesures de FPS.

Module officiel `page-CEksd6bP.js` : SHA-256 `0ece8d95aeb0e97879c45350227ceb83ff10b7788a9802de4a6b208c5c64bcf5`. Moteur `discord-identity-fyQiljmH.js` : SHA-256 `a161ca10ffe43612c1b8015e4b03fca63d6c5425430793b7388a4de3206d1eb4`. Adaptation conditionnée aux empreintes exactes et aux ancres uniques. La limite du module partagé est portée à 12 millions de caractères pour accepter le fichier officiel de 8,73 Mo ; aucun nouveau moteur inconnu n’est adapté.

Thor : APK 1.23.1, code 51 installée par-dessus l’existante. Menu principal parcouru par appuis directionnels Android distincts ; chaque appui avance d’une entrée. Retour vers l’entrée précédente vérifié. La partie Osamodas/Dragoeufs vague 39 reste proposée à la reprise, sans être lancée pendant cette validation. Aucun test de combat multijoueur n’est revendiqué.
