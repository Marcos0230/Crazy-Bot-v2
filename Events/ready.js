const Discord = require("discord.js");
const loadSlashCommands = require("../Loader/loadSlashCommands.js");

module.exports = async (client) => {
    await loadSlashCommands(client);

    console.log(`Connecté en tant que ${client.user.tag} ! Aucun problème détecté.\nAu total, ${client.users.cache.size} utilisateurs, dans ${client.channels.cache.size} salons de ${client.guilds.cache.size} serveurs.`);
}