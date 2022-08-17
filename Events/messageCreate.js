const Discord = require('discord.js'); // require le module discord.js
const config = require('../config.js'); // config.js est un fichier contenant les paramètres du bot

module.exports = async (client, message) => {
    if (message.author.bot) return; // si l'auteur du message est un bot, on sort de la fonction

    let prefix = config.prefix; // prefix est le prefix du bot

    let messageArray = message.content.split(' '); // messageArray contient le message séparé par des espaces
    let commandName = messageArray[0].slice(prefix.length); // commandName contient le premier mot du message
    let args = messageArray.slice(1); // args contient les arguments du message

    if(!message.content.startsWith(prefix)) return; // si le message ne commence pas par le prefix, on sort de la fonction

    if(!commandName) return message.reply('Vous n\'avez pas entré de commande.'); // si la commande n'est pas entrée, on envoie un message d'erreur
    let command = require(`../Commandes/${commandName}`)
    if (!command) {
        message.reply("Pas de commande renseignée ! / Commande inconnue !") // si la commande n'est pas trouvée, on envoie un message d'erreur
    } else {
        command.run(client, message, args); // execute la commande
    }
    console.log(`${message.author.tag} a utilisé la commande ${commandName}`); // on affiche dans la console que la commande a été utilisée
}