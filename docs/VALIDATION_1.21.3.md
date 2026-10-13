# Validation 1.21.3

Les deux modules officiels audités du 13 octobre restent protégés par leur hash exact. Les transformations Java ont été extraites dans `GameModuleTransforms`, afin de vérifier les ancres avant toute modification. Une ancre manquante ou dupliquée refuse la transformation. Analyse syntaxique des modules transformés et des adaptateurs réussie : seules les définitions natives KV, WB et UV changent, respectivement cadence de l’interface, dessin et exclusion des contacts trop éloignés.

Graphismes disponibles dans Options du second écran et ⚙ APK. Choix Fluidité vérifié sur le Thor dans les deux interfaces. Sélection d’Effets minimaux via le menu réel, puis rechargement : choix conservé et cap .75 actif. Retour à Fluidité effectué. La résolution des menus reste native ; seules les phases de combat réduisent leur raster. Les coordonnées logiques et les tableaux d’acteurs, projectiles et effets de combat ne sont pas écrits par les réglages graphiques. Le filtrage des particules produit un tableau de dessin distinct ; les marqueurs fixes de grande taille sont conservés. Les sprites de Corbeau, son nuage, les projectiles et les marqueurs des pièges restent présents.

Mesure isolée sur le Thor : 500 positions, 249 500 paires orientées. Le filtre exclut 248 792 paires éloignées. Résultat numérique identique : temps moyen 108,85 ms avant contre 15,68 ms après, après échauffement et sur six mesures. Ce scénario dispersé ne reproduit pas une foule dense ni un combat entier ; il mesure uniquement les tests de proximité, sans modifier une partie ou une sauvegarde.

Combat normal : 922 images actives sur une capture courte, médiane 16,667 ms, 95e percentile 16,997 ms. Dragoeufs, vague 4, 12 ennemis et 1 invocation en fin de mesure ; résolution de combat à cap 1 et cadence observée proche de 60 FPS. Les choix de niveau natifs et la reprise de partie fonctionnent.

Contrôles : suites JavaScript de régression ; choix des cibles des invocations comparé à la sélection native sur 5 000 cas ; décisions de contact comparées sur 161 604 couples de coordonnées/rayons ; tests des ancres Java et analyse syntaxique des deux modules transformés. Interface graphique testée pour les trois choix, le rappel du réglage, la conservation des avertissements et projectiles, l’affichage immédiat des PV et le masquage d’un FPS ancien pendant la pause.

Limite : aucun combat réel à la vague 60 n’a été capturé. L’objectif 60 FPS n’est pas une garantie sur toutes les foules et configurations.
