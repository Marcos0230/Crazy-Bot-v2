const Discord = require('discord.js'); // require le module discord.js

module.exports = { // exporte la commande ping
    name: 'ping',

    async run(client, message) { // execute la commande ping
        await message.reply('Pong !\nLatence : ' + client.ws.ping + 'ms'); // répond à l'utilisateur avec le ping du bot
    }
}