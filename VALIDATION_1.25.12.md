# Clavier et second écran — 1.25.12

Sur les émulateurs Android uniquement, l’écran secondaire accepte désormais les frappes de déplacement et les transmet à la fenêtre du jeu. L’application reste active lorsque cet écran possède le focus. Le comportement des écrans sur le matériel Thor est conservé.

Cause reproduite avant correction : une touche Z envoyée depuis la fenêtre Windows du jeu arrivait dans sa WebView ; la même touche envoyée depuis la fenêtre du bas n’arrivait dans aucune des deux WebView. Après correction, le Z Windows envoyé depuis le bas a produit un appui et un relâchement dans la fenêtre de jeu.

Validation sur emulator-5588, Féca/Astrub, sans connexion de la session locale : des touches maintenues injectées vers l’écran secondaire 4 ont déplacé le personnage. Z : dy −70,78 ; Q : dx −68 ; S : dy +25,81 avec contrainte de terrain ; D : dx +70,83 ; Z+Q : dx et dy −48,08. Aucun déplacement ne restait dans l’ensemble de touches après le relâchement ; le personnage est resté à 6 PV pendant ces tests.

Les tests des raccourcis et commandes existantes, la compilation et la signature Android passent. L’APK 1.25.12 (70) est installée sur l’émulateur. Le Thor n’a pas été modifié. Ce contrôle du clavier ne constitue pas un parcours complet de toutes les classes et cartes.
