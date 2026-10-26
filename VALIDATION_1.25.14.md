# Mise à jour et raccourci R3 — 1.25.14

Les modules officiels récupérés le 26 octobre sont identifiés par leurs SHA-256 : page `fec9b2bce499c676cbf8a728110fb1575039a19f89be42641d0b085a94b8be0c`, données partagées `4350d495a1ebcbe425223a1cb9cd5cdf537853f22433728dbad08019f4410f52`. Les nouveaux contrats sont ajoutés sans supprimer les versions précédentes. Les renommages restent contrôlés au démarrage et les fonctions modifiées hors contrat sont refusées.

R3 coupe puis rétablit l’assistance des sorts pendant le combat. Le mode précédent, buffs seuls ou tous les sorts, est conservé. La désactivation annule les lancements automatiques en préparation. Dans les menus, R3 conserve sa fonction de validation. Les répétitions Android d’une même pression ne changent pas plusieurs fois le mode. Le réglage du second écran est actualisé après la commande.

Le callback d’interface renommé par le jeu est à nouveau limité par la politique de rafraîchissement existante ; la transformation ne s’applique qu’à une correspondance unique. Les trois choix graphiques restent inchangés.

Vérifications : 13 suites JavaScript (commandes, visée, sorts auto, Crâ/Corbeau, croix, clavier émulateur, graphismes, traduction, sauvegarde et isolation), tests Java des contrats page/données et du callback renommé, refus des modifications et ambiguïtés, compilation Android et signature. Évaluation des modules officiels hors réseau sur les six classes. Aucun appareil détecté en USB : pas d’installation sur appareil ni de mesure FPS en combat dans cette intervention.
