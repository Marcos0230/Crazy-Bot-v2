const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "ping",
    description: "Permet de voir le ping du bot",
    dmPermission: true,
    permission: "Aucune",
    category: "Information",
    syntax: "ping",

    async run(client, interaction) {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();

        const ping = reply.createdTimestamp - interaction.createdTimestamp;

        const embed = new EmbedBuilder()
            .setTitle("Pong 🏓 !")
            .setDescription(`Ping : \`${ping}ms\``)
            .setColor("Random")
            .setTimestamp()
            .setThumbnail("https://i.pinimg.com/originals/2c/5e/b4/2c5eb476123b15552bef158f90a86fd6.gif")
            .setFooter({text: "Commande : ping", iconURL: client.user.displayAvatarURL({dynamic: true})})

        await interaction.editReply({embeds: [embed]});
    }
}