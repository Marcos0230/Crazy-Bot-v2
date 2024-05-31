const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: "unban",
    description: "Permet de révoquer le unbanissement un membre",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.BanMembers,
    category: "Modération",
    syntax: "unban <membre> [raison]",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "L'utilisateur(trice) à unban",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison du unbanissement",
            required: false,
            autocomplete: false
        }
    ],
    async run(client, message, args) {

        let user = await args.getUser("utilisateur");

        const no_member = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Cet(te) utilisateur(trice) n'existe pas !")
            .setFooter({text: "Commande : unban", iconURL: client.user.displayAvatarURL({dynamic: true})})
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

        const not_banned = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Cet(te) utilisateur(trice) n'est pas banni(e) !")
            .setFooter({text: "Commande : unban", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if ((await message.guild.bans.fetch()).get(user.id) === undefined) {
            return message.reply({embeds: [not_banned]});
        }

        try {
            await user.send(`Unbannissement :\n\nVous avez été unban du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
        } catch (err) {
            const no_dm = new EmbedBuilder()
                .setColor("#ffff00")
                .setTitle("Information")
                .setDescription(`**${message.user}** a unban **${user.tag}** pour la raison suivante : **${reason} !**\n\nL'utilisateur(trice) n'a pas pu être informé de son débannissement par message privé.`)
                .setFooter({text: "Commande : unban", iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(config.error_gif);
            await message.reply({embeds: [no_dm]});

            const logs_message = new EmbedBuilder()
                .setAuthor({
                    name: `[UNBAN] ${member.user.tag}`,
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
                .setColor('Random')
                .setTimestamp()

            await message.guild.channels.cache.get(config.logs_channel).send({embeds: [logs_message]});

            return await message.guild.members.unban(user.id, reason);
        }
        const unban_confirmation = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("Unbannissement")
            .setDescription(`**${message.user}** a unban **${user.tag}** pour la raison suivante : **${reason}**`)
            .setFooter({text: "Commande : unban", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
        await message.reply({embeds: [unban_confirmation]});

        const logs_message = new EmbedBuilder()
            .setAuthor({
                name: `[UNBAN] ${member.user.tag}`,
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
            .setColor('Random')
            .setTimestamp()

        await message.guild.channels.cache.get(config.logs_channel).send({embeds: [logs_message]});

        await message.guild.members.unban(user.id, reason);
    }
}