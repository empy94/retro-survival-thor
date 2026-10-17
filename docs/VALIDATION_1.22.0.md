# Validation 1.22.0 — 17 octobre 2026

Modules officiels audités :

- `page-BVpugp4s.js` : SHA-256 `1b97b721d070bcbe2f280813318d5b59605a4a0863d13a73db302e49f348c9a3`.
- `discord-identity-v9Gyhq15.js` : SHA-256 `5487ff3251ae4881d60089eb496f10616af9679522c83c21402bf07d979b1202`.

Le moteur est désormais importé dans le module de page. Les adaptateurs sont distribués entre ces deux fichiers, sans réassigner les imports ES immuables. La transformation de page ne change que trois déclarations natives : renderer `_N`, mise à jour des ennemis `gP` et boucle du canvas `SP`. Le ciblage coopératif natif est conservé. En absence d’adaptateur partagé, les points de dessin peuvent revenir aux fonctions natives.

Le catalogue contient 64 sorts et 225 objets. La classe est lue dans `characterId` et non déduite de la carte ; les anciennes sauvegardes sans ce champ conservent leur repli historique. Une classe explicite inconnue ne reçoit aucune commande automatique.

Tests locaux : toute la suite JavaScript passe, dont assistance, priorité manuelle, exclusions, Cawotte à PV bas, cible Corbeau, raccourcis, télémétrie et dessin sans animations. Les tests Java vérifient les empreintes, le refus d’ancres modifiées ou dupliquées et le refus d’une copie de jeu incomplète ou d’une paire de modules divergente. Les modules ES officiels complets sont également chargés avec leurs vraies dépendances dans une machine virtuelle Node, réseau interdit : 25 combinaisons classe/carte, aperçus natifs et lancement de Brokle sur les cinq cartes. Cette exécution n’est pas un navigateur et ne mesure pas les FPS.

Thor physique : mise à jour Android installée par-dessus la version existante, sans réinitialisation des données. Menu officiel, double écran, collection conservée, caractères français, partie Iop sur Astrub, montée de niveau et reconnaissance de Couper débloqué vérifiés. L’assistance complète est activée. Le test court ne valide ni tous les sorts en combat ni les vagues avancées. Aucun maintien de 60 FPS constants n’est annoncé. Le lancement du navigateur de test sur PC a été refusé par le contrôle automatique ; les validations locales et Android sont distinguées ci-dessus.
