# Arène : choix de niveau et sorts interclasses — 1.25.20

5 novembre 2026, mêmes modules officiels que la 1.25.19.

Le journal Android signalait `TypeError: Cannot read properties of undefined (reading 'after')` dans le composant natif de choix de niveau `Wk`. L’adaptation de `sw` et `fw` limitait les aperçus à la classe d’origine. En Arène, des choix de sorts appris dans d’autres classes n’avaient donc plus d’aperçu. Ces deux remplacements sont supprimés pour conserver les calculs natifs et leur liste complète de sorts appris. Le contrat est régénéré : quatre fonctions locales nécessaires, au lieu de huit ; les contrôles de compatibilité restent présents.

Le planificateur automatique reçoit les identifiants des sorts effectivement appris en Arène. Il accepte les sorts des sept classes tout en respectant les passifs, les éveils automatiques, les exclusions manuelles par classe d’origine, le mode Buffs et OFF. Les limites de classe des cartes ordinaires sont conservées. Les gardes et informations natives de Corbeau, des invocations Enutrof et des sorts Sadida prennent également en compte l’Arène.

Le changelog fourni par l’utilisateur précise que l’Arène est en bêta, sans récompense ni Dofus à obtenir pour le moment. L’entrée interne `dofus-arena`, sans effet ni image, est donc exclue du compteur de collection permanente. Une note l’explique dans la collection. Aucun jet ou bonus n’est inventé. Quand le catalogue natif lui donnera de vrais effets, elle pourra apparaître normalement.

Les bornes rayonnantes affichent maintenant les malus fixes divisés par 1,5, arrondis vers zéro. Les malus variables gardent leurs valeurs natives ; les bonus positifs conservent leur calcul précédent. Le calcul de combat n’est pas modifié.

Tests réussis : collection, exécution du planificateur sur sort interclasse, exclusions et modes, commandes, R3, répétition de croix, clavier, navigation, Crâ, Corbeau, graphismes. Les contrôles hors réseau sur le vrai module couvrent 609 aperçus de sorts en Arène sur les sept classes, les choix de niveau correspondants, les sorts automatiques interclasses et 22 effets négatifs rayonnants comparés aux valeurs natives. Le catalogue courant de 70 succès et les 777 comparaisons du cache restent valides.

Sur le Thor : reprise de la partie existante Sadida/Arène à la vague 7, niveau 24, sans erreur remontée. Pendant un essai de 1,2 seconde, quatre commandes automatiques sont émises, la dernière étant Remblai, sort Enutrof appris par le Sadida. La partie est ensuite remise en pause. Aucun niveau, sort, objet ou succès n’a été donné pour ces tests. Aucun passage complet de vague ni partie multijoueur réelle n’est revendiqué.

Installation finale normale 1.25.20/code 78, SHA-256 `1ae96c0e70b41b6c1abbac0c76a6d1b76328869eeed253d35d2f43b7ae2bacf3`, identique sur le Thor. UID et date de première installation conservés, débogage désactivé.
