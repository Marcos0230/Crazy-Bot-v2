const Discord = require('discord.js'); // require le module discord.js
const intents = new Discord.IntentsBitField(3276799); // crée un nouvel objet intents avec le bitfield de l'intents
const client = new Discord.Client({intents}); // crée un nouveau client avec l'intents
const loadCommands = require('./Loader/loadCommands'); // require le fichier loadCommands.js

client.commands = new Discord.Collection(); // crée un nouveau tableau de commandes

const token = require('./token.json'); // token.json est un fichier contenant le token du bot
const config = require('./config.js'); // config.js est un fichier contenant les paramètres du bot

client.login(token.token); // connecte le bot au serveur Discord
loadCommands(client); // charge les commandes du bot

client.on('ready', async () => {
    console.log(`Connexion à ${client.user.tag} réussie ! Aucun problème n'a été détecté.`); // affiche dans la console que le bot est connecté au serveur Discord
});

client.on('messageCreate', async (message) => {
    if (message.content === config.prefix + 'ping') { // si le message contient le prefix + ping
        client.commands.get("ping").run(client, message); // execute la commande ping
    }
});