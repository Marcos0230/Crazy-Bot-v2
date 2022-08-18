const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Permet de voir le ping du bot",
    dmPermission: true,
    permission: "Aucune",

    async run(client, message) {
        await message.reply(`Pong !\n~ ${client.ws.ping}ms`);
    }
}