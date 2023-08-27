const Discord = require('discord.js');
const fs = require('fs');

module.exports = async (client) => {
    for (const files of fs.readdirSync("./Commandes").filter(f => f.endsWith(".js"))) {
        let command = require(`../Commandes/${files}`);
        if (!command.name || typeof command.name !== "string") throw new TypeError(`${files.slice(0, files.length - 3)} name is not valid !`);
        await client.commands.set(command.name, command);
        console.log(`Command ${command.name} loaded successfully !`);
    }
}