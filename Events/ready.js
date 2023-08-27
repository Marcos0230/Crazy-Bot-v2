const Discord = require("discord.js");
const loadSlashCommands = require("../Loader/loadSlashCommands.js");
const loadDatabase = require("../Loader/loadDatabase.js");

module.exports = async (client) => {
    await loadSlashCommands(client);

    client.db = await loadDatabase();
    client.db.connect(function () {
        console.log("Database loaded successfully !");
    })

    console.log(`Logged in as ${client.user.tag} ! No problem detected for now...\nThere are ${client.users.cache.size} users on ${client.channels.cache.size} channels from ${client.guilds.cache.size} servers using me right now.`);
}