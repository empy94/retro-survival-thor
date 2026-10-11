# Validation 1.20.7 — 11 octobre 2026

Module officiel vérifié : page-tFFk8FEO.js ; SHA-256 c2af351bcb11f37c5a5e0545295186420b7581fef3eb52c929fba7986194c35f. Le module dépasse désormais l’ancienne limite de 4 millions de caractères, ce qui empêchait les adaptations de se charger. La limite devient 8 millions ; la vérification du hash reste obligatoire.

Les registres d’animations utilisent le cache sur les cartes reconnues. Les variantes graphiques mobiles officielles sont activées, y compris la réduction prévue par le jeu pour les atlas d’apparence. Les anciens modules restent pris en charge.

Deux crashs spontanés antérieurs du moteur WebView sont présents dans les journaux du Thor. Le moteur déclenchait ensuite la fermeture de toute l’application faute de traitement sur les vues associées. Les trois clients WebView partagent maintenant le traitement de récupération. La cause interne précise du crash du moteur ne peut pas être affirmée à partir des traces disponibles.

## Validation réelle sur AYN Thor

- Iop / Wabbit : essai de 120 secondes, environ 70 secondes de combat actif, jusqu’à la vague 3. 4 198 images actives mesurées ; médiane 16,667 ms, percentile 95 à 16,988 ms. Pas de crash spontané pendant cet essai. Les pauses de choix sont exclues des mesures d’image.
- Sufokia : 1 005 images actives, environ 17 secondes de combat, vague 2 avec 5 monstres à la fin. Médiane 16,667 ms, percentile 95 à 17,003 ms.
- Arrêt du moteur provoqué par la commande de diagnostic Chromium : deux vues associées ont traité le crash ; le processus de l’application est resté vivant et le jeu a rechargé son menu avec les commandes actives et la progression enregistrée intacte.
- Tests JavaScript et Java passés ; compilation Android réalisée.

## Limites

Les longues parties, boss et vagues avancées ne sont pas validés par ces essais courts. Une récupération après arrêt du moteur conserve la progression enregistrée, mais ne restaure pas le combat interrompu. La reprise ne démontre pas la disparition de toute cause interne de crash de WebView.
