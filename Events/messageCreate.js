const Discord = require('discord.js'); // require le module discord.js
const config = require('../config.js'); // config.js est un fichier contenant les paramètres du bot

module.exports = async (client, message) => {
    let prefix = config.prefix; // prefix est le prefix du bot

    let messageArray = message.content.split(' '); // messageArray contient le message séparé par des espaces
    let commandName = messageArray[0].slice(prefix.length); // commandName contient le premier mot du message
    let args = messageArray.slice(1); // args contient les arguments du message

    if(!message.content.startsWith(prefix)) return; // si le message ne commence pas par le prefix, on sort de la fonction

    let command = require(`../Commandes/${commandName}`); // command est la commande correspondant au message
    if(!command) return message.reply("Pas de commande renseignée ! / Commande inconnue !"); // si la commande n'existe pas, on sort de la fonction

    command.run(client, message, args); // execute la commande
}