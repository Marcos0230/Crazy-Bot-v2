const Discord = require('discord.js'); // require le module discord.js

module.exports = { // exporte la commande ping
    name: 'ping', // nom de la commande
    description: 'Ping le bot', // description de la commande
    permission: 'Aucune', // permission nécessaire pour exécuter la commande
    dmPermission: true, // permission nécessaire pour exécuter la commande en message privé

    async run(client, message) { // execute la commande ping
        await message.reply('Pong ! 🏓\nLatence : ' + client.ws.ping + 'ms <:XD:770652549895553054>🤙'); // répond à l'utilisateur avec le ping du bot
    }
}