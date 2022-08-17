const Discord = require('discord.js'); // require le module discord.js
const loadSlashCommands = require('../Loader/loadSlashCommands'); // require le fichier loadSlashCommands.js

module.exports = async (client) => { // exporte la fonction ready
    await loadSlashCommands(client); // on charge les commandes slash

    console.log(`Connexion à ${client.user.tag} réussie ! Aucun problème n'a été détecté.`); // affiche dans la console que le bot est connecté au serveur Discord
}