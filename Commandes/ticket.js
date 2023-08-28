const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "ticket",
    description: "Permet d'envoyer l'embed des tickets",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.Administrator,
    category: "Système",
    syntax: "ticket",

    async run(client, message) {
        const open_ticket_embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setTitle("Ticket")
            .setDescription("Pour créer un ticket, cliquez sur la réaction ci-dessous !\n\nNous essaierons de vous répondre le plus rapidement possible !")
            .setThumbnail("https://media1.giphy.com/media/UKCKAC42k6zqfNSOXP/giphy.gif?cid=6c09b95285qogv2v1f8bh8ntffw71axb9yksa1osymibcu56&ep=v1_stickers_related&rid=giphy.gif")
            .setFooter({text: "Commande : ticket", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()

        const open_button = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
            .setCustomId("ticket")
            .setLabel("Créer un ticket")
            .setStyle(Discord.ButtonStyle.Success)
            .setEmoji("📩")
        )

        await message.reply({embeds: [open_ticket_embed], components: [open_button]})
    }
}