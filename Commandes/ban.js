const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: "ban",
    description: "Permet de bannir un membre",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.BanMembers,
    category: "Modération",
    syntax: "ban <membre> [raison]",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à bannir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du ban",
            required: false,
            autocomplete: false
        }
    ],
    async run(client, message, args) {

        let user = await client.users.fetch(args._hoistedOptions[0].value);

        const no_member = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre n'existe pas !")
            .setFooter({text: "Commande : ban", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!user) {
            return message.reply({embeds: [no_member]});
        }

        let member = await message.guild.members.cache.get(user.id);

        let reason = args.getString("raison");
        if (!reason) {
            reason = "Aucune raison fournie";
        }

        const ban_yourself = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas vous bannir vous même !")
            .setFooter({text: "Commande : ban", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (message.user.id === user.id) {
            return message.reply({embeds: [ban_yourself]});
        }

        const ban_owner = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas bannir le propriétaire du serveur !")
            .setFooter({text: "Commande : ban", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if ((await message.guild.fetchOwner()).id === user.id) {
            return message.reply({embeds: [ban_owner]});
        }

        const i_cannot_ban = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Je ne peux pas bannir ce membre !")
            .setFooter({text: "Commande : ban", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && !member.bannable) {
            return message.reply({embeds: [i_cannot_ban]});
        }

        const you_cannot_ban = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas bannir ce membre !")
            .setFooter({text: "Commande : ban", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            return message.reply({embeds: [you_cannot_ban]});
        }

        const already_banned = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre est déjà banni !")
            .setFooter({text: "Commande : ban", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if ((await message.guild.bans.fetch()).get(user.id)) {
            return message.reply({embeds: [already_banned]});
        }

        try {
            await user.send(`Bannissement :\n\nVous avez été banni du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
        } catch (err) {
            const no_dm = new EmbedBuilder()
                .setColor("#ffff00")
                .setTitle("Information")
                .setDescription(`**${message.user}** a banni **${user.tag}** pour la raison suivante : **${reason}** !\n\nLe membre n'a pas pu être informé de son bannissement par message privé.`)
                .setFooter({text: "Commande : ban", iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(config.error_gif);
            await message.reply({embeds: [no_dm]});
            return message.guild.bans.create(user.id, {reason: reason});
        }

        const ban_confirmation = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("Bannissement")
            .setDescription(`**${message.user}** a banni **${user.tag}** pour la raison suivante : **${reason}**`)
            .setFooter({text: "Commande : ban", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
        await message.reply({embeds: [ban_confirmation]});

        const logs_message = new EmbedBuilder()
            .setAuthor({
                name: `[BAN] ${member.user.tag}`,
                iconURL: member.user.displayAvatarURL()
            })
            .addFields({
                name: `Utilisateur`,
                value: `member`,
                inline: true
            })
            .addFields({
                name: `Modérateur`,
                value: message.user.globalName,
                inline: true
            })
            .addFields({
                name: `Raison`,
                value: reason,
                inline: true
            })
            .setColor('Random')
            .setTimestamp()

        await message.guild.channels.cache.get(config.logs_channel).send({embeds: [logs_message]});

        await message.guild.bans.create(user.id, {reason: reason});
    }
}