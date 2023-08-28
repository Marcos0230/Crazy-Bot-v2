const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "warnlist",
    description: "Permet d'afficher la liste des avertissements d'un membre",
    dmPermission: false,
    permission: "Aucune",
    category: "Modération",
    syntax: "warnlist <membre>",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre dont vous voulez afficher les avertissements",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, message, args, db) {
        let user = args.getUser("membre");

        const no_user = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre n'existe pas !")
            .setFooter({text: "Commande : warnlist", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!user) {
            return message.reply({embeds: [no_user]});
        }

        let member = await message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply({embeds: [no_user]});
        }

        db.query(`SELECT * FROM warns WHERE guildID = '${message.guild.id}' AND userID = '${user.id}'`, async (err, req) => {
            const no_warns = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Erreur")
                .setDescription("Ce membre n'a aucun avertissement !")
                .setFooter({text: "Commande : warnlist", iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(config.error_gif);

            if (req.length < 1) {
                return message.reply({embeds: [no_warns]});
            }

            await req.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))

            let warnlist = new Discord.EmbedBuilder()
                .setColor("Random")
                .setTitle(`Avertissements de ${user.tag} (${user.id})`)
                .setFooter({text: "Commande : warnlist", iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(user.displayAvatarURL({dynamic: true}));

            for (let i = 0; i < req.length; i++) {
                warnlist.addFields(
                    [{
                            name: `Avertissement n°${i + 1}`,
                            value: `- **Modérateur** : ${(await client.users.fetch(req[i].moderatorID)).tag} (${req[i].moderatorID})\n- **ID du warn** : ${req[i].warnID}\n- **Raison** : ${req[i].reason}\n- **Date** : <t:${Math.floor(parseInt(req[i].timestamp) / 1000)}:F>`,
                            inline: false
                        }]
                )
            }

            await message.reply({embeds: [warnlist]});
        })
    }
}