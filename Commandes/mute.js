const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");
const ms = require("ms");

module.exports = {
    name: "mute",
    description: "Permet de mute un membre",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    category: "Modération",
    syntax: "mute <membre> <temps> [raison]",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "Le temps de mute",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du mute",
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
            .setFooter({text: "Commande : mute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!user) {
            return message.reply({embeds: [no_member]});
        }

        let member = await message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply({embeds: [no_member]});
        }

        let time = args.getString("temps");
        const no_time = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous n'avez pas entré de temps ou le temps indiqué n'est pas au bon format (heure : h, minute : m, etc.) !")
            .setFooter({text: "Commande : mute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!time) {
            return message.reply({embeds: [no_time]});
        }

        if (isNaN(ms(time))) {
            return message.reply({embeds: [no_time]});
        }

        const too_long_time = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Le temps de mute est trop long (il ne peut pas dépasser deux (2) semaines/28 jours) !")
            .setFooter({text: "Commande : mute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (ms(time) > 86400000) {
            return message.reply({embeds: [too_long_time]});
        }

        let reason = args.getString("raison");
        if (!reason) {
            reason = "Aucune raison fournie";
        }

        const mute_yourself = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas vous mute vous même !")
            .setFooter({text: "Commande : mute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (message.user.id === user.id) {
            return message.reply({embeds: [mute_yourself]});
        }

        const mute_owner = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas mute le propriétaire du serveur !")
            .setFooter({text: "Commande : mute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if ((await message.guild.fetchOwner()).id === user.id) {
            return message.reply({embeds: [mute_owner]});
        }

        const i_cannot_mute = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Je ne peux pas mute ce membre !")
            .setFooter({text: "Commande : mute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && !member.moderatable) {
            return message.reply({embeds: [i_cannot_mute]});
        }

        const you_cannot_mute = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas mute ce membre !")
            .setFooter({text: "Commande : mute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            return message.reply({embeds: [you_cannot_mute]});
        }

        const already_mute = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre est déjà mute !")
            .setFooter({text: "Commande : mute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member.isCommunicationDisabled()) {
            return message.reply({embeds: [already_mute]});
        }

        try {
            await user.send(`Vous avez été mute du serveur **${message.guild.name}** par **${message.user.tag}** pendant **${time}** pour la raison suivante : **${reason}**`);
        } catch (err) {
            const no_dm = new EmbedBuilder()
                .setColor("#ffff00")
                .setTitle("Information")
                .setDescription(`**${message.user}** a mute **${user.tag}** pendant **${time}** pour la raison suivante : **${reason}** !\n\nLe membre n'a pas pu être informé de son mute par message privé.`)
                .setFooter({text: "Commande : mute", iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(config.error_gif);
            await message.reply({embeds: [no_dm]});

            const logs_message = new EmbedBuilder()
                .setAuthor({
                    name: `[MUTE] ${member.user.tag}`,
                    iconURL: member.user.displayAvatarURL()
                })
                .addFields({
                    name: `Utilisateur`,
                    value: user,
                    inline: true
                })
                .addFields({
                    name: `Modérateur`,
                    value: `<@${message.user.id}>`,
                    inline: true
                })
                .addFields({
                    name: `Raison`,
                    value: reason,
                    inline: true
                })
                .addFields({
                    name: `Durée`,
                    value: time,
                    inline: true
                })
                .setColor('Random')
                .setTimestamp()

            await message.guild.channels.cache.get(config.logs_channel).send({embeds: [logs_message]});

            return await member.timeout(ms(time), reason);
        }
        const mute_confirmation = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("mute")
            .setDescription(`**${message.user}** a mute **${user.tag}** pendant **${time}** pour la raison suivante : **${reason}**`)
            .setFooter({text: "Commande : mute", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
        await message.reply({embeds: [mute_confirmation]});

        const logs_message = new EmbedBuilder()
            .setAuthor({
                name: `[MUTE] ${member.user.tag}`,
                iconURL: member.user.displayAvatarURL()
            })
            .addFields({
                name: `Utilisateur`,
                value: `<@${member.user.id}>`,
                inline: true
            })
            .addFields({
                name: `Modérateur`,
                value: `<@${message.user.id}>`,
                inline: true
            })
            .addFields({
                name: `Raison`,
                value: reason,
                inline: true
            })
            .addFields({
                name: `Durée`,
                value: time,
                inline: true
            })
            .setColor('Random')
            .setTimestamp()

        await message.guild.channels.cache.get(config.logs_channel).send({embeds: [logs_message]});

        await member.timeout(ms(time), reason);
    }
}