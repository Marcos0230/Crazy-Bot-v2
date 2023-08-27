const Discord = require('discord.js');
const config = require('../config.json');

module.exports = async (client, message) => {
    let prefix = config.prefix;

    let messageArray = message.content.split(" ");
    let commandName = messageArray[0].slice(config.prefix.length);
    let args = messageArray.slice(1);

    if (!message.content.startsWith(config.prefix)) return;

    /*try { // on essaye de charger la commande
        let command = require(`../Commandes/${commandName}`) // command est la commande chargée
        command.run(client, message, args) // on exécute la commande
    } catch (err) { // si la commande n'est pas trouvée
        message.reply("Pas de commande renseignée ! / Commande inconnue !") // on envoie un message d'erreur
    }*/

    try {
        message.reply("Commande avec prefix désactivées définitivement !");
    } catch (err) {
        console.log(err);
    }
}