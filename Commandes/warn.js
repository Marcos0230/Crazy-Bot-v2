const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "warn",
    description: "Permet d'avertir un membre (sorte de carton jaune avant mute/kick/ban)",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Modération",
    syntax: "warn <membre> \[raison\]",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à avertir",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "La raison de l'avertissement",
            required: false,
            autocomplete: false
        }
    ],

    async run(client, message, args, db) {
        let user = args.getUser("membre");

        const no_user = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre n'existe pas !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!user) {
            return message.reply({embeds: [no_user]});
        }

        let member = await message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply({embeds: [no_user]});
        }

        let reason = args.getString("raison");
        if (!reason) {
            reason = "Aucune raison fournie";
        }

        const warn_yourself = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas vous avertir vous même !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (message.user.id === user.id) {
            return message.reply({embeds: [warn_yourself]});
        }

        const warn_owner = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas avertir le propriétaire du serveur !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if ((await message.guild.fetchOwner()).id === user.id) {
            return message.reply({embeds: [warn_owner]});
        }

        const i_cannot_warn = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Je ne peux pas avertir ce membre !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if ((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            return message.reply({embeds: [i_cannot_warn]});
        }

        const you_cannot_warn = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas avertir ce membre !")
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            return message.reply({embeds: [you_cannot_warn]});
        }

        try {
            await member.send(`Vous avez été averti sur le serveur **${message.guild.name}** par **${message.author.tag}** pour la raison suivante : **${reason}**`);
        } catch (err) {
            let ID = await client.function.createID("")

            const no_dm = new EmbedBuilder()
                .setColor("#ffff00")
                .setTitle("Information")
                .setDescription(`**${message.user}** a averti **${user.tag}** pour la raison suivante : **${reason}** !\nL'ID de l'avertissement est : **${ID}**\n\nLe membre n'a pas pu être informé de son avertissement par message privé.`)
                .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(config.error_gif);
            await message.reply({embeds: [no_dm]});

            return db.query(`INSERT INTO warns (guildID, userID, moderatorID, warnID, reason, timestamp) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
        }
        let ID = await client.function.createID("")

        const warn_confirmation = new EmbedBuilder()
            .setColor("#00ff00")
            .setTitle("Avertissement")
            .setDescription(`**${message.user}** a averti **${user.tag}** pour la raison suivante : **${reason}**\nL'ID de l'avertissement est : **${ID}**`)
            .setFooter({text: "Commande : warn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
        await message.reply({embeds: [warn_confirmation]});

        db.query(`INSERT INTO warns (guildID, userID, moderatorID, warnID, reason, timestamp) VALUES ('${message.guild.id}', '${user.id}', '${message.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${Date.now()}')`)
    }
}