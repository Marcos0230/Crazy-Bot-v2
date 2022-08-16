const Discord = require('discord.js');
const loadSlashCommands = require('../Loader/loadSlashCommands'); // require le fichier loadSlashCommands.js

module.exports = async (client) => {
    await loadSlashCommands(client);

    console.log(`Connexion à ${client.user.tag} réussie ! Aucun problème n'a été détecté.`); // affiche dans la console que le bot est connecté au serveur Discord
}