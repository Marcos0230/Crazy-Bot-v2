const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "ping",
    description: "Permet de voir le ping du bot",
    dmPermission: true,
    permission: "Aucune",
    category: "Information",
    syntax: "ping",

    async run(client, message) {
        const pingEmbed = new EmbedBuilder()
            .setTitle("Ping")
            .setDescription(`Pong ! 🏓\n\nLe ping du bot est de \`${client.ws.ping}ms\``)
            .setColor("Random")
            .setTimestamp()
            .setThumbnail("https://c.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif")
            .setFooter({text: "Commande : ping", iconURL: client.user.displayAvatarURL({dynamic: true})});
        await message.reply({embeds: [pingEmbed]});
    }
}