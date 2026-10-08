# Retro Survival — AYN Thor

Un lanceur Android pour jouer à [Retro Survival](https://retrosurvival.online/) avec les commandes physiques de l’AYN Thor, tout en conservant l’interface tactile du jeu.

**[Télécharger l’APK](https://github.com/parthi1994/retro-survival-thor/releases/latest)**

## Aperçu sur AYN Thor

Captures réelles de l’application sur AYN Thor, version 1.1.0.

**Accueil du jeu avec accès aux paramètres Thor**

![Accueil de Retro Survival sur AYN Thor](docs/screenshots/accueil.png)

**Déplacement : joystick visuel dans le coin inférieur gauche**

![Partie avec le joystick visuel en bas à gauche](docs/screenshots/joystick.png)

**Sort actif débloqué avec le repère X et pointeur doré**

![Sort actif avec son bouton X en transparence](docs/screenshots/sorts.png)

**Paramètres : affichage des touches, opacité et joystick visuel**

![Menu des paramètres AYN Thor](docs/screenshots/parametres.png)

## Installation

1. Télécharger `Retro-Survival-Thor.apk` depuis la dernière version publiée.
2. Installer l’APK sur le Thor et ouvrir **Retro Survival**.
3. Dans Cocoon : **Toutes les applis → Retro Survival → appui long → Ajouter au Menu Home**.

Une connexion Internet et Android 9 ou plus sont nécessaires. L’application a été testée sur AYN Thor avec Android 13. Elle ne contient pas le jeu : elle charge le site en ligne.

## Commandes

| Touche | Action |
|---|---|
| Stick gauche / croix | Déplacement avec le joystick tactile du jeu |
| Stick droit | Déplacement du pointeur doré |
| R3 / A | Clic tactile à la position du pointeur |
| X, Y, L1, R1, L2, R2 | Sorts actifs de gauche à droite |
| Bouton de sort maintenu + stick droit | Viser, puis relâcher pour les sorts directionnels |
| Start / B | Pause et reprise |
| Select / bouton **⚙ Thor** | Paramètres des commandes |

Les menus et les choix de niveau se sélectionnent au pointeur avec R3. Le tactile reste disponible. Les attaques automatiques du mode Android restent gérées par le jeu.

## Affichage réglable

- Le joystick visuel du stick gauche est fixé dans le coin inférieur gauche pendant le déplacement.
- Les sorts actifs débloqués affichent leur bouton physique : **X, Y, L1, R1, L2, R2**.
- Dans **⚙ Thor** ou avec **Select**, afficher ou masquer ces étiquettes et régler leur opacité entre 15 % et 85 %.
- Le joystick visuel peut être masqué sans désactiver le déplacement.
- Les préférences restent enregistrées après fermeture et mise à jour de l’application.

La sauvegarde locale de cette application est distincte de celle de Chrome. Installer une mise à jour par-dessus l’application existante pour conserver ses données. Une version reconstruite avec une autre clé de signature ne peut pas remplacer directement l’APK publié.

## Construire l’application

Sous Windows, installer un JDK et les outils Android SDK : plateforme `android-35` et Build Tools `34.0.0`. Java 17 ou 19 est recommandé avec cette version de D8 ; la compilation avec Java 19 a été vérifiée.

```powershell
$env:ANDROID_SDK_ROOT = 'C:\Android\Sdk'
$env:JAVA_HOME = 'C:\Java\jdk-19'
.\build.ps1
```

Les chemins sont également configurables par les paramètres `-AndroidSdk` et `-JavaHome`. L’APK signé est produit dans `Retro-Survival-Thor.apk`. La clé de signature personnelle est créée hors du dépôt, dans `%USERPROFILE%\.android\thor-retrosurvival`. Conserver cette clé pour les mises à jour et ne jamais la publier.

Le paramètre `-Debug` produit un APK séparé avec le débogage WebView activé, uniquement pour les essais. L’APK publié n’active pas ce débogage.

## Projet indépendant

Cette application est un lanceur et une adaptation des commandes. Elle n’est affiliée ni aux auteurs de Retro Survival ni à Ankama. Le jeu, ses illustrations et son contenu restent la propriété de leurs auteurs et ayants droit. Les captures ci-dessus montrent le jeu chargé depuis son site ; le dépôt ne contient pas ses scripts ni ses fichiers graphiques, hormis ces captures de présentation. Le site peut évoluer et nécessiter une mise à jour des commandes.

Le code original de ce lanceur est distribué sous licence MIT.
