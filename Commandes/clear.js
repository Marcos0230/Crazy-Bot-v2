const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "clear",
    description: "Permet de supprimer un nombre de messages",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.ManageMessages,
    options: [
        {
            type: "number",
            name: "nombre",
            description: "Le nombre de messages à supprimer",
            required: true
        }
    ],

    async run(client, message, args) {
        let count = args.getNumber("nombre");

        const no_number = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Veuillez indiquer un nombre de messages à supprimer !")
            .setFooter({text: "Commande : clear", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!/\d+/.test(count)) {
            return message.reply({embeds: [no_number]});
        }

        const invalid_number = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Le nombre de messages à supprimer doit être compris entre 1 et 99.")
            .setFooter({text: "Commande : clear", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (count < 1 || count > 99) {
            return message.reply({embeds: [invalid_number]});
        }

        const {size} = await message.channel.bulkDelete(count + 1, true);
        message.channel.send(`${size - 1} messages ont été supprimés !`).then(sent => sent.delete({timeout: 10000}))
    }
}