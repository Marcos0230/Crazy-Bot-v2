const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");
const ms = require("ms");

module.exports = {
    name: "unmute",
    description: "Permet de unmute un membre",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    category: "Modération",
    syntax: "unmute <membre> [raison]",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à unmute",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du unmute",
            required: false
        }
    ],

    async run(client, message, args) {
        let user = args.getUser("membre");
        const no_member = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre n'existe pas !")
            .setFooter({text: "Commande : unmute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!user) {
            return message.reply({embeds: [no_member]});
        }

        let member = await message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply({embeds: [no_member]});
        }

        let reason = args.getString("raison");
        if (!reason) {
            reason = "Aucune raison donnée";
        }

        const i_cannot_unmute = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Je ne peux pas unmute ce membre !")
            .setFooter({text: "Commande : unmute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && !member.moderatable) {
            return message.reply({embeds: [i_cannot_unmute]});
        }

        const you_cannot_unmute = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas unmute ce membre !")
            .setFooter({text: "Commande : unmute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            return message.reply({embeds: [you_cannot_unmute]});
        }

        const not_muted = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre n'est pas mute !")
            .setFooter({text: "Commande : unmute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!member.isCommunicationDisabled()) {
            return message.reply({embeds: [not_muted]});
        }

        try {
            await user.send(`Vous avez été unmute du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
        } catch (err) {
            const no_dm = new EmbedBuilder()
                .setColor("#ffff00")
                .setTitle("Information")
                .setDescription(`**${message.user}** a unmute **${user.tag}** pour la raison suivante : **${reason}**\n\nLe membre n'a pas pu être informé de son unmute !`)
                .setFooter({text: `Commande effectuée par ${message.author.username}`, iconURL: message.author.avatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(config.error_gif);
            await message.reply({embeds: [no_dm]});
            return await member.timeout(null, reason);
        }
        const unmute_confirmation = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("unmute")
            .setDescription(`**${message.user}** a unmute **${user.tag}** pour la raison suivante : **${reason}**`)
            .setFooter({text: "Commande : unmute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
        await message.reply({embeds: [unmute_confirmation]});

        await member.timeout(null, reason);
    }
}