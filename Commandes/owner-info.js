const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "owner-info",
    description: "Permet de connaître des infos sur le créateur du bot",
    dmPermission: true,
    permission: "Aucune",
    category: "Utilitaire",

    async run(client, message) {
        const owner = client.users.cache.get("588381876989853697");

        const ownerInfoEmbed = new EmbedBuilder()
            .setTitle("Créateur Info")
            .setDescription(`Voici les infos sur le créateur du bot :`)
            .setColor("Random")
            .setTimestamp()
            .setImage("https://cdn.discordapp.com/attachments/1009151685144354826/1011688756690034758/discord-banner-4.gif")
            .setThumbnail(owner.displayAvatarURL({dynamic: true}))
            .setFooter({text: "Commande : owner-info", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .addFields({
                name: ":clipboard: Pseudo",
                value: `${owner.username}`,
                inline: true
            })
            .addFields({
                name: ":id: ID",
                value: `${owner.id}`,
                inline: true
            })
            .addFields({
                name: ":1234: Tag",
                value: `#${owner.discriminator}`,
                inline: true
            })
            .addFields({
                name: ":map: Localisation",
                value: "France :flag_fr:",
                inline: true
            })

        await message.reply({embeds: [ownerInfoEmbed]});
    }
}