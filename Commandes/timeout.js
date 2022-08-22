const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");
const ms = require("ms");

module.exports = {
    name: "timeout",
    description: "Permet de timeout un membre",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    options: [
        {
        type: "user",
        name: "membre",
        description: "Le membre à timeout",
        required: true
        }, {
        type: "string",
        name: "temps",
        description: "Le temps de timeout",
        required: true
        },
        {
        type: "string",
        name: "raison",
        description: "La raison du timeout",
        required: false
        }
    ],

    async run(client, message, args) {
        let user = args.getUser("membre");
        const no_member = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre n'existe pas !")
            .setFooter({text: "Commande : timeout", iconURL: client.user.displayAvatarURL({dynamic: true})})
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
            .setFooter({text: "Commande : timeout", iconURL: client.user.displayAvatarURL({dynamic: true})})
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
            .setDescription("Le temps de timeout est trop long (il ne peut pas dépasser deux (2) semaines/28 jours) !")
            .setFooter({text: "Commande : timeout", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if(ms(time) > 86400000) {
            return message.reply({embeds: [too_long_time]});
        }

        let reason = args.getString("raison");
        if (!reason) {
            reason = "Aucune raison donnée";
        }

        const timeout_yourself = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas vous timeout vous même !")
            .setFooter({text: "Commande : timeout", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (message.user.id === user.id) {
            return message.reply({embeds: [timeout_yourself]});
        }

        const timeout_owner = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas timeout le propriétaire du serveur !")
            .setFooter({text: "Commande : timeout", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if ((await message.guild.fetchOwner()).id === user.id) {
            return message.reply({embeds: [timeout_owner]});
        }

        const i_cannot_timeout = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Je ne peux pas timeout ce membre !")
            .setFooter({text: "Commande : timeout", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && !member.moderatable) {
            return message.reply({embeds: [i_cannot_timeout]});
        }

        const you_cannot_timeout = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas timeout ce membre !")
            .setFooter({text: "Commande : timeout", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            return message.reply({embeds: [you_cannot_timeout]});
        }

        const already_timeout = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre est déjà timeout !")
            .setFooter({text: "Commande : timeout", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member.isCommunicationDisabled()) {
            return message.reply({embeds: [already_timeout]});
        }

        try {
            await user.send(`Vous avez été timeout du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
        } catch (err) {
            const no_dm = new EmbedBuilder()
                .setColor("#ffff00")
                .setTitle("Information")
                .setDescription(`**${message.user}** a timeout **${user.tag}** pendant **${time}** pour la raison suivante : **${reason}**\n\nLe membre n'a pas pu être informé de son timeout !`)
                .setFooter({text: `Commande effectuée par ${message.author.username}`, iconURL: message.author.avatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(config.error_gif);
            message.reply({embeds: [no_dm]});
            return member.kick(reason)
        }
        const timeout_confirmation = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("Timeout")
            .setDescription(`**${message.user}** a timeout **${user.tag}** pendant **${time}** pour la raison suivante : **${reason}**`)
            .setFooter({text: "Commande : timeout", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
        await message.reply({embeds: [timeout_confirmation]});

        await member.timeout(ms(time), reason);
    }
}