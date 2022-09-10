const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: "poll",
    description: "Permet de créer des sondages",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.ManageMessages,
    category: "Utilitaire",
    syntax: "poll <question | > <choix | choix | choix> (20 choix maximum)",
    options: [
        {
            type: "string",
            name: "question",
            description: "La question du sondage",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "choix",
            description: "Le(s) choix du sondage",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, message) {
        let question = message.options.getString("question");
        const no_question = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous devez spécifier une question !")
            .setTimestamp()
            .setFooter({text: "Commande : poll", iconURL: client.user.displayAvatarURL({dynamic: true})});
        if (!question) {
            return message.reply({embeds: [no_question], ephemeral: true});
        }

        let choix = message.options.getString("choix").split(" | ");
        const no_choice = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous devez spécifier au moins un choix !")
            .setTimestamp()
            .setFooter({text: "Commande : poll", iconURL: client.user.displayAvatarURL({dynamic: true})});
        if (!choix) {
            return message.reply({embeds: [choix], ephemeral: true});
        }

        const too_few_choices = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous devez spécifier au moins deux choix !")
            .setTimestamp()
            .setFooter({text: "Commande : poll", iconURL: client.user.displayAvatarURL({dynamic: true})});
        if (choix.length < 2) {
            return message.reply({embeds: [too_few_choices], ephemeral: true});
        }

        const too_many_choices = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Vous ne pouvez pas spécifier plus de 20 choix !")
            .setTimestamp()
            .setFooter({text: "Commande : poll", iconURL: client.user.displayAvatarURL({dynamic: true})});
        if (choix.length > 20) {
            return message.reply({embeds: [too_many_choices], ephemeral: true});
        }

        const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬', '🇭', '🇮', '🇯', '🇰', '🇱', '🇲', '🇳', '🇴', '🇵', '🇶', '🇷', '🇸', '🇹']
        const sent = new EmbedBuilder()
            .setColor("Random")
            .setTitle(question)
            .setDescription(choix.map((choice, i) => `${emojis[i]} ${choice}`).join('\n\n'))
            .setTimestamp()
            .setFooter({text: "Commande : poll", iconURL: client.user.displayAvatarURL({dynamic: true})});

        message.reply("Nouveau sondage :");

        const react = await message.channel.send({embeds: [sent]});
        try {
            for (let i = 0; i < choix.length; i++) {
                await react.react(emojis[i])
            }
        } catch (e) {
            console.error("Erreur lors de l'ajout d'un des emojis : ", e);
        }

    }
};