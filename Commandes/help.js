const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "help",
    description: "Permet de voir les commandes du bot ; Affiche cet embed",
    dmPermission: true,
    permission: "Aucune",
    category: "Utilitaire",
    options: [
        {
            type: "string",
            name: "commande",
            description: "La commande dont vous souhaitez connaître les détails",
            required: false
        }
    ],

    async run(client, message, args) {
        const no_command = new Discord.EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Cette commande n'existe pas !")
            .setFooter({text: "Commande : help", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        let command;
        if (message.options.getString("commande")) {
            command = client.commands.get(message.options.getString("commande"));
            if (!command) return message.reply({embeds: [no_command]});
        }

        if (!command) {
            let categories = [];
            client.commands.forEach((command) => {
                if (!categories.includes(command.category)) {
                    categories.push(command.category);
                }
            });

            const help_commands = new Discord.EmbedBuilder()
                .setColor("Random")
                .setTitle("Commandes")
                .setDescription(`Nombre de commandes : ${client.commands.size}\nNombre de catégories : ${categories.length}`)
                .setFooter({text: "Commande : help", iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}));

            await categories.sort().forEach((category) => {
                let commands = client.commands.filter((command) => command.category === category);
                help_commands.addFields({
                    name: `${category}`,
                    value: `${commands.map((command) => `\`/${command.name}\` : ${command.description}`).join("\n")}`,
                });
            });

            await message.reply({embeds: [help_commands]});
        } else {
            if (!command.syntax) {
                command.syntax = "Aucune";
            }
            const help_command = new Discord.EmbedBuilder()
                .setColor("Random")
                .setTitle(`Commande : ${command.name}`)
                .setDescription(`Description : ${command.description}\nPermission : ${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\nCatégorie : ${command.category}\nSynthaxe : \`${command.syntax}\`\nPossibilité d'utiliser la commande en message privé : ${command.dmPermission ? "Oui" : "Non"}\nOptions : ${command.options ? command.options.map((option) => `\n- \`${option.name}\` : ${option.description}. ${option.required ? "Option obligatoire" : "Option optionnelle"}`) : "Aucune"}`)
                .setFooter({text: "Commande : help", iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}));

            await message.reply({embeds: [help_command]});
        }
    }
}