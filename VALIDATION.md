# Version 1.18.1 — 9 octobre 2026

- Révision officielle `page-CsVXhSaF.js`, SHA-256 `a14150ba87429dbc69ff354a7de00274f356148304deb74d54d6760e780a63e7`. Nouvelle correspondance des fonctions internes et HUD extrait du moteur actuel.
- Treize suites JavaScript publiques, suite privée et test Java de compatibilité réussis ; deux APK compilées et signées.
- WebView réelle sur Thor : règles reconnues, 14 statistiques et 186 équipements ; amélioration native des dégâts 0 → 10 et rafraîchissement HUD exécutés sans erreur. Page Cheats présente.
- Limites : pas de campagne complète, pas de nouvel essai physique de toutes les touches ni de Brokle dans cette révision. Correction Brokle conservée, tests de routage réussis.
- Mise à jour locale de l’extension : installation de l’APK par-dessus la précédente puis redémarrage du jeu. Aucun import de scripts ni mise à jour autonome de l’extension ajouté.

# Version 1.18.0 — 9 octobre 2026

- Révision officielle `page-2MA4kA44.js`, SHA-256 `fbe576762c5685fcd399a879391b29a8b5b62106fac1664ab16bacc2246fe677`. Les symboles ont été renommés ; les adaptations de cette révision sont désormais distinctes de celles des trois révisions antérieures.
- Bug Brokle : le tactile natif traite Brokle comme un lancement au relâchement, y compris sans Saut Dirigé. Le lanceur émettait alors pointerdown/pointerup comme pour un sort instantané, sans laisser React établir la visée. Correction du routage et de l’assistance ; portée zéro pour un impact sur place, 220 pour Saut Dirigé.
- Treize suites JavaScript et cinq tests Java réussis. Modes de lancement comparés au tableau natif cO pour les 51 sorts × quatre états d’évolution ; exception du Glyphe Enflammé correctement conservée. Tests du maintien/relâchement de Brokle, sélection des modules, vente et capture du contexte de la nouvelle révision.
- Dans la WebView réelle du Thor, build de vérification : partie Iop, Brokle débloqué par son choix natif. Circuit JavaScript de la manette controller(R1, true/false) : effet natif de Brokle créé (compteur 4 → 5), incantation 0,7828 s, puis récupération observée à 4,9991 s. Test effectué via la même entrée que les commandes Android, pas par un appui physique de l’utilisateur.
- Extension reconnue avec 14 caractéristiques natives dans le nouveau moteur. APK finale signée 1.18.0 / code 26 installée par-dessus l’existante, débogage désactivé ; SHA-256 `c697821cf2bdb03cc84e1c204a062c4d52c6b829c575036949f2a8525207fcc9`. Extension 1.2.0 installée également.
- Limites : modes de lancement de tous les sorts contrôlés par tests ; pas de partie complète avec chaque évolution ni d’essai physique de toutes les touches/manettes. Aucun autre écart de mode de lancement détecté dans le tableau actuel.

# Version 1.17.2 — 9 octobre 2026

- Une nouvelle révision officielle est apparue pendant l’installation de la 1.17.1 : `page-BNONV-CU.js`, SHA-256 `4a9870e8c536ce968ed85b7074d133cd3e3ba40a3b145e86ad5857470cd229ca`. Les 67 fonctions des adaptations sont textuellement identiques aux versions auditées. Changements hors adaptation : Mutilation, pause/abandon et composant Nk.
- Test Java de compatibilité actualisé réussi. APK finale signée 1.17.2 / code 25 installée, SHA-256 `4f7b6d9b6ed4e084cdcf209fe827bd3edca1a3a2e12f27ebc42792a94e28c393`.
- Sur Thor avec APK finale : nouvelle partie Astrub, page Cheats active ; boutons soins/recharge/invincibilité et bonus actifs, catalogue d’équipement ouvert. La nouvelle table de reconnaissance permet de charger les règles de statistiques natives déjà vérifiées. Aucun essai de campagne complète supplémentaire.

# Version 1.17.1 — 9 octobre 2026

- Régression observée sur le Thor : onglet Cheats présent mais commandes grisées et améliorations absentes. Nouvelle révision officielle `page-CMqUxGM4.js`, SHA-256 `5a385b4cf6390e0b0713dab4effab3c322d177a148776472743fd38546a4d6a6`, non reconnue par la 1.17.0.
- Comparaison AST : seuls le garde de Mutilation et les composants d’abandon/pause ont changé ; les 67 symboles utilisés par les adaptations sont textuellement identiques. Identifiants, valeurs et fabrique des améliorations inchangés.
- Treize suites JavaScript et test Java de compatibilité des modules réussis. Refus des révisions inconnues, des déclarations partielles et des extensions incompatibles conservé. Génération de sauvegarde de combat inchangée pour ces deux moteurs compatibles.
- APK signée 1.17.1 / code 24 construite. Validation sur Thor à compléter après accord de relance, car une partie était ouverte au diagnostic.

# Version 1.17.0 — 9 octobre 2026

- Module officiel vérifié en ligne : `page-BhF3JBN0.js`, SHA-256 `67677958563db3126df72cb8c8dda684d3bff8256de0e4e15ca7adede66870e2`. Catalogue extrait des règles : quatre classes, 51 sorts distincts, 186 objets, quatre Dofus. Le jeu reste chargé depuis le site, sans copie de son moteur dans l’APK.
- Treize suites JavaScript et quatre tests Java réussis, dont encodage UTF-8, passifs conditionnels, nouvelles visées, portées et conservation du chemin de butin natif.
- Sur AYN Thor Android 13 avec build de vérification : chargement du nouveau module et de l’extension, parties Astrub et Litneg, fiche et image de Gelocoiffe sur le second écran, collection 2/4, accents français corrects. Les 237 images uniques des sorts/objets se décodent dans la WebView sans échec.
- Extension : soin, recharge, invincibilité, bonus, caractéristique, ajout/équipement et amélioration native d’Armure Venteuse essayés. Huit choix de boss invoqués, dont les trois Bandits de Cania et quatre Gelées Royales. Sauvegarde/reprise sur Astrub avec rechargement des sprites et retour aux kamas sauvegardés ; ancien emplacement restauré après essai.
- Sur des copies isolées d’état dans la WebView réelle : 159 choix d’amélioration, 159 évolutions et 558 fabrications d’objets (186 × trois jets) acceptés par les fonctions officielles. Ces contrôles ne constituent pas une partie jouée avec chaque sort/classe.
- APK finale signée 1.17.0 / code 23 installée par-dessus l’existante sur Thor : 95678 octets, SHA-256 `20e453a3aa04ed64948bbdbfd3183bf892040048ba92eed8b69ed4dc149dcb3e`, débogage désactivé. Démarrage et second écran vérifiés sur cette APK, accents et collection présents.
- Limites : pas de campagne complète ni de progression jouée jusqu’à Sufokia/Cania ; pas de mesure exhaustive des FPS, de partie sur téléphone ni d’essai Android 16. Les sauvegardes de combat de l’ancien moteur sont conservées et refusées, sans effacement. La progression permanente reste chargée par le normaliseur officiel.

# Vérifications

## Version 1.15.2

- Filtrage réseau : progression, récupération, classement, création de session et validation du build autorisés ; test Java réussi.
- Sur Thor Android 13 : lecture du classement HTTP 200 et création native de session HTTP 201. Partie d’essai mise en pause ; aucun score artificiel envoyé. La présence finale d’un score au classement reste soumise au serveur et n’a pas été validée par une partie terminée lors de cet essai.
- APK finale signée installée : version 21 / 1.15.2, débogage désactivé. SHA-256 : `d09c6e3d3be35510f4fe3ce0c3a3e5c68eec7943406e264fa272d914a0b6e268`.

## Version 1.15.1

- APK finale signée 1.15.1 / version 20 installée, débogage désactivé. Test du nuage répété sur l’APK finale par toucher Android : statut EN LIGNE et affichage du code avec sa note de confidentialité. SHA-256 : `6ce076a7bf2bac2d2e7d29bd6e213f9d38ee526feedbee9fad7bc3a4a25251a2`.

- Test Java du filtrage réseau réussi : progression, récupération et profil autorisés pour toutes les sessions ; règles existantes sur les autres chemins conservées. Test de visée radiale réussi, dont changement de portée pendant maintien. Formule comparée au module officiel : Téléportation `(150 + dashRange × 50)`, doublée par son évolution de portée.
- Sur Thor Android 13 en build de travail 1.15.1 : menu nuage « EN LIGNE », clic du bouton original « OBTENIR MON CODE », code de 24 caractères créé. Code secret non publié. Test d’un chemin de classement isolé : refus local 403 conservé.


## Version 1.15.0

- APK finale signée installée sur le Thor : version 19 / 1.15.0, cible API 35, débogage désactivé ; 87486 octets. SHA-256 : `ead4e5d9c58eacf044b452406d42bcd5b4122a895ce18e2c598d3e8d260d2b45`. Assets empaquetés vérifiés.

- Treize suites JavaScript, plus les deux tests Java de limitation des évaluations et de maintien des gâchettes. Vente testée : même identité, chaque effet inférieur/égal, protection d’un meilleur effet même avec un G global inférieur, nouveaux/rayonnants/permanents, chemin original conservé si désactivée.
- Sur la WebView réelle du Thor Android 13 : dialogue original de doublon inférieur fermé par la vente, kamas crédités ; réglage activé dans les paramètres Android et conservé après redémarrage. Le cas de comparaison a été préparé pour le test ; pas d’essai prolongé de toutes les tables de butin.
- Export effectué via le vrai sélecteur Android dans Téléchargements/Retro-Survival-progression.json ; import du même fichier effectué, cartes/records/collection inchangés. Pas d’autorisation de stockage étendue.
- L’adaptation native utilise exclusivement le module officiel dont le SHA-256 est vérifié. Si sa version change, l’adaptation ne s’applique pas. Le code du jeu est chargé depuis son site et n’est pas inclus dans l’APK.
- Option de vente traitée dans la lecture existante à 2 Hz ; aucun nouvel intervalle par image. Pas de mesure exhaustive des FPS ni d’essai Samsung Android 16.


## Version 1.13.2

- APK signées reconstruites : cible API 35, minimum API 28, version 17. Permission INTERNET uniquement, débogage désactivé. Onze suites JavaScript réussies.
- Adaptation des marges Android 15+ compilée ; aucun Samsung Android 16 / One UI 8.5 disponible pour une validation réelle de Play Protect ou de l’affichage.
- Selon Google, l’alerte de compatibilité apparaît quand la cible est plus de deux API derrière le système : API 33 sur Android 16/API 36 explique les captures. API 35 supprime cette cause ; les analyses d’APK inconnues restent possibles. https://developers.google.com/android/play-protect/warning-dev-guidance

Vérifications effectuées les 8 et 9 octobre 2026 sur un AYN Thor connecté, Android 13.

## Version 1.11.0

- Huit suites Node et test Java réussis. Mode buffs testé sans monstre pour chacun des cinq buffs actifs : Bouclier, Vitesse, Science du Bâton, Puissance, Invisibilité. Attaques, zones, invocations et déplacements exclus ; buffs actifs conservés, invisibilité jamais annulée, attente de disponibilité et état de lancer/pause respectés. Mode intelligent garde son comportement d’attente des ennemis. Changer de mode annule un ciblage automatique encore en vol.
- Planificateur : chemin buffs sans copie de monstres/pièges, sans choix de cible et sans lecture de portée pour un lancer instantané. Cadence 80 ms conservée. Tests du changement de mode, arrêt, temporisation des rejets et lecture des cibles seulement en mode intelligent réussis.
- Sélecteur natif observé sur le Thor : trois radios exclusives, désactivée initialement ; passages buffs → tous les sorts → buffs reconnus par la WebView. Préférence `autoSpellMode=buffs` enregistrée ; sensibilité 200 %, opacité 45 %, radial, alerte et second écran conservés. Ancienne préférence booléenne utilisée si le nouveau réglage n’existe pas ; cas historique désactivé observé à la première installation de travail.
- Sur la WebView réelle : Science du Bâton débloquée par un choix normal et lancée en mode buffs ; durée active 5,22 s et bouton indisponible observés. Aucun monstre requis dans les tests isolés. Libellés natifs anglais/espagnol et indicateur réel `Auto buffs` / `Mejoras auto` / `Buffs auto` vérifiés après les boutons de langue du jeu ; retour au français. Les quatre autres buffs sont couverts par les tests et l’audit, sans essai de chaque classe en partie.
- APK signé 1.11.0 installé en remplacement : version 12, débogage désactivé, assets comparés exactement aux sources, même package/signature. Mode buffs resté sélectionné après l’installation finale ; trois radios exclusives observées sur l’APK signé et captures actualisées. SHA-256 : `1190f5f248eab4c7feec741d5b52984a0c5828dc34a2048a699718fa47e5598b`, 62 500 octets.
- Sur l’APK signé : Bouclier Féca choisi dans une amélioration normale, lancé sans pression sur sa touche en mode buffs ; effet visuel et récupération observés et capturés. Trois captures de la 1.11.0 remplacent celles de la page principale : combat, sélecteur et fiche. Aucun état ou buff artificiellement écrit.
- Après les essais, assistance remise désactivée et langue française conservée. Aucun média enregistré sur le Thor.
- README simplifié, anciennes images et GIF retirés de la présentation principale. Guide séparé pour les détails des commandes, sauvegardes et compilation ; anciennes captures conservées dans le dépôt, sans les présenter comme la version courante.
- Graphify update tenté : même limitation locale (`uv trampoline failed to canonicalize script path`), aucun graphe existant.

## Version 1.10.0

- Huit suites Node réussies, plus le test Java de limitation des requêtes. Nouveau planificateur testé : buffs actifs, groupe plutôt que cible isolée, portée améliorée, attaque hors portée ignorée, téléportation de secours uniquement, retour dangereux refusé, pièges déjà présents, double conservé et aucune écriture d’état. Entrée ciblée sur deux images rendues, suivi du personnage au relâchement, annulation manuelle/désactivation, opt-in, pause, premier plan et temporisation des rejets vérifiés.
- Source officielle vérifiée le 9 octobre : `/_next/static/chunks/page-BH_6_gjC.js`, toujours référencée par le HTML public. Les sorts exclus du paquet actif (`area`, `bubble`, `flamiche`, `aggressiveGlyph`, `slyTrap`, `insidiousPoison`, `chakra`, `fourvoiement`, `divineSword`) sont déjà automatiques dans le jeu. L’assistance complète les boutons actifs ; les effets, terrain et délais restent validés par les handlers tactiles originaux. Aucun état, inventaire, score ou cooldown forcé.
- Sur la WebView réelle du Thor en version de travail : Libération, Bouclier Féca et Glyphe d’Immobilisation ont été déclenchés ; ce dernier est passé en récupération (`aria-disabled=true`, angle de cooldown observé). Aucune nouvelle tentative pendant une seconde de pause (6 avant/après). Des parties et choix réels ont été utilisés, sans débloquer artificiellement les sorts. Toutes les classes/évolutions n’ont pas été essayées en combat ; leurs règles sont couvertes partiellement par l’audit source et les tests isolés.
- Coût ponctuel du planificateur relevé entre 0,1 et 0,5 ms durant ces essais. Cent lectures du combat en pause, avec cinq ennemis : 2,8 ms au total. Ces relevés ne sont ni une mesure des FPS en combat, ni une comparaison prolongée avant/après, ni une mesure au maximum d’ennemis. Calcul chaque 80 ms uniquement si activé et disponible, 128 monstres et 24 centres maximum ; un toucher ciblé à la fois, aucune recherche de pixels ou requête réseau. Fiche toujours à 2 Hz, données inchangées non renvoyées.
- Réglage natif activé/désactivé et préférence persistante vérifiés. Libellé et explication Android relevés en anglais/espagnol ; indicateur testé après les vrais boutons de langue : `Auto spells`, `Hechizos auto`, `Sorts auto`. Retour au français. Suspension explicite ajoutée pour la perte de focus et l’arrière-plan Android, en plus des modales du jeu.
- APK signé 1.10.0 installé en remplacement, version 11 et débogage désactivé vérifiés. Les assets empaquetés correspondent exactement aux sources. SHA-256 : `f426a6074655498244eaa37d04cc4c800c8847bb24d1a2cdf2b1682a72235cda` (62 500 octets). Même package et signature ; aucune désinstallation ni remise à zéro.
- Sur l’APK signé : option activée dans le vrai dialogue Android, Glyphe d’Immobilisation et Science du Bâton choisis par des améliorations normales ; effets et boutons en récupération observés sans pression manuelle sur les sorts. Capture de combat publiée, ainsi que les paramètres et la fiche réelle du second écran. Captures sans sauvegarder de média sur le Thor. Option remise désactivée après les essais, langue française conservée.
- Limites : aide heuristique, pas de prédiction complète des projectiles, obstacles ou synergies. Le moteur peut corriger une destination sur le terrain. Les sorts instantanés gardent leur ciblage original ; les placements et sorts dirigés à maintenir reçoivent une cible choisie. L’assistance ne contrôle pas les déplacements ordinaires ni les choix d’amélioration et ne garantit pas la survie.
- Graphify update tenté ; outil toujours indisponible (`uv trampoline failed to canonicalize script path`), aucun graphe existant.

## Version 1.9.0

- Sept suites Node réussies, enrichies avec les transitions combat/choix, navigation au pad qui masque le pointeur, masquage après relâchement radial, exception de la visée précise, réglage de masquage, seuil de PV et désactivation de l’alerte. Aucun état du combat modifié par l’observateur. Cœur : valeurs actuelles/maxi, remplissages 0/20/60/100 % vérifiés. Test Java supplémentaire de limitation des requêtes réussi.
- Sur Thor : pointeur initialement masqué, visible après usage du stick droit dans un menu, masqué par une direction au pad et à l’entrée dans un choix ou une autre phase. Combat sans pointeur. Glyphe Enflammé débloqué par un vrai choix : cercle visible pendant le maintien, pointeur masqué pendant et après le lancement radial. Retour du Bâton maintenu en mode pointeur : visée active et pointeur visible, puis masqué après annulation.
- Désactivation du masquage et de l’alerte vérifiées, réactivation ensuite. Les deux réglages sont traduits FR/EN/ES ; le cœur et la fiche ont été observés en FR/EN/ES après les changements par le bouton du jeu. Aucun compteur d’ennemis conservé dans l’affichage ou le calcul final.
- Cœur inspiré de la forme et des couleurs observées dans le HUD officiel, rempli verticalement ; la barre horizontale est retirée. Alerte statique à 25 % ou moins, pas de clignotement ; donnée lue à 2 Hz. Une partie terminée à 0 PV n’est pas présentée comme une alerte de combat.
- Le coût d’observation reste ponctuel : ce n’est pas une mesure des FPS ou une comparaison prolongée avant/après. Aucun nouveau balayage du jeu par image pour les alertes ; la boucle de commandes adapte uniquement l’affichage du curseur, sans mesure de position DOM.
- Réglages natifs vérifiés sur appareil : les deux nouveaux interrupteurs ont été désactivés puis réactivés (préférences enregistrées), sensibilité 200 %, opacité 45 %, radial et second écran activés conservés. Langue du cœur observée FR/EN/ES, retour au français. Icône de kamas : URL relevée dans le HUD réel, `https://retrosurvival.online/assets/kama-symbol.svg`, réponse SVG 200 vérifiée ; symbole chargé en ligne, non copié dans l’APK.
- Un ANR temporaire a été observé dans la version de travail pendant une navigation de test, avec requêtes d’entrée retardées. Un essai de navigation après cette protection s’est déroulé sans nouveau blocage observé ; cela reste un essai ponctuel. Protection ajoutée : une seule évaluation en attente par boucle, callbacks périmés ignorés après navigation, commandes suspendues hors focus et fiches identiques non renvoyées. Test Java : 10 000 tentatives pendant une réponse retardée, callbacks doublés et ancienne page, reprise normale. La cause complète de l’ANR n’est pas prouvée ; cette protection évite l’accumulation et ne constitue pas une garantie universelle.
- APK signé 1.9.0 reconstruit et installé sans désinstallation : version 10 / 1.9.0, débogage désactivé. Tous les assets embarqués comparés exactement aux sources. SHA-256 : `6e0f8689a7c46b056f207b1419870dfa14aabc324f71b00562752a9154852fb2`.
- Sur l’APK signé : choix de sort sélectionné par croix Android injectée, pointeur absent ; capture réelle publiée. Fiche avec cœur 5/5, symbole officiel des kamas chargé et 13 caractéristiques visibles capturée. Aucun nouveau ANR observé dans le journal durant cet essai après la protection.
- L’alerte à 25 % est couverte par les tests isolés ; aucun PV ou état de jeu forcé pour une capture. Les captures montrent les valeurs réelles de la partie. Aucun test prolongé sur d’autres appareils ou manettes externes.
- Graphify update tenté, même limitation locale de l’outil (`uv trampoline failed to canonicalize script path`), aucun graphe existant.

## Version 1.8.0

- Sept suites Node réussies : visée/sorts/navigation/observateur/langue et nouvelle suite collection. Lecture sans écriture de sauvegarde, collection vide, sauvegardes invalides, possession normale/rayonnante, bornes, objet inconnu et cache vérifiés. Le détail des jets est replié par défaut ; une seconde pression le ferme ; changer les PV ne reconstruit pas la collection.
- Règles de collection et jets comparés au module actuel du site officiel ; méthode et valeurs dans [docs/collection.md](docs/collection.md). Aucun drop rare obtenu durant ces essais : les captures affichent la vraie collection **0/2**. Possession, meilleur jet et rayonnants couverts par lecture des fonctions du jeu et tests isolés.
- Sur la WebView réelle du Thor : cartes permanentes à l’accueil et en partie ; ouverture/fermeture du détail Cawotte ; bornes 6/50 et rayonnant 75. Langue changée par le bouton du jeu : anglais, espagnol, français. Titres, cartes et détail vérifiés dans les trois langues ; retour au français.
- Fiche compacte : les 13 caractéristiques tiennent dans la colonne du Thor lorsque le détail de collection est fermé. Les colonnes restent défilables lorsqu’un détail est ouvert. Les emplacements d’équipement vides ne remplissent plus la fiche, et les Dofus ne sont pas répétés dans l’équipement.
- Mesure ponctuelle sur appareil : 100 snapshots en 7,8 ms et 100 lectures de collection inchangée en 0,2 ms. Fiche actualisée à 2 Hz, collection et blocs inchangés mis en cache. Le relevé de 593 callbacks d’animation en cinq secondes a été pris avec un choix d’amélioration ouvert : il ne constitue pas une mesure des FPS en combat. Pas de garantie de performance universelle ni de comparaison prolongée avant/après.
- APK signé reconstruit et installé en remplacement sans désinstallation : version 9 / 1.8.0, débogage désactivé, tous les fichiers embarqués comparés exactement aux sources. Paramètres avant installation : sensibilité 200 %, opacité 45 %, fiche et visée radiale activées. Même package et même clé locale ; aucune remise à zéro des données. Paramètres après installation relevés dans le vrai dialogue Android : 200 %, 45 %, visée radiale et second écran activés, manette Odin Controller détectée. Captures finales prises sur l’APK signé : 13 caractéristiques visibles, puis ouverture du détail au toucher sur le second écran.
- GitHub et le nom du téléchargement présentent Android et manettes. AYN Thor reste l’appareil réellement essayé ; manettes externes Xbox/Switch et autres appareils Android non essayés matériellement.
- Actualisation Graphify tentée : outil indisponible (`uv trampoline failed to canonicalize script path`). Aucun graphe existant dans ce projet ; recherches ciblées et vérifications directes utilisées.

## Version 1.7.0

- APK signé 1.7.0 installé en remplacement sans désinstallation ; version 8 / 1.7.0 et débogage désactivé vérifiés. Scripts embarqués comparés exactement aux sources vérifiées.
- En partie active pendant cinq secondes : 592 callbacks d’animation du navigateur, soit 118,36 par seconde sur le Thor ; intervalle maximum 16,67 ms, toutes les observations en phase-playing. Ce relevé ponctuel concerne l’animation de la WebView, pas un compteur interne des FPS du jeu ni un essai prolongé de toutes les situations.

- Langue changée par les vrais boutons du jeu : anglais, espagnol puis français. Titres, contrôles, réglages et boutons du dialogue Android relevés sur le Thor dans les trois langues. Même essai depuis la pause pour la fiche réelle du second écran : titres, caractéristiques et valeurs numériques conservées, dont +15 % de dommages d’attaque. Retour au français à la fin.
- Suite langue/panneau : synchronisation initiale, FR/EN/ES, langue invalide ignorée et mises à jour incrémentales. Suite observateur : valeurs de caractéristiques anglaises/espagnoles, expiration du cache et lecture immédiate au lancement couverts.
- Mesure ponctuelle sur Thor : 100 lectures forcées des améliorations prennent 2,5 ms ; 100 lectures en cache sont en dessous de la résolution du chronomètre. Une autre mesure donne 20 snapshots en 2,1 ms. Ce sont des coûts de fonctions, pas une comparaison des FPS avant/après ni une garantie de performance dans toutes les scènes. Le relevé d’animation à 118,8 images/s a été pris pendant une transition de sélection de niveau et n’est donc pas présenté comme une validation du gameplay en combat.
- Désactivation de la fiche dans les paramètres : sa WebView disparaît alors que celle du jeu reste présente ; réactivation vérifiée. Second écran compatible détecté affiché dans les paramètres.

- Six suites Node réussies, dont la navigation : pressions distinctes, répétition temporisée, boucle entre boutons, choix désactivés ignorés, changement de phase, sélection périmée rejetée et validation unique. Les quatre suites précédentes restent réussies.
- Sur le Thor, croix droite injectée via Android : JOUER sélectionné à l’accueil, puis R3 ouvre le choix de niveau. Sélection de JOUER et lancement de partie par R3 observés après la transition du jeu.
- Choix d’amélioration débloqué naturellement : droite sélectionne Science du Bâton, droite passe aux dommages d’attaque, gauche retrouve Science du Bâton. R3 ferme le choix et reprend la partie. Capture réelle ajoutée au README. Aucun état de jeu modifié pour forcer le niveau ou les choix.
- Pause réelle ouverte avec Start injecté via Android ; manette interne « Odin Controller » détectée et affichée dans les paramètres. Le stick est vérifié par le même pont que la boucle native et par les tests automatisés ; les pressions sur la croix et R3 sont des événements Android injectés.
- Les fenêtres avec saisie de texte et les sélecteurs non constitués de boutons peuvent encore nécessiter le tactile ou le pointeur.
- Une manette Xbox/Switch externe, son appairage Bluetooth, sa déconnexion physique et un autre appareil Android n’ont pas été essayés. Leurs chemins d’entrée sont compilés et comparés aux API Android, sans prétendre à une validation matérielle. Le retrait physique d’un second écran n’a pas été essayé.

## Version 1.6.0

- Quatre suites Node réussies. Direction, distance réglable et conservée au retour au centre, seuil tactile minimal, évolution dynamique de portée de Couper, destination imposée du Double, attaques directionnelles sans faux rayon et exception du Glyphe enflammé instantané couverts.
- Portées comparées aux fonctions du jeu actuel. Téléportation, Bond, Retour du Bâton et Couper lisent leurs améliorations à chaque image ; la taille des zones de glyphes reste distincte de leur portée de placement fixe de 200 unités.
- Glyphe d’immobilisation débloqué normalement sur le Thor. Maintien de la touche du sort et déplacement injectés par Android ; direction et inclinaison envoyées au pont du stick droit. Aucun déblocage ou déplacement forcé par écriture dans l’état du jeu.
- Guide observé à la position du personnage pendant son déplacement. Inclinaison à mi-course utile : vecteur (0 ; -53,522) pixels CSS. Stick à fond : (0 ; -107,045). Retour au centre : direction et distance conservées. Relâchement d’une autre touche : maintien conservé. Relâchement de la touche du sort : récupération réelle démarrée, guide et rayon supprimés, pointeur réaffiché.
- Nouveau réglage affiché sur l’appareil, désactivation/réactivation au toucher et stockage de la préférence activée vérifiés. Sensibilité existante à 200 % et opacité à 45 % conservées.
- APK signé 1.6.0 installé en remplacement sans désinstallation. Version 7 / 1.6.0, débogage désactivé et préférence radiale activée après mise à jour vérifiés.
- Capture réelle du placement ajoutée au README. Les améliorations de portée et les autres classes sont vérifiées par tests automatisés et lecture des fonctions du jeu, pas toutes essayées en partie. Les sticks physiques ensemble restent à essayer manuellement.

## Version 1.5.0

- Quatre suites Node réussies : visée radiale, suivi de visée au pointeur, attribution des sorts et observateur. Direction du stick gauche, orientation à l’arrêt, suivi du personnage, direction directe du stick droit, conservation au retour au centre, portée de Bond améliorée et doublée, destination de retour imposée et restauration du pointeur couverts.
- Types et portées comparés aux fonctions du jeu : Téléportation (`dash`), Bond (`jump`) ; Double du Sram conserve son échange avec un double existant plutôt qu’une destination libre.
- Téléportation débloquée normalement dans une partie réelle sur le Thor, attribuée à R1. R1 et croix droite injectés via Android : vecteur initial de visée (80,409 ; 0) pixels CSS, conservé pendant le déplacement du personnage ; rayon et destination suivent sa position.
- Direction haute envoyée au même pont que le stick droit : vecteur (0 ; -80,283). Retour au centre du stick : direction haute conservée. Curseur habituel masqué pendant le maintien ; rayon visible. Relâchement de R1 : déplacement réel du personnage, récupération du sort démarrée, rayon supprimé et curseur réaffiché.
- Capture réelle ajoutée au README. Les déblocages et déplacements n’ont pas été forcés par écriture dans l’état du jeu.
- APK signé 1.5.0 installé en remplacement sur le Thor, sans désinstallation ; numéro de version et débogage désactivé vérifiés, accueil du jeu observé après lancement.
- Bond et l’évolution de retour sont couverts par les tests automatisés et la comparaison aux fonctions du jeu ; ils n’ont pas été essayés en partie. L’essai manuel des sticks et gâchettes physiques ensemble reste à faire. Le rayon représente la portée du sort ; la position d’arrivée effective reste décidée par le jeu selon le terrain.

## Version 1.4.0

- Tests Node de la visée, des affectations et de l’observateur réussis. Visée depuis une position différente de l’icône, déplacement du personnage avec cible fixe, actualisation entre deux images au relâchement, annulation si la position devient indisponible, coordonnées avec mise à l’échelle du canvas et remplacement du modèle de partie couverts.
- Partie réelle sur Thor, Glyphe d’immobilisation débloqué normalement. L1 et croix droite maintenus par injection Android ; pointeur déplacé par le pont utilisé par le stick droit.
- Position initiale du personnage lue à (410,708 ; 312,861), puis à (414,489 ; 312,662), en pixels CSS. Départ du guide observé aux mêmes coordonnées. Cible immobile à (249,9 ; 211,05) ; le vecteur de visée lu dans le jeu correspond exactement à cible moins position actuelle du personnage dans les deux relevés.
- Relâchement de L1 : guide supprimé et récupération du glyphe commencée. Aucun état de jeu modifié pour forcer les déblocages ou la position.
- Réglage de sensibilité affiché sur l’appareil, extrêmes 25 % et 250 % sélectionnés au toucher ; stockage Android vérifié. Retour à 100 % et réouverture du menu vérifiés.
- APK signé 1.4.0 installé en remplacement sans désinstallation. Version installée vérifiée, débogage désactivé, réglage 100 % conservé après mise à jour et observé dans les paramètres de cet APK.
- Les essais utilisent des commandes Android injectées et le pont du pointeur. Un essai manuel combinant les deux sticks et toutes les gâchettes physiques reste nécessaire pour valider le confort ; tous les sorts et toutes les situations de déplacement n’ont pas été essayés.

## Version 1.3.0

- Tests Node du routage des sorts et de l’observateur réussis ; compilation et signature vérifiées.
- Classification comparée au gestionnaire tactile du site en ligne : 14 types de sorts à viser, avec exception du Glyphe enflammé à l’évolution 2. Aucune modification de l’état du jeu pour ces vérifications.
- Sur le Thor, Glyphe d’immobilisation débloqué normalement et attribué à L1 ; Bouclier Féca attribué à X.
- Sur une autre partie, Glyphe enflammé débloqué normalement : maintien de L1 injecté via Android, déplacement du pointeur par le même pont JavaScript que le stick droit. Guide de visée réellement affiché. Relâchement d’un autre bouton : guide conservé. Relâchement de L1 : guide disparu et récupération du glyphe démarrée (`aria-disabled=true`).
- Les tests automatisés couvrent aussi le lancement instantané sans terminer une visée maintenue et l’annulation sans lancement lors de la perte de focus.
- APK signé 1.3.0 installé en remplacement sur le Thor, sans désinstallation ; lancement du jeu sur l’écran supérieur et fiche de personnage sur l’écran inférieur observés. Le débogage WebView est désactivé dans cet APK publié.
- La visée a été observée dans le jeu réel avec une commande Android injectée. Un essai manuel des gâchettes et du stick droit physiques ensemble reste à faire ; toutes les classes et évolutions n’ont pas été testées en partie.

## Version 1.2.0

- Compilation, signature APK et syntaxe JavaScript vérifiées ; contrat de l’observateur validé avec `node tests/telemetry.test.js`.
- Le test de l’observateur couvre la branche React montée, les totaux avec bonus, plusieurs anneaux, l’absence de statistiques, les valeurs invalides et l’absence d’écriture dans l’état du jeu. Il reste distinct des essais sur appareil.
- Panneau réellement affiché sur l’écran inférieur du Thor, pendant que le site officiel s’exécute sur l’écran supérieur.
- Lecture de 5/5 PV, puis actualisation après dégât à 4/5 PV, observée pendant une partie d’essai.
- Ceinture du Piou Jaune obtenue en partie : nom, icône et effet +15 % de vitesse d’attaque lus depuis le jeu ; total +15 % et bonus d’équipement +15 % vérifiés face aux caractéristiques du menu pause.
- Amélioration de vitesse d’attaque choisie en partie : +15 % affiché avec bonus d’équipement vide, ce qui distingue l’amélioration du personnage du bonus d’un objet.
- Kamas : compteur réel observé à 0, puis à 100 pendant la partie sur la version signée ; capture du panneau avec 100 kamas.
- Version signée : Chapeau du Piou Jaune affiché avec icône et bonus ; appui tactile sur l’objet puis défilement de la colonne pour lire son effet +15 % de vitesse d’attaque.
- Pause affichée sur la fiche ; suppression puis recréation du panneau vérifiées avec le réglage de deuxième écran.
- Après un appui tactile sur l’écran inférieur, Start injecté via Android continue à commander la pause du jeu sur l’écran supérieur.
- Version signée 1.2.0 installée sur le Thor ; captures du panneau issues de cet APK sans débogage.

La lecture s’appuie sur l’état et le HUD actuellement exposés par le site. Une évolution de leur structure peut rendre le panneau indisponible. Le cycle de déconnexion physique d’un écran et les autres appareils Android n’ont pas été testés.

## Version 1.1.0

- Compilation Java et vérification de syntaxe JavaScript réussies.
- Construction et signature APK vérifiées.
- Interface Android tactile conservée : pointeur tactile, joystick et sorts visibles pendant la partie.
- Déplacement par une commande de croix injectée via Android, avec le joystick visuel observé dans le coin inférieur gauche.
- Un sort débloqué affiche la touche **X** ; aucun repère de bouton n’est ajouté aux emplacements inexistants.
- Désactivation des étiquettes vérifiée sur un sort débloqué ; opacité à 30 % puis à 45 % vérifiée.
- Préférences enregistrées dans Android : affichage des étiquettes et valeur d’opacité.
- Étiquette réaffichée après fermeture puis reprise du menu pause.
- Menu de paramètres observé sur le Thor et accessible avec Select.
- Bouton **⚙ Thor** vérifié par un appui tactile ; les paramètres s’ouvrent et affichent les préférences enregistrées après mise à jour.
- Ouverture des paramètres en partie : pause activée automatiquement ; fermeture : reprise vérifiée. Une pause déjà ouverte est conservée.

## Contrôles de base

- Lancement depuis le menu Cocoon observé.
- R3 injecté via Android produit un clic tactile natif reconnu par le navigateur et valide un choix de niveau.
- Croix droite injectée via Android : déplacement réel de x=750 à x=815.869, y stable.
- Mouvements du stick droit physique reçus et pointeur doré visible.
- Pause via Start vérifiée en partie.

Ces vérifications ne remplacent pas un test manuel complet des boutons physiques, de tous les sorts, de leurs directions de visée et d’une session longue. Les autres appareils Android n’ont pas été testés.

## Correctif 1.11.1 — maintien des gâchettes (9 octobre 2026)

- Régression identifiée : `dispatchGenericMotionEvent` lisait un axe L2/R2 nul lors du mouvement des sticks et retirait le bouton du même ensemble `held` que les événements clavier. Cela pouvait relâcher un sort encore maintenu avec une gâchette signalée comme bouton.
- Les états bouton et axe sont désormais indépendants, avec un seul appui/relâchement effectif. Annulation et nettoyage sur perte de focus, navigation et déconnexion conservés. Aucun délai artificiel de lancer, aucune modification du jeu distant.
- Test Java `TriggerHoldTest` : L2/R2, 10 000 mouvements à axe nul par touche maintenue, répétitions, manettes bouton/axe/double signal, indépendance et remise à zéro. Tests JavaScript existants passés ; ajout de 300 mouvements radiaux avec Retour du Bâton, portée améliorée et un seul lancer au vrai relâchement.
- Sur Thor, APK debug 1.11.1 : événements Android natifs injectés via le système (appui L2/R2, 15 mouvements du stick droit avec axes de gâchettes nuls, relâchement après environ 2 secondes). La trace WebView contient exactement un appui et un relâchement par touche, sans relâchement intermédiaire. Cela valide le chemin Android réel ; ce n’est pas une mesure du signal électrique des gâchettes physiques.
- Partie réelle, Retour du Bâton débloqué par le choix normal d’amélioration, attribué à L1 : cercle et ligne présents à 800 et 1 600 ms malgré les mouvements du stick ; sort disponible pendant le maintien, puis repères supprimés et cooldown actif après relâchement. Assistance automatique désactivée pendant cet essai.
- APK finale signée 1.11.1 (code 13) compilée et installée par-dessus l’existante, sans effacement des données. Signature v3 vérifiée ; paquet installé sans flag DEBUGGABLE. Le test détaillé instrumenté en jeu a porté sur l’APK debug, la finale a été installée et ouverte.
- SHA-256 APK finale : `659f766e3e2f671da8a987790c003b63f4f8970254d4db9393617fb0dc3c15eb`.
- Outil d’injection temporaire retiré du Thor et connexion de diagnostic fermée. Captures et résultats de test conservés uniquement sur PC ; aucune nouvelle vidéo de présentation.

## 1.12.0 — pages interactives et exceptions par classe (9 octobre 2026)

- Neuf suites JavaScript passent, dont la nouvelle politique par classe : nettoyage des IDs, séparation Féca/Iop/Sram, héritage off/buffs/full, passifs exclus du planificateur et filtrage réel du scheduler. Un changement d’exception manuelle annule un toucher automatique déjà en préparation. Les deux suites Java (maintien des gâchettes et file WebView bornée) passent.
- Sur Thor, version de diagnostic : glissements Android réels gauche/gauche/droite sur l’écran logique 4, naviguant Personnage → Sorts → Options → Sorts. Le défilement vertical est conservé ; les curseurs de réglage n’entraînent pas un changement de page. Gestion tactile dédiée nécessaire : WebView annulait la séquence PointerEvent pendant ses gestes natifs.
- Touchers Android réels : Bouclier Féca manuel, Bond manuel puis Invisibilité manuelle. Les trois listes d’exceptions sont indépendantes et persistées dans les préférences Android. Réouverture complète vérifiée : les trois exceptions et le mode global sont restaurés. Tentatives d’ID inconnu, passif et sensibilité hors limites rejetées.
- Passage par la page Options de full à buffs appliqué au scheduler du jeu ; sensibilité 125 % enregistrée. Langue changée par le bouton original du jeu : onglets Character/Spells/Options en anglais, Personaje/Hechizos/Opciones en espagnol, retour français.
- Partie réelle : Bouclier débloqué par un choix normal. En mode buffs avec Bouclier manuel, aucun lancement supplémentaire et sort disponible. En retirant l’exception, le compteur de lancements augmente, le bouclier devient actif (timer 3,17 s observé) et le cooldown apparaît. Ce test de gameplay a porté sur la version de diagnostic ; aucune vie, progression, vague ou équipement écrit directement.
- APK finale signée 1.12.0, code 14, compilée et installée sur l’existante sans effacer les données ; signature v3 vérifiée et flag DEBUGGABLE absent. Touchers et navigation de la finale essayés ; une exception Bouclier sauvegardée a été retrouvée après fermeture/réouverture de cette finale. Captures README réalisées sur l’APK signée.
- Réglages temporaires retirés et valeurs utilisateur restaurées : assistance full, sensibilité 200 %, français, aucune nouvelle exception manuelle. Les réglages peuvent être modifiés directement dans les nouvelles pages. Diagnostic USB WebView fermé.
- Pas de capture vidéo ni fichiers de test ajoutés à l’appareil. Images de présentation et résultats gardés sur PC. Montages du Thor avec les captures réelles des deux écrans, boîtier de présentation réutilisé.
- Coût borné : scheduler toujours à 80 ms, filtrage d’une petite liste avant calcul des cibles, lecture des monstres toujours évitée en buffs ; classe ajoutée à la télémétrie existante. Listes et options du bas reconstruites seulement si classe/langue/déblocages/préférences changent, transmission conservée à 500 ms. Aucune promesse de FPS issue de ces contrôles.
- SHA-256 de l’APK finale : `aa0a140d9bd36cd0cfa5a44ddbeb7725849f78f372cf183574dd343e40255220`.

## 1.13.0 — butin, boutique et raccourcis (9 octobre 2026)

- Dix suites JavaScript passent, dont les comparaisons de butin avec panneau équipé sans boutons, la sélection après inspection et le retour de dialogue imbriqué. Ces cas utilisent des reproductions DOM des composants observés dans le code du jeu ; aucun nouveau drop de comparaison ni boutique réelle reproduits dans cette session.
- Affectation de sept sorts, dont Libération sur A, et de vingt futurs sorts couverte. Combinaisons testées : annulation de la visée du modificateur sans lancer, sort instantané différé, relâchement propriétaire, annulation du maintien et priorité manuelle sur l’assistance. Les deux suites Java de maintien et limitation des lectures passent.
- Sur le Thor réel : paramètres natifs et page Sorts, enregistrement d’une combinaison Libération L1 + Y et d’une affectation Bouclier A via le pont de l’éditeur. La liste s’actualise et le raccourci Bouclier apparaît dans les affectations du jeu. Pressions A injectées via Android reçues ; le Bouclier était en récupération, donc aucun lancer réussi avec A validé pendant cet essai. Sept sorts et toutes les combinaisons physiques restent à essayer en partie.
- Nouvelle fenêtre de raccourcis sur l’écran principal : hauteur de contenu corrigée après contrôle visuel. APK signée finale installée, fenêtre lisible et captures réalisées. Version 1.13.0 / code 15, signature v3, DEBUGGABLE absent. Réglages de test retirés ; mode full et exceptions manuelles Téléportation/Libération conservés.
- Une nouvelle partie a été lancée normalement et laissée en pause avec Start, niveau 2 / vague 1. L’ancienne partie a été interrompue avec accord explicite.
- Fiche toujours à 2 Hz et rendu des sorts uniquement quand les informations changent ; aucune nouvelle boucle permanente. Pas de mesure de FPS ni de test prolongé de performance pour cette version.
- SHA-256 APK finale : `397429aaabf8dd7529141a0fe27eb07d810576ec0a4b1346940e05b3c0cdbf92`.

## 1.13.1 — sélecteurs sur le second écran (9 octobre 2026)

- Le journal du Thor contient un arrêt fatal de Chromium/JNI lors des ouvertures de listes sur le second écran. Les listes natives HTML select sont remplacées par des boutons ouvrant une liste dans le document, sans demander une fenêtre Android.
- Test isolé : ouverture, sélection, rappel de sauvegarde, fermeture sans changement, fermeture au changement de page et absence de création de select natif.
- Sur le Thor : toucher du bouton Automatique dans Sorts, affichage des 25 choix dans la WebView réelle, processus conservé. Les menus de raccourcis et d’assistance utilisent le même sélecteur.


## 1.16.0 — équipement et mises à jour (9 octobre 2026)

- Défaut reproduit sur la version 1.15.2 réelle : images vides et identifiants internes, avec colonne équipement défilée et titre coupé. La télémétrie cherchait un ancien nom de fichier `item-<id>.`.
- Correspondance corrigée par `memoizedProps.item.id` dans les composants React du HUD. Recherche bornée par carte, aucune écriture de l’état du jeu. Régression testée avec cartes désordonnées et icônes indépendantes de l’identifiant : noms, images et effets corrects.
- Toutes les 13 suites JavaScript passent, dont B non assigné / menu / sort instantané. Comparaison Java de versions stable testée : égalité, versions inférieures, ordre numérique, préversions et tags invalides rejetés.
- Nouvelle APK 1.16.0 / code 22 construite et signature v3 vérifiée. Compilation avec la bibliothèque Android API 33 disponible, cible Android 35 conservée.
- Contrôle de mises à jour : API GitHub publique, réponse bornée à 256 Kio, délais de connexion/lecture, vérifications espacées de six heures, asset officiel attendu, refus des brouillons/préversions. Notification optionnelle et contrôle quotidien JobScheduler persistant ; aucune installation silencieuse.
- Installation de diagnostic autorisée par l’utilisateur. Nouvelle partie lancée normalement : les deux objets permanents du HUD sont retrouvés par leur identité réelle, avec noms traduits, effets et URLs corrects ; l’icône Cawotte ne contient pas l’ID de l’objet dans son nom de fichier. Images de collection chargées dans la WebView du second écran. Aucun équipement Wabbit ordinaire récupéré pendant cet essai : leur correction est couverte par le test de régression et la correspondance générique, pas par un nouveau drop réel.
- Start injecté par Android ouvre la pause ; B injecté laisse la pause ouverte. Aucun changement de l’état du jeu écrit directement pendant ces contrôles.
- Vérification réseau GitHub effective sur Thor : dernière version v1.15.2 récupérée et correctement non proposée comme plus récente que 1.16.0. Tâche Android 16001 / UpdateJob réellement enregistrée. Notification d’une future version et confirmation d’installation depuis une notification non testées de bout en bout.
- APK finale signée 1.16.0 installée par-dessus l’existante après le diagnostic, sans effacement des données ; version/code vérifiés et flag DEBUGGABLE absent. Publication GitHub autorisée. SHA-256 : 6807a43b64af56d3564e9ff7ac3ee494aa7ac0e22448d61cbfdb31757db82825.
