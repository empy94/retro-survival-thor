# Validation 1.21.2

Révisions officielles auditées le 13 octobre 2026 : `page-7Wg2VI0N.js` (SHA-256 `1d0ca84d7f804519dbeeb7a1eb9233292d6e3a770ffbe04511dcc16dff3491b4`) et `page-DBZSz5_j.js` (`ff04eaec039abe829416ee8fb2a48b4edf81b85acae21b26be6cf9b14a92159e`). La seconde modifie uniquement `JI`, sans changement des fonctions adaptées. Les transformations restent soumises au hash exact et aux ancres uniques.

Sur AYN Thor : scène de rendu synthétique de 160 monstres et 24 invocations, sur une partie en pause. Les copies existent uniquement dans la sonde de dessin et ne sont jamais utilisées par la simulation ou la sauvegarde. Profil initial : 717 images, 58,29 FPS moyens, dessin moyen 4,83 ms à 1608 × 935 pixels. Profil optimisé : 725 images, 58,17 FPS, dessin moyen 3,33 ms à 1407 × 818 pixels. Baisse d’environ 31 % du coût moyen du dessin ; le 95e percentile reste proche de 5,4 ms. Cette comparaison associe les nouveaux calculs d’interface et la résolution adaptative : elle ne mesure pas séparément leur effet.

Test normal supplémentaire sur la deuxième révision : 1 010 images actives, médiane 16,667 ms et 95e percentile 16,998 ms, Dragoeufs vague 3, 13 ennemis et 2 invocations en fin de capture. Les choix de niveau natifs fonctionnent, le cache est actif et aucune erreur JavaScript n’a été détectée dans le journal consulté. Ce test reste court.

Tests : choix des cibles identique au code officiel sur 5 000 cas déterministes, priorités des marques et égalités de distance ; baisse et remontée de résolution, pause, conservation de l’objet de simulation ; suites JavaScript et sélection Java des versions vérifiées. Les sondes de profilage ne sont pas présentes dans l’APK finale.

Limites : la scène synthétique ne mesure pas le coût des déplacements, attaques et interactions d’un vrai combat avec 184 créatures. La chute signalée à 17 FPS n’a pas été reproduite. Aucun maintien de 60 FPS sur toutes les vagues ou tous les boss n’est établi.
