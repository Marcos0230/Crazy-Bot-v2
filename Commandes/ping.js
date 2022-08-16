const Discord = require('discord.js'); // require le module discord.js

module.exports = { // exporte la commande ping
    name: 'ping',
    description: 'Ping le bot',
    permission: 'Aucune',
    dmPermission: true,

    async run(client, message) { // execute la commande ping
        await message.reply('Pong ! 🏓\nLatence : ' + client.ws.ping + 'ms <:XD:770652549895553054>🤙'); // répond à l'utilisateur avec le ping du bot
    }
}