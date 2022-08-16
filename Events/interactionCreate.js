const Discord = require('discord.js'); // require le module discord.js

module.exports = async (client, interaction) => { // exporte la fonction interactionCreate
    if(interaction.type === Discord.InteractionType.ApplicationCommand) { // si le type de l'interaction est ApplicationCommand
        let command = require(`../Commandes/${interaction.commandName}`); // command est la commande correspondant au message
        command.run(client, interaction, command.options); // execute la commande
    }
}