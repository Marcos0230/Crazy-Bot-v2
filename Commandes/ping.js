const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "ping",
    description: "Permet de voir le ping du bot",
    dmPermission: true,
    permission: "Aucune",

    async run(client, message) {
        const pingEmbed = new EmbedBuilder()
            .setTitle("Ping")
            .setDescription(`Pong ! Le ping du bot est de ${client.ws.ping}ms`)
            .setColor("RANDOM")
            .setTimestamp()
            .setFooter({text: `Commande effectuée par ${message.author.username}`, iconURL: message.author.avatarURL({dynamic: true})});
        await message.reply({embeds: [pingEmbed]});
    }
}