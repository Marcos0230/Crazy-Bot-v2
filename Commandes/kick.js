const Discord = require("discord.js");
const {EmbedBuilder} = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: "kick",
    description: "Permet de kick un membre",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.KickMembers,
    category: "Modération",
    syntax: "kick <membre> [raison]",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à kick",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du kick",
            required: false,
            autocomplete: false
        }
    ],
    async run(client, message, args) {

        let user = args.getUser("membre");
        const no_member = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre n'existe pas !")
            .setFooter({text: "Commande : kick", iconURL: client.user.displayAvatarURL({dynamic: true})})
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

        const kick_yourself = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas vous kick vous même !")
            .setFooter({text: "Commande : kick", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (message.user.id === user.id) {
            return message.reply({embeds: [kick_yourself]});
        }

        const kick_owner = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas kick le propriétaire du serveur !")
            .setFooter({text: "Commande : kick", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if ((await message.guild.fetchOwner()).id === user.id) {
            return message.reply({embeds: [kick_owner]});
        }

        const i_cannot_kick = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Je ne peux pas kick ce membre !")
            .setFooter({text: "Commande : kick", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && !member.kickable) {
            return message.reply({embeds: [i_cannot_kick]});
        }

        const you_cannot_kick = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas kick ce membre !")
            .setFooter({text: "Commande : kick", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            return message.reply({embeds: [you_cannot_kick]});
        }

        try {
            await user.send(`Vous avez été kick du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
        } catch (err) {
            const no_dm = new EmbedBuilder()
                .setColor("#ffff00")
                .setTitle("Information")
                .setDescription(`**${message.user}** a kick **${user.tag}** pour la raison suivante : **${reason}**\n\nLe membre n'a pas pu être informé de son expulsion !`)
                .setFooter({text: `Commande effectuée par ${message.author.username}`, iconURL: message.author.avatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(config.error_gif);
            message.reply({embeds: [no_dm]});
            return member.kick(reason)
        }
        const kick_confirmation = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("Expulsion")
            .setDescription(`**${message.user}** a kick **${user.tag}** pour la raison suivante : **${reason}**`)
            .setFooter({text: `Commande effectuée par ${message.author.username}`, iconURL: message.author.avatarURL({dynamic: true})})
            .setTimestamp()
        await message.reply({embeds: [kick_confirmation]});

        await member.kick(reason);
    }
}