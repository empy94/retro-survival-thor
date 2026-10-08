# Guide de Retro Survival sur Android

[Télécharger et découvrir l’application](../README.md)

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
| A / R3 | Valider la sélection ; sinon clic au pointeur |
| L1 / R1 / L2 / R2 | Priorité aux sorts à viser |
| X / Y | Priorité aux sorts instantanés |
| Start / B | Pause / reprendre |
| Select / ⚙ APK | Paramètres |

Maintiens la touche du sort, règle la direction au stick droit, puis relâche. Pour les placements, l’inclinaison règle la distance. Téléportation et Bond utilisent leur portée maximale. La cible suit le personnage et les améliorations de portée ; le terrain reste géré par le jeu.

Le rayon de placement et la taille de l’effet sont distincts. Les glyphes ont actuellement une portée de placement de 200 unités. Les attaques purement directionnelles n’annoncent pas un rayon de portée. Le retour de Téléportation et l’échange avec un Double gardent leur destination imposée.

Six raccourcis manette maximum ; les sorts supplémentaires restent au tactile/pointeur et le mode intelligent peut les utiliser. Les affectations peuvent changer après un déblocage : consulte les repères sur les sorts.

## Réglages et second écran

La visée au pointeur se retrouve en désactivant **Visée radiale des sorts à cibler** ; Téléportation/Bond restent radiaux. Sensibilité du pointeur : 25–250 %. Repères et joystick visuel peuvent être masqués sans supprimer les commandes. Les préférences sont enregistrées.

La fiche utilise le style du jeu : cœur de PV, kamas, caractéristiques et équipement. Touche un objet ou une carte de collection pour voir les détails, puis referme-les pour libérer la place. L’alerte de PV faibles est facultative ; aucun compteur d’ennemis. [Collection et jets](collection.md).

Les paramètres et la fiche suivent la langue du jeu : français, anglais ou espagnol. Une seule lecture en attente par boucle ; fiche actualisée à 2 Hz, éléments inchangés conservés.

## Mises à jour et sauvegardes

Installe la nouvelle APK par-dessus l’ancienne. La sauvegarde de cette application est distincte de Chrome. La désinstallation peut effacer les données de l’application ; une autre clé de signature ne peut pas remplacer l’APK publié.

## Construire l’application

Sous Windows, installer un JDK et les outils Android SDK : plateforme `android-35` et Build Tools `34.0.0`. Java 17 ou 19 est recommandé avec cette version de D8 ; la compilation avec Java 19 a été vérifiée.

```powershell
$env:ANDROID_SDK_ROOT = 'C:\Android\Sdk'
$env:JAVA_HOME = 'C:\Java\jdk-19'
.\build.ps1
```

Les chemins sont également configurables par les paramètres `-AndroidSdk` et `-JavaHome`. L’APK signé est produit dans `Retro-Survival-Android.apk`. La clé de signature personnelle est créée hors du dépôt, dans `%USERPROFILE%\.android\thor-retrosurvival`. Conserver cette clé pour les mises à jour et ne jamais la publier.

Le paramètre `-Debug` produit un APK séparé avec le débogage WebView activé, uniquement pour les essais. L’APK publié n’active pas ce débogage.

Avec Node.js, `node tests/telemetry.test.js` vérifie le contrat de lecture des informations du personnage, dont les données indisponibles, les totaux et l’absence de modification du jeu. `node tests/spell-bindings.test.js` vérifie la priorité des sorts à viser, l’exception du Glyphe enflammé, la limite de six boutons, le relâchement du bon bouton et l’annulation de la visée.

`node tests/aim-follow.test.js` vérifie une visée dont la cible reste fixe pendant le déplacement du personnage, le calcul au relâchement et l’annulation si sa position est indisponible. Le test de l’observateur vérifie aussi les coordonnées du personnage après mise à l’échelle du canvas et remplacement de la partie.

`node tests/travel-aim.test.js` vérifie la direction initiale, le suivi du personnage, le choix direct au stick droit, la direction conservée au retour au centre, la portée améliorée, le retour imposé et la restauration du pointeur pour les autres sorts.


`node tests/auto-spells.test.js` vérifie les priorités du mode intelligent, les buffs seuls sans monstre, le respect des effets actifs, les changements de mode et la suspension des lancers.
