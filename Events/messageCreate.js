const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (client, message) => {
    let prefix = config.prefix;

    let messageArray = message.content.split(" ");
    let commandName = messageArray[0].slice(config.prefix.length);
    let args = messageArray.slice(1);

    if (!message.content.startsWith(config.prefix)) return;

    let command = require(`../Commandes/${commandName}`);
    if (!command) {
        message.reply("Cette commande n'existe pas !");
    }

    command.run(client, message, args);
}