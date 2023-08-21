const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
gif = ["https://64.media.tumblr.com/c74b010c942e417d1bf7f3d59c82bddd/8e9ac3c3a5b43612-61/s540x810/9d4e06ec44ab47379d6244e350ef31bba15325b9.gif", "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOG10OW1jdG5jY2toNGRobDg4cGNkeDUwZGEwam91c2RxZmNiNDAyeSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1yhXREJ1wluT5xnfcd/giphy.gif"]

module.exports = {
    name: "bot-info",
    description: "Permet de connaître des infos sur le bot",
    dmPermission: true,
    permission: "Aucune",
    category: "Utilitaire",
    syntax: "bot-info",

    async run(client, message) {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const botInfoEmbed = new EmbedBuilder()
            .setTitle("Bot Info")
            .setDescription(`Voici les infos sur le bot :`)
            .setColor("Random")
            .setTimestamp()
            .setThumbnail("https://c.tenor.com/Op9wKgHRM-MAAAAM/verstappen-max-verstappen.gif")
            .setImage(gif[Math.floor(Math.random() * gif.length)])
            .setFooter({text: "Commande : bot-info", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .addFields({
                name: "<:robot:1011680932463398944> Nom du bot",
                value: `${client.user.username} (${client.user.id})`,
                inline: true
            })
            .addFields({
                name: ":1234: Nombre de commandes",
                value: `${client.commands.size}`,
                inline: true
            })
            .addFields({
                name: ":busts_in_silhouette: Nombre de serveurs",
                value: `${client.guilds.cache.size}`,
                inline: true
            })
            .addFields({
                name: ":bust_in_silhouette: Nombre d'utilisateurs",
                value: `${client.users.cache.size}`,
                inline: true
            })
            .addFields({
                name: ":date: Date de création",
                value: `<t:${Math.floor(client.user.createdAt / 1000)}:F> (<t:${Math.floor(client.user.createdAt / 1000)}:R>)`,
                inline: true
            })
            .addFields({
                name: "<:nodejs:1011681898185101342> Version de NodeJS",
                value: `${process.version}`,
                inline: true
            })
            .addFields({
                name: "<:discordjs:1011682116196647002> Version de discord.js",
                value: `${Discord.version}`,
                inline: true
            })
            .addFields({
                name: ":hourglass_flowing_sand: Uptime",
                value: `**${days}** jours, **${hours}** heures, **${minutes}** minutes, **${seconds}** secondes`,
                inline: true
            })
            .addFields({
                name: ":stopwatch: Ping",
                value: `${client.ws.ping}ms`,
                inline: true
            })

        await message.reply({embeds: [botInfoEmbed]});
    }
}