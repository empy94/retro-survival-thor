# Validation 1.23.2

## Constat appareil avant correction

Thor identifié par ADB ; APK publique 1.23.1, code 51. Rapport Android du 18 octobre 2026 à 12:45:48 : attente de plus de 5 000 ms pour un MotionEvent. Le thread principal attend `DrawFrameTask::drawFrame`, le thread de rendu attend dans WebView. Les journaux montrent aussi des images bloquées entre environ 0,75 et 2,5 secondes. Le moteur installé est Android WebView 109.0.5414.123.

L’alerte reste visible devant une partie Osamodas/Dragoeufs. Aucune commande de jeu, fermeture, modification des réglages système ou des sauvegardes pendant le diagnostic. Les traces complètes restent dans le dossier build ignoré par Git.

TrackPadDS est activé avec une capacité d’injection de gestes et sans capacité de lecture du contenu des fenêtres. Son paquet jusque-là inconnu de notre politique faisait réactiver l’exposition complète du DOM aux services d’accessibilité. Ce travail inutile est retiré ; il ne constitue pas à lui seul une preuve de la cause de l’ANR.

## Vérifications locales

Suite JavaScript complète réussie, dont les commandes, les sorts automatiques, la visée, la navigation et les repères au sol. Test du rendu réel de l’adaptateur : 600 appels derrière une fenêtre Android ne repeignent ni ne redimensionnent le canevas ; le retour au premier plan applique le réglage graphique en attente et repeint immédiatement. Aucun changement de la phase du jeu.

Test de la fiche : un changement de FPS ne reconstruit plus l’en-tête. Tests Java : file d’évaluation bornée, callbacks périmés refusés, TrackPadDS exclu de l’exposition inutile, lecteurs d’écran et services inconnus préservés. Modules ES officiels exécutés avec leurs dépendances : 25 combinaisons classe/carte, Brokle sur cinq cartes.

APK publique 1.23.2, code 52, compilation réussie et signature v3 vérifiée. SHA-256 : `8b42f33dfa37f8d447b810a3b3ea10c2ddb9983129e6accba66af427f0bb00c4` (consulter l’empreinte du fichier livré pour vérification).

## Limites

Installation sur le Thor autorisée puis réussie par mise à jour, sans effacer les données : version 1.23.2, code 52 vérifiés. Démarrage en ligne et initialisation des commandes confirmés. Les deux écrans s’affichent. Deux appuis directionnels distincts sélectionnent successivement Reprendre et Nouvelle partie, puis Haut revient à Reprendre. Les réglages Android s’ouvrent et se ferment, avec retour au jeu. Le classement en ligne se charge et affiche les résultats ; retour au menu vérifié. Pendant les quelques minutes de vérification, aucun nouveau crash ou ANR observé : le dernier rapport système reste celui de 12:45:48, sous 1.23.1. La reprise proposée reste Osamodas/Dragoeufs, vague 39, niveau 59 ; aucun combat lancé pendant cette vérification. Aucun gain de FPS de combat mesuré et aucune garantie de 60 FPS constants. Le rapport ANR prouve le blocage dans la chaîne de rendu ; il ne permet pas d’isoler avec certitude son déclencheur. La correction réduit la charge et les files inutiles, sans masquer les alertes Android.
