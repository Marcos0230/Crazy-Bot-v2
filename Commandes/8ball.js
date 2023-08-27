const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require("../config.json");
replies = ['Oui', 'Non', 'Peut-être', 'Evidemment', 'Je ne sais pas', 'Je ne peux pas répondre à cette question']

module.exports = {
    name: "8ball",
    description: "Permet de poser une question (fermée) à la boule magique",
    dmPermission: true,
    permission: "Aucune",
    category: "Fun",
    syntax: "8ball <question>",
    options: [
        {
            type: "string",
            name: "question",
            description: "La question à poser",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, message, args) {
        let question = args.getString("question");
        const no_question = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Veuillez indiquer une question !")
            .setFooter({text: "Commande : 8ball", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!question) {
            return message.reply({embeds: [no_question]});
        }

        const answer = new EmbedBuilder()
            .setColor("Random")
            .setTitle(question)
            .setDescription(replies[Math.floor(Math.random() * replies.length)])
            .setFooter({text: "Commande : 8ball", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/attachments/1009151685144354826/1012108158078046218/youre-fucked-the-simpsons.gif");
        await message.reply({embeds: [answer]});
    }
}