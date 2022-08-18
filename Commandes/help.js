const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'help', // nom de la commande
    description: 'Donne la liste des commandes du bot', // description de la commande
    permission: 'Aucune', // permission nécessaire pour utiliser la commande
    dmPermission: true, // Permet d'envoyer la commande dans un DM
    async run(client, message) { // on exécute la fonction run
        for (const files of fs.readdirSync('./Commandes/').filter(f => f.endsWith(".js"))) { // on parcourt les fichiers du dossier Commandes
            let command = require(`../Commandes/${files}`); // on importe la commande
            message.reply(`${command.name}`); // on répond avec le nom de la commande
        }
    }
}