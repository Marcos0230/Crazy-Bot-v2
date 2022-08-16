const Discord = require('discord.js');
const client = new Discord.Client({intents: 3243773});

const token = require('./token.json');
const config = require('./config.js');

client.login(token.token);

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        if (command === 'ping') {
            message.channel.send('Pong!');
        }
    }
});
