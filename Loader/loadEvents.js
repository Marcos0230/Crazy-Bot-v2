const Discord = require('discord.js');
const fs = require('fs');

module.exports = async (client) => {
    for (const files of fs.readdirSync("./Events").filter(f => f.endsWith(".js"))) {
        let event = require(`../Events/${files}`);
        client.on(files.split('.js').join(""), event.bind(null, client));
        console.log(`Event ${files} loaded successfully !`);
    }
}