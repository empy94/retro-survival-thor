# Validation 1.25.0

Version officielle examinée le 20 octobre 2026 : page `page-D8qRcVId.js`, SHA-256 `03e4768020c7b58114b82b628526f4313739e3eb3f29219748de338ad203ae4c` ; module partagé `discord-identity-BofEmv2P.js`, SHA-256 `cd3ea78d85b12946c572a5098d452ae134d876cd326d48ce8d42c969748b2ed2`.

## Changements

- Adaptateurs de commandes, aperçus, statistiques, visée et rendu pour cette révision ; familles antérieures conservées.
- Crâ dans la sélection des sorts de l'écran inférieur. Sept sorts à visée manuelle reconnus ; quatre sorts passifs laissés au jeu. Flèche Explosive éveillée en automatique suit sa règle native. Tir Puissant et Maîtrise de l'Arc tiennent compte des buffs actifs.
- Dofus de la Gardienne dans la collection permanente : lecture de `guardianRoll`, plage native 6–15 %. Les plages des équipements utilisent les métadonnées natives disponibles, avec repli pour les révisions antérieures.
- Les marqueurs d'alerte de Brâkmar restent visibles en mode sans animations ; les projectiles hostiles conservent leur couleur d'avertissement. Trois choix graphiques visibles conservés.
- Nouvelle famille de contrats pour les changements de noms compatibles, avec contrôles de dépendances et fonctions natives. Une logique réellement différente continue de nécessiter une adaptation.

## Vérifications

Toutes les suites JavaScript publiques passent. Les modules officiels téléchargés sont évalués hors ligne avec leurs imports immuables : six classes × six cartes, aperçus de tous les sorts, neuf lancements Crâ acceptés et quatre sorts passifs correctement distingués. Les transformations de rendu et la résolution des contrats passent également.

Sur le Thor 6ea3c06a : ouverture du site, sélection Crâ / Égouts de Brâkmar, combat réel, commandes et sorts automatiques observés ; collection permanente affichée 5/6. La reprise native a conservé un Crâ niveau 13, vague 5 lors du remplacement par l'APK normale. Version 1.25.0 / code 58 relue, sans indicateur Android DEBUGGABLE.

APK normale SHA-256 : `cc8a91c98090df84f8773dbf9651b3cfd7080872d5aae0e89ab4a5a644cf11bc`.

Cette validation n'est pas un benchmark de 60 FPS constants, un test de tous les éveils en combat réel, ni une preuve d'obtention du nouveau Dofus. Le contenu du jeu reste chargé depuis le site officiel.
