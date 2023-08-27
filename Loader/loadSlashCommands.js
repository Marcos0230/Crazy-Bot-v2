const Discord = require('discord.js');
const {REST} = require('@discordjs/rest'); // require le module @discordjs/rest
const {Routes} = require('discord.js'); // require le module discord.js

module.exports = async (client) => {
    let commands = [];

    client.commands.forEach(async command => {
        let SlashCommands = new Discord.SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setDMPermission(command.dmPermission)
            .setDefaultMemberPermissions(command.permission === "Aucune" ? null : command.permission);

        if (command.options?.length >= 1) {
            for (let i = 0; i < command.options.length; i++) {
                if (command.options[i].type === "string") SlashCommands[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required).setAutocomplete(command.options[i].autocomplete))
                else SlashCommands[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required))
            }
        }
        await commands.push(SlashCommands);
    });
    const rest = new REST({version: "10"}).setToken(client.token); // crée un nouvel objet rest avec la version 10

    await rest.put(Routes.applicationCommands(client.user.id), {body: commands}); // met à jour les commandes du bot sur le serveur Discord
    console.log("Slash Commands créées avec succès !"); // affiche un message de succès
}