const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");
poucentage = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"]

module.exports = {
    name: "love",
    description: "Permet de connaître le pourcentage d'amour que vous avez la personne mentionnée",
    dmPermission: false,
    permission: "Aucune",
    category: "Fun",
    syntax: "love <@membre>",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à qui vous voulez connaître le pourcentage d'amour",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, message, args) {
        let member = args.getUser("membre");
        const no_member = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Veuillez mentionner un membre !")
            .setFooter({text: "Commande : love", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!member) {
            return message.reply({embeds: [no_member]});
        }

        const love = new EmbedBuilder()
            .setColor("Random")
            .setTitle("Love")
            .setDescription(`Le pourcentage d'amour que vous avez avec **${member.username}** est de **${poucentage[Math.floor(Math.random() * poucentage.length)]}%**`)
            .setFooter({text: "Commande : love", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail("https://c.tenor.com/GwFP_tY-jmQAAAAM/hug-hugs-and-love.gif");
        await message.reply({embeds: [love]});
    }
}