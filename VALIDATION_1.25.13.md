# Réactivité du second écran — 1.25.13

Le second écran pouvait recevoir une commande mais conserver l’affichage précédent. La collecte du tableau de bord acceptait le focus du second écran sur émulateur, tandis que son callback exigeait encore celui de la fenêtre principale et rejetait donc le résultat.

Le contrôle de focus est désormais cohérent à l’envoi et à la réception. Une commande terminée déclenche une actualisation sans attendre le prochain cycle de 500 ms. Les demandes simultanées sont regroupées ; une seule lecture WebView reste autorisée à la fois. La cadence de fond reste inchangée.

Validation : compilation et signature Android, test de la file bornée et des callbacks tardifs, installation de l’APK 1.25.13 (71) sur emulator-5588. Avec le focus Android confirmé sur l’écran secondaire 4, quatre bascules d’affichage ont été observées après 89, 76, 53 et 60 ms dans une session locale. Le test vérifie la réactivité du tableau de bord, pas un gain de FPS du moteur de combat.

Les données antérieures au test sont sauvegardées puis restaurées. Le Thor n’a pas été modifié.
