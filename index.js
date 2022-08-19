const Discord = require('discord.js');
const { ActivityType } = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const client = new Discord.Client({intents});
const loadCommands = require('./Loader/loadCommands.js');
const loadEvents = require('./Loader/loadEvents');
const token = require('./token.json');

client.commands = new Discord.Collection();

client.login(token.token) // On se connecte au bot
loadCommands(client); // On charge les commandes
loadEvents(client); // On charge les events

client.on('ready', () => {
    const statuses = [
        'mon développeur : 🦄𝐋𝐞𝐆𝐚𝐫𝐬𝐅𝐨𝐮🌈#0230',
        'mon prefix : c.',
        'ma version : 2.0.0'
    ]
    let i = 0;
    /*client.user.setPresence({
        activities: [{ name: `discord.js v14`, type: ActivityType.Watching }],
        status: 'dnd',
    });*/
    setInterval(() => {
        client.user.setPresence({
            activities: [{ name: statuses[i], type: ActivityType.Watching }],
            status: 'online',
        });
        i = ++i % statuses.length
    }, 10000)
})