# Compatibilité du jeu — 1.25.15

Mise à jour du 30 octobre 2026. Modules officiels audités : page `page-fxX25ZC6.js`, SHA-256 `c65f99356ced4c4c4b334cd29aaa97312dc44efa71c5f7f9881a5a2385494c4e` ; données `discord-identity-ryTeZAwZ.js`, SHA-256 `415982b2dfdca8716165280d62adf2d34710b6f65209766d2af025631a1fc30b`.

Les nouveaux contrats conservent les profils précédents. Le module partagé dépasse désormais 12 Mo : la limite de lecture contrôlée passe à 20 Mo, avec vérification des contrats inchangée. Le callback de rafraîchissement du jeu a changé de nom ainsi que sa fonction de mise à jour ; la limitation des rafraîchissements reconnaît les deux variantes et refuse une correspondance ambiguë.

Le Sadida dispose du sélecteur de classe, des noms et icônes officiels, et de quatre sorts à visée manuelle. Les sorts passifs sont exclus des commandes automatiques. Larme, Ronce Apaisante et Herbe Folle utilisent la sélection de cible native ; Puissance Sylvestre est défensive en assistance complète, ou à faible vie en assistance buffs. Les trois réglages graphiques et le raccourci R3 sont conservés.

Validation : compilation et signature Android ; contrats page/données acceptés et modifications/ambiguïtés refusées ; tests de rafraîchissement avec les deux noms de fonction ; 16 suites JavaScript couvrant les sorts, commandes, clavier, graphismes, cache, traduction et sauvegarde. Installation de remplacement sur le Thor `6ea3c06a`, version 1.25.15/code 73, identité et date de première installation conservées. SHA-256 de l’APK installé : `46bb83be599489cc2f473a0e7ac51c2ccd7bff2520d4ceb44f4d281ec6740f6a`.

L’application n’a pas été relancée après l’installation. Aucun FPS en combat sur appareil ni partie multijoueur connectée n’a été mesuré dans cette intervention.
