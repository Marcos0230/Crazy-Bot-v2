const Discord = require('discord.js');

module.exports = async (client, interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let command = require(`../Commandes/${interaction.commandName}`);
        command.run(client, interaction, command.options);
    }
}