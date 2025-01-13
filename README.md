# Projet_Collectif_Extension_Navigateur

# Zen Plugin - Extension Chrome pour des pauses bien-être

# Description:
Zen Plugin est une extension Chrome qui vous aide à maintenir votre bien-être en vous rappelant de prendre des pauses régulières. L'extension propose des rappels personnalisables et vous guide vers des citations, images, sons et des vidéos de méditation et de relaxation pour des moments de détente pendant votre journée de travail.

# Fonctionnalités
1.Rappels de pause:
    *Option de pause de 30 minutes
    *Option de pause de 60 minutes
    *Possibilité de reporter la pause dans 5 minutes

2.Notifications:
Notifications personnalisées avec deux options :

3.Offrir un choix:
Accepter et commencer la pause
Reporter la pause de 5 minutes


Les notifications restent visibles jusqu'à ce que l'utilisateur interagisse avec elles

# Vidéos zen
*Sélection aléatoire parmi une collection de vidéos de méditation et relaxation
*Ouverture automatique dans un nouvel onglet lors du début de la pause
*Collection de vidéos soigneusement sélectionnées pour des pauses de 5 à 10 minutes

# Installation

1.Téléchargez les fichiers de l'extension
2.Ouvrez Chrome et allez dans chrome://extensions/
3.Activez le "Mode développeur"
4.Cliquez sur "Charger l'extension non empaquetée"
5.Sélectionnez le dossier contenant les fichiers de l'extension

# Utilisation

1.Cliquez sur l'icône de l'extension dans la barre d'outils
2.Choisissez la durée souhaitée avant votre prochaine pause (30 ou 60 minutes)
3.Attendez la notification de pause
4.Quand la notification apparaît, vous pouvez :
    *Commencer votre pause (un divertissement de bien-être vous sera proposé)
    *Reporter la pause de 5 minutes

# Fichiers du projet

background.js : Gestion des alarmes, notifications et lecture des vidéos,sons,images et citations de bien-être
manifest.json : Configuration de l'extension
popup.html : Interface utilisateur de l'extension
icon.png : Icône de l'extension

# Permissions requises

alarms : Pour la gestion des rappels
notifications : Pour afficher les notifications
tabs : Pour ouvrir les vidéos dans de nouveaux onglets
storage : Pour la gestion des données locales