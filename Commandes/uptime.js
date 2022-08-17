const Discord = require('discord.js'); // require le module discord.js

module.exports = { // exporte la commande uptime
    name: 'uptime', // nom de la commande
    description: 'Donne le uptime du bot', // description de la commande
    permission: 'Aucune', // permission nécessaire pour exécuter la commande
    dmPermission: true, // permission nécessaire pour exécuter la commande en message privé

    async run(client, message) { // execute la commande uptime
        let days = Math.floor(client.uptime / 86400000); // calcule le nombre de jours
        let hours = Math.floor(client.uptime / 3600000) % 24; // calcule le nombre d'heures
        let minutes = Math.floor(client.uptime / 60000) % 60; // calcule le nombre de minutes
        let seconds = Math.floor(client.uptime / 1000) % 60; // calcule le nombre de secondes

        await message.reply(`__**Uptime :**__\nJe suis online depuis **${days}** jours, **${hours}** heures, **${minutes}** minutes, **${seconds}** secondes !`); // répond à l'utilisateur avec le uptime du bot
    }
}