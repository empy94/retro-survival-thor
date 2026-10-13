# Validation 1.21.4

Correction de la mesure de cadence : les intervalles de rendu actifs supérieurs à 250 ms sont inclus. Fenêtre d’environ une seconde de rendu actif, avec un horodatage initial distinct de zéro. Le mode Fluidité abaisse son cap après la première fenêtre lente ; son seuil minimal reste .75. Pause et changement de qualité réinitialisent compteur et période. Android transmet séparément l’activité de l’application et l’autorisation des commandes : consulter l’écran secondaire ne suffit pas à compter l’application comme étant en arrière-plan. Les changements de visibilité du document réinitialisent aussi la période.

Tests déterministes : huit intervalles de 500 ms donnent 2 FPS et provoquent la réduction du raster ; une pause de 30 s et deux passages inactifs de 60 s ne diminuent pas la nouvelle mesure à 60 FPS. Les choix graphiques et les autres régressions restent testés. La simulation, les dégâts, les coordonnées, les sauvegardes et la synchronisation du jeu ne sont pas modifiés par cette correction.

Limites : le Thor était déconnecté lors de la tentative d’installation. Cette version n’a donc pas été testée ni installée sur la console lors de cette préparation. Les mesures réelles de 1.21.3 figurent dans le document de cette version ; elles restent limitées à un combat court. Aucun maintien de 60 FPS à la vague 60 n’est confirmé.
