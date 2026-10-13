# Validation 1.21.5

Nouvelle révision officielle auditée : `page-UOATnDCV.js`, SHA-256 `53641e4311a21c12e3e176a4d32f0d12b79d870db7ea37addd9de121e0cf47b4`, 6 188 830 octets. Les symboles des adaptateurs ont été remappés avec analyse syntaxique ; les sélections natives de cibles, portée de Corbeau, limite des invocations, normalisation de la sauvegarde et registre d’animations sont identiques après normalisation des noms. Le renderer officiel comporte une évolution propre, conservée dans le module plutôt que remplacée par celui d’une ancienne version.

Les transformations n’affectent que XV (boucle du canvas et cadence de l’interface), JB (dessin) et qV (exclusion des paires distantes). Ancres uniques et hash complet requis. Les tests refusent les ancres absentes ou ambiguës et vérifient que le module transformé, avec ses nouveaux adaptateurs, reste syntaxiquement valide. Les anciennes révisions restent distinctes et prises en charge.

Tests JavaScript de régression exécutés. Presets, mesure FPS, pause et arrière-plan vérifiés sur les adaptateurs des anciennes et nouvelles révisions. La sélection des cibles a été comparée à chaque fonction native sur 5 000 scénarios déterministes, avec maintien des marques et des égalités de distance. Le compteur inclut désormais les images de 500 ms et réinitialise la mesure à la reprise et lors d’un changement de qualité.

Compilation et signature vérifiées. Le Thor est déconnecté : cette version n’a pas été installée ni essayée sur la console lors de cette préparation. Les mesures réelles antérieures sont décrites dans VALIDATION_1.21.3.md ; elles ne démontrent pas 60 FPS à la vague 60. Cette version n’ajoute pas de mesure de combat réel.
