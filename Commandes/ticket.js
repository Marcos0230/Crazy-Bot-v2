const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json');
const {EmbedBuilder} = require("discord.js");
const db = require('../db.json');

module.exports = {
    name: "ticket",
    description: "Permet de créer un ticket de support",
    dmPermission: false,
    permission: "Aucune",
    category: "Ticket",
    syntax: "ticket",

    async run(client, message) {
        //if (Object.values(client.db.tickets).some(ticket => ticket.author === message.author.id)) return message.channel.send(new Discord.MessageEmbed()
        //    .setColor('#ff0000')
        //    .setDescription('**Vous avez déjà un ticket ouvert !**')
        //    .setTimestamp()
        //    .setThumbnail(config.gif))
        const check = fs.readFile('./db.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("File read failed:", err)
                return
            }
            try {
                client.db = JSON.parse(jsonString)
            } catch (err) {
                console.log('Error parsing JSON string:', err)
            }
        })
        if (check.includes(message.author.id)) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription('**Vous avez déjà un ticket ouvert !**')
            .setTimestamp()
            .setThumbnail(config.gif))
        const channel = await message.guild.channels.create(`ticket ${message.author.username}`, {
            type: 'text',
            parent: config.ticket.category,
            permissionOverwrites: [{
                id: message.guild.id,
                deny: 'VIEW_CHANNEL'
            }, {
                id: message.author.id,
                allow: 'VIEW_CHANNEL'
            }, ...config.ticket.roles.map(id => ({
                id,
                allow: 'VIEW_CHANNEL'
            }))]
        })
        client.db.tickets[channel.id] = {
            author: message.author.id
        }
        fs.writeFileSync('./db.json', JSON.stringify(client.db))
        message.reply('OK')
    }
}