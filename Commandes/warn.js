const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "warn",
    description: "Permet de warn un utilisateur",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Modération",
    syntax: "warn <@utilisateur> <raison>",
    options: [
        {
            type: "user",
            name: "membre",
            description: "L'utilisateur à warn",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du warn",
            required: true
        }
    ],

    async run(client, message, args, db) {
        let user = args.getUser("membre");
        const no_member = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre n'existe pas !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
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
        const no_reason = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous devez spécifier une raison !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!reason) {
            return message.reply({embeds: [no_reason]});
        }

        const warn_yourself = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas vous warn vous même !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (message.user.id === user.id) {
            return message.reply({embeds: [warn_yourself]});
        }

        /*const warn_owner = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas warn le propriétaire du serveur !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (await message.guild.members.fetchOwner().id === user.id) {
            return message.reply({embeds: [warn_owner]});
        }*/

        const you_cannot_warn = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas warn ce membre !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            return message.reply({embeds: [you_cannot_warn]});
        }

        const i_cannot_warn = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Je ne pouvez pas warn ce membre !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (member && (await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            return message.reply({embeds: [i_cannot_warn]});
        }

        try {
            await user.send(`Warn :\n\nVous avez été warn sur le serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`)
        } catch (err) {
            message.reply("Je n'ai pas pu envoyer le message de warn à l'utilisateur !");
        }

        const warn_confirmation = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("Warn")
            .setDescription(`**${message.user}** a warn **${user.tag}** pour la raison suivante : **${reason}**`)
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
        await message.reply({embeds: [warn_confirmation]});

        let ID = client.function.createID("WARN");

        db.query(`INSERT INTO warns (guildID, userID, moderatorID, warnID, reason, date)
                         VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}',
                                 '${reason.replace(/'/g, "\\''")}', '${Date.now()}')`);
    }
}