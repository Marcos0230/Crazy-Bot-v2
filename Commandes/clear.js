const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "clear",
    description: "Permet de supprimer un nombre de messages",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Modération",
    syntax: "clear <nombre de messages>",
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nombre de messages à supprimer",
            required: true,
            autocomplete: false
        }, {
            type: "channel",
            name: "channel",
            description: "Le salon où on veut supprimer les messages",
            required: false,
            autocomplete: false
        }
    ],

    async run(client, message, args) {
        let number = args.getNumber("nombre");

        const no_number = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous devez entrer un nombre de messages à supprimer !")
            .setFooter({text: "Commande : clear", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!number) {
            return message.reply({embeds: [no_number]});
        }

        const wrong_number = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous devez entrer un nombre entre `0` et `100` inclus !")
            .setFooter({text: "Commande : clear", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (parseInt(number) <= 0 || parseInt(number) > 100) {
            message.reply({embeds: [wrong_number]});
        }

        let channel = args.getChannel("channel");

        if (!channel) {
            channel = message.channel;
        }

        const wrong_channel = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas supprimer des messages dans un salon qui n'existe pas !")
            .setFooter({text: "Commande : clear", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) {
            message.reply({embeds: [wrong_channel]});
        }

        try {
            let messages = await channel.bulkDelete(parseInt(number));

            await message.reply({content: `${messages.size} messages ont été supprimés dans le salon ${channel} !`, ephemeral: true});
        } catch (error) {
            let messages = [...(await channel.messages.fetch()).values()].filter(async m => m.createdAt >= 1209600000)
            const no_message = new EmbedBuilder()
                .setColor("#ff0000")
                .setTitle("Erreur")
                .setDescription("Aucun message ne peut être supprimé car ils datent de 14j ou plus !")
                .setFooter({text: "Commande : clear", iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(config.error_gif);
            if (message.length <= 0 ) {
                return message.reply({embeds: [no_message]});
            }

            await channel.bulkDelete(messages);

            await message.reply({content: `${messages.size} messages ont été supprimés ! Les messages datant de 14j ou plus n'ont pas pu être supprimés.`, ephemeral: true});
        }
    }
}