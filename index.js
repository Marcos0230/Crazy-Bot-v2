const Discord = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const client = new Discord.Client({intents});
const loadCommands = require('./Loader/loadCommands.js');
const loadEvents = require('./Loader/loadEvents');
const token = require('./token.json');

client.commands = new Discord.Collection();

client.login(token.token) // On se connecte au bot
loadCommands(client); // On charge les commandes
loadEvents(client); // On charge les events