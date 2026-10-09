# Guide de Retro Survival sur Android

[Télécharger et découvrir l’application](../README.md)

## Pages du second écran

Glisse horizontalement pour parcourir **Personnage**, **Sorts** et **Options**, ou touche un onglet. Les listes longues défilent verticalement. Les options s’appliquent directement au jeu sans quitter le combat.

Dans **Sorts**, choisis Féca, Iop ou Sram, puis touche une icône active pour basculer entre **Auto** et **Manuel**. Tu peux préparer les exceptions avant de débloquer un sort. Elles sont conservées après fermeture ou mise à jour, indépendamment pour chaque classe.

**Auto** suit le réglage global : désactivé ne lance rien, buffs seuls ne lance que les buffs, tous les sorts utilise le planificateur complet. **Auto · en attente** indique qu’un sort n’est pas automatisé dans le mode global actuel. **Manuel** l’exclut de l’assistance de l’APK et annule un éventuel ciblage automatique en préparation ; sa commande manuelle reste disponible. Les sorts **Auto du jeu** sont gérés par le jeu original et ne peuvent pas être désactivés par cette page.

Les pages interactives nécessitent un second écran Android compatible. Sur un seul écran, les options et les réglages par classe sont accessibles dans **⚙ APK / Select → Raccourcis des sorts**.

## Appareils et manettes

Android 9 ou plus, connexion Internet et Android System WebView à jour. Le tactile suffit. Une manette USB/Bluetooth est reconnue après connexion dans Android ; son nom apparaît dans **⚙ APK / Select**. Les inscriptions Nintendo peuvent différer des noms de boutons Android.

Le second écran est facultatif : la fiche apparaît seulement si Android détecte un écran compatible. Le Thor a été essayé avec Android 13. Les autres appareils/manettes externes n’ont pas encore été testés matériellement.

## Assistance des sorts

**⚙ APK / Select → Assistance des sorts** offre trois choix exclusifs :

- **Désactivée** : lancers actifs manuels, valeur initiale.
- **Buffs auto uniquement** : Bouclier, Vitesse, Science du Bâton, Puissance et Invisibilité dès disponibilité, même sans monstre. Conserve les effets actifs, notamment l’Invisibilité dont une seconde pression pourrait annuler l’effet. Aucun sort offensif ni déplacement automatisé.
- **Tous les sorts intelligents** : complète les buffs par attaques dirigées, zones et déplacements de secours évalués selon les positions des monstres.

Les sorts passifs déjà automatiques du jeu continuent dans tous les modes. Tes actions manuelles ont priorité ; l’assistance attend pendant un sort maintenu, la pause, les paramètres, les choix ou hors focus. Tu gardes le déplacement ordinaire et les améliorations. L’aide ne prédit pas toutes les attaques/obstacles et ne garantit pas la survie.

Le mode Buffs ne lit pas les listes de monstres/pièges. Les deux modes utilisent une décision toutes les 80 ms et les commandes originales du jeu : mêmes effets, animations et récupération. [Mesures et limites](../VALIDATION.md).

## Visée et commandes

| Commande | Action |
|---|---|
| Stick gauche / croix | Déplacement ; sélection dans les menus |
| Stick droit | Visée radiale ou pointeur |
| A / R3 | Valider dans les menus ; R3 sert aussi de clic au pointeur |
| L1 / R1 / L2 / R2 | Priorité aux sorts à viser |
| X / Y puis A / B | Sorts en combat, priorité aux sorts instantanés |
| Start | Pause / reprendre ; B aussi si aucun sort ne lui est affecté |
| L1/R1/L2/R2 + X/Y/A/B | Combinaisons : maintenir le modificateur, puis appuyer sur la touche du sort |
| Select / ⚙ APK | Paramètres |

Maintiens la touche du sort, règle la direction au stick droit, puis relâche. Pour les placements, l’inclinaison règle la distance. Téléportation et Bond utilisent leur portée maximale. La cible suit le personnage et les améliorations de portée ; le terrain reste géré par le jeu.

Le rayon de placement et la taille de l’effet sont distincts. Les glyphes ont actuellement une portée de placement de 200 unités. Les attaques purement directionnelles n’annoncent pas un rayon de portée. Le retour de Téléportation et l’échange avec un Double gardent leur destination imposée.

Huit touches directes et seize combinaisons sont disponibles. Les sorts supplémentaires sont affectés aux touches libres, puis aux combinaisons. Sous chaque icône de **Sorts**, choisis **Automatique** ou un raccourci personnalisé : sauvegarde par classe, indépendante du mode Auto/Manuel. Une touche déjà choisie est libérée sur l’autre sort, qui retrouve une affectation automatique. Les affectations automatiques peuvent changer après un déblocage : consulte les repères.

Pour une combinaison, relâcher la touche du sort termine la visée ; relâcher seulement le modificateur ne lance pas le sort. Un sort instantané sur un modificateur se lance au relâchement s’il n’a pas servi à une combinaison. Dans la boutique, la sélection reste sur l’offre consultée après A. Les comparaisons de butin permettent de parcourir les actions équiper/vendre.

## Réglages et second écran

La visée au pointeur se retrouve en désactivant **Visée radiale des sorts à cibler** ; Téléportation/Bond restent radiaux. Sensibilité du pointeur : 25–250 %. Repères et joystick visuel peuvent être masqués sans supprimer les commandes. Les préférences sont enregistrées.

La fiche utilise le style du jeu : cœur de PV, kamas, caractéristiques et équipement. Touche un objet ou une carte de collection pour voir les détails, puis referme-les pour libérer la place. L’alerte de PV faibles est facultative ; aucun compteur d’ennemis. [Collection et jets](collection.md).

Les paramètres et la fiche suivent la langue du jeu : français, anglais ou espagnol. Une seule lecture en attente par boucle ; fiche actualisée à 2 Hz, éléments inchangés conservés.

## Vendre les doublons

Active **Vendre les doublons identiques moins bons** dans **Options** ou **⚙ APK**. La comparaison utilise chaque effet, pas seulement le jet global G. Un meilleur effet suffit à conserver le choix. L’option est désactivée initialement ; elle remplace le filtrage automatique du jeu lorsqu’elle est active. Les objets de même catégorie mais de noms différents restent proposés.

## Mises à jour et sauvegardes

Le **nuage du menu principal** permet de générer le code de récupération du jeu. La synchronisation en ligne et ce bouton fonctionnent dans la version **1.15.1+**. Garde ce code secret.

Installe la nouvelle APK par-dessus l’ancienne. La sauvegarde de cette application est distincte de Chrome. La désinstallation peut effacer les données de l’application ; une autre clé de signature ne peut pas remplacer l’APK publié.

**⚙ APK → Exporter la progression** crée un fichier JSON à l’endroit choisi. **Restaurer la progression** recharge ce fichier et redémarre le jeu. Il contient les cartes débloquées, records et collection permanente. Il ne contient pas une partie en cours. Conserve une copie avant de désinstaller. Les fichiers d’une autre application ou d’un format inconnu sont refusés.

## Construire l’application

Sous Windows, installer un JDK et les outils Android SDK : plateforme `android-35` et Build Tools `34.0.0`. Java 17 ou 19 est recommandé avec cette version de D8 ; la compilation avec Java 19 a été vérifiée.

```powershell
$env:ANDROID_SDK_ROOT = 'C:\Android\Sdk'
$env:JAVA_HOME = 'C:\Java\jdk-19'
.\build.ps1
```

Les chemins sont également configurables par les paramètres `-AndroidSdk` et `-JavaHome`. L’APK signé est produit dans `Retro-Survival-Android.apk`. La clé de signature personnelle est créée hors du dépôt, dans `%USERPROFILE%\.android\thor-retrosurvival`. Conserver cette clé pour les mises à jour et ne jamais la publier.

Le paramètre `-Debug` produit un APK séparé avec le débogage WebView activé, uniquement pour les essais. L’APK publié n’active pas ce débogage.

Avec Node.js, `node tests/telemetry.test.js` vérifie le contrat de lecture des informations du personnage, dont les données indisponibles, les totaux et l’absence de modification du jeu. `node tests/spell-bindings.test.js` vérifie la priorité des sorts à viser, l’exception du Glyphe enflammé, les huit touches, les combinaisons et les affectations personnalisées, le relâchement du bon bouton et l’annulation de la visée.

`node tests/aim-follow.test.js` vérifie une visée dont la cible reste fixe pendant le déplacement du personnage, le calcul au relâchement et l’annulation si sa position est indisponible. Le test de l’observateur vérifie aussi les coordonnées du personnage après mise à l’échelle du canvas et remplacement de la partie.

`node tests/travel-aim.test.js` vérifie la direction initiale, le suivi du personnage, le choix direct au stick droit, la direction conservée au retour au centre, la portée améliorée, le retour imposé et la restauration du pointeur pour les autres sorts.


`node tests/auto-spells.test.js` vérifie les priorités du mode intelligent, les buffs seuls sans monstre, le respect des effets actifs, les changements de mode et la suspension des lancers.

`node tests/controller-shortcuts.test.js` couvre le septième sort sur A, la validation contextuelle et les combinaisons sans double lancer. `node tests/menu-navigation.test.js` couvre les comparaisons de butin et le retour à une offre de boutique.
