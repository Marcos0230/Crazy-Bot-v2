const Discord = require('discord.js'); // on importe discord.js
const config = require('../config.js'); // on importe la config

module.exports = {
    name: 'say', // nom de la commande
    description: 'Le bot répète le message que vous avez envoyé.', // description de la commande
    permissions: 'Aucune', // permission nécessaire pour utiliser la commande
    dmPermission: false, // Permet d'envoyer la commande dans un DM
    async run(client, message, args) {
        if (message.author.id !== '588381876989853697') return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande !'); // si l'auteur du message n'est pas le créateur, on ignore
        if (!args[0]) return message.channel.send('Vous devez entrer un message à répéter.'); // si l'utilisateur n'a pas entré de message à répéter, message d'erreur
        message.delete() // on supprime le message de l'utilisateur
        message.channel.send(message.content.trim().slice(`${config.prefix}say`.length)) // on répond au message de l'utilisateur
    }
}