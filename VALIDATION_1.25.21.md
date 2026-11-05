# Réglages Crâ et Sadida — 1.25.21

5 novembre 2026. L’écran de sorts et le filtre d’exécution connaissaient déjà les sept classes et 90 sorts, mais le catalogue JSON utilisé par Android pour autoriser les préférences restait à cinq classes et 65 sorts. Les appels de sauvegarde du Crâ et du Sadida étaient ainsi refusés silencieusement, pour les exclusions auto/manuel comme pour les raccourcis.

Le catalogue Android est synchronisé avec celui affiché. Le catalogue de classes inutilisé et périmé du panneau est supprimé. Les règles de validation, les sorts automatiques natifs, les préférences existantes et les commandes restent inchangés.

Le test de politique compare désormais entièrement les deux catalogues : classes, identifiants, métadonnées et passifs. Il vérifie également les choix auto/manuel de Flèche Punitive et Ronces Multiples. Tests de politique, du planificateur interclasse de l’Arène et des sélecteurs du panneau réussis.

L’installation de diagnostic a été refusée par le contrôle automatique avant exécution. Aucun essai de clic ou de persistance dans le panneau réel n’a donc eu lieu. La voie retenue utilise uniquement l’APK normale et les vérifications hors appareil. Ne pas présenter ces dernières comme un essai réel d’auto/manuel sur le Thor.

APK normale signée 1.25.21/code 79 installée avec `adb install -r`, sans effacement. Identité et date de première installation conservées, débogage désactivé. Contenu des assets vérifié face aux fichiers construits. SHA-256 : `6f09b62f0d54ca2f2abea64d1a0e279d785a8f7458fdd97989b00180fd84af4e`.
