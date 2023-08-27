const Discord = require('discord.js');

module.exports = async (client, interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
        let entry = interaction.options.getFocused()

        if (interaction.commandName === "help") {
            let choices = client.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? client.commands.map(cmd => ({name : cmd.name, value : cmd.name})) : choices.map(choice => ({name : choice.name, value : choice.name})))
        }

    }

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let command = require(`../Commandes/${interaction.commandName}`);
        if (!command || !interaction.commandName) {
            interaction.reply("Pas de commande renseignée ! / Commande inconnue !");
        }
        else command.run(client, interaction, interaction.options, client.db);
    }
}