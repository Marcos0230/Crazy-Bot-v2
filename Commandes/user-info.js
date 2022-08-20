const Discord = require("discord.js")
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: "user-info",
    description: "permet de savoir les informations de la personne mentioner !",
    permission: "Aucune",
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "le membre a mentioner",
            required: true
        },
    ],

    async run(bot, message, args) {


        let user = await bot.users.fetch(args._hoistedOptions[0].value);
        if (!user) {
            message.reply(`Le membre n'existe pas !`);
        }
        let member = await message.guild.members.cache.get(user.id);
        if (!member) {
            message.reply(`Le membre n'existe pas !`);
        }

        const userInfoEmbed = new EmbedBuilder()
            .setTitle(`Voici les informations de ${user.tag}`)
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .addFields({
                name: ' :1234: Tag',
                value: `#${user.discriminator}`,
                inline: true
            })
            .addFields({
                name: ' :id: ID',
                value: `${user.id}`,
                inline: true
            })
            .addFields({
                name: " :newspaper:  Date de création du compte",
                value: `<t:${Math.floor(user.createdAt / 1000)}:F>\n`,
                inline: true
            })
            .addFields({
                name: " :pen_ballpoint: Date d'arrivée sur le serveur",
                value: `<t:${Math.floor(member.joinedAt / 1000)}:F>`,
                inline: true
            })
            .addFields({
                name: "<:boost:1010519916601954404>  Date de début de boost",
                value: `<t:${Math.floor(member.premiumSince / 1000)}:F>`,
                inline: true
            })
            .addFields({
                name: '<:role:1010519577442136115> Rôle le plus haut sur le serveur',
                value: `${member.roles.highest}`,
                inline: true
            })
            .addFields({
                name: `<a:status:1010518874829103195>  Statut`,
                value: `**${member ? member.presence ? member.presence.status : "Hors-ligne" : "Inconnu"}**`,
                inline: true
            })
            .setTimestamp(new Date())
            .setFooter({text: bot.user.username, iconURL: bot.user.displayAvatarURL({dynamic: true})})


        await message.reply({embeds: [userInfoEmbed]});


    }
}