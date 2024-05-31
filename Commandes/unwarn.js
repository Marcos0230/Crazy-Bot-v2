const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "unwarn",
    description: "Permet de supprimer un avertissement d'un membre (warnlist pour avoir l'ID)",
    dmPermission: false,
    permission: "Aucune",
    category: "Modération",
    syntax: "unwarn <warnID>",
    options: [
        {
            type: "string",
            name: "id",
            description: "L'ID de l'avertissement que vous voulez supprimer (alphanumérique de 6 caractères)",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, message, args, db) {
        let warnID = args.getString("id");
        const no_warnID = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("L'ID de l'avertissement n'existe pas / est invalide !")
            .setFooter({text: "Commande : unwarn", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!warnID) {
            return message.reply({embeds: [no_warnID]});
        }
        if (warnID.length !== 6) {
            return message.reply({embeds: [no_warnID]});
        }


        db.query(`SELECT * FROM warns WHERE guildID = '${message.guild.id}' AND warnID = '${warnID}'`, async (err, req) => {
            if (err) {
                message.reply(err)
            }

            if (req.length < 1) {
                return message.reply({embeds: [no_warnID]});
            }

            if (warnID !== req[0].warnID) {
                return message.reply({embeds: [no_warnID]});
            }

            db.query(`DELETE FROM warns WHERE guildID = '${message.guild.id}' AND warnID = '${warnID}'`, async (err, req) => {
                if (err) {
                    message.reply(err)
                }

                const success = new EmbedBuilder()
                    .setColor("#00ff00")
                    .setTitle("Succès")
                    .setDescription("L'avertissement a bien été supprimé !")
                    .setFooter({text: "Commande : unwarn", iconURL: client.user.displayAvatarURL({dynamic: true})})
                    .setTimestamp()
                    .setThumbnail(config.error_gif);

                message.reply({embeds: [success]});

                const logs_message = new EmbedBuilder()
                    .setAuthor({
                        name: `[UNWARN] ${member.user.tag}`,
                        iconURL: member.user.displayAvatarURL()
                    })
                    .addFields({
                        name: `ID du warn`,
                        value: warnID,
                        inline: true
                    })
                    .addFields({
                        name: `Modérateur`,
                        value: `<@${message.user.id}>`,
                        inline: true
                    })
                    .setColor('Random')
                    .setTimestamp()

                await message.guild.channels.cache.get(config.logs_channel).send({embeds: [logs_message]});
            })
        })
    }
}