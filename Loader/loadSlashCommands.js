const Discord = require('discord.js'); // require le module discord.js
const { REST } = require('@discordjs/rest'); // require le module @discordjs/rest
const { Routes } = require('discord.js'); // require le module discord.js

module.exports = async (client) => { // exporte la fonction loadSlashCommands
    let commands = []; // crée un tableau de commandes

    client.commands.forEach(async command => { // pour chaque commande du bot
        let slashcommand = new Discord.SlashCommandBuilder() // crée un nouvel objet slashcommand
            .setName(command.name) // nomme le slashcommand
            .setDescription(command.description) // décrit le slashcommand
            .setDMPermission(command.dmPermission) // définit la permission du slashcommand pour les messages privés
            .setDefaultMemberPermissions(command.permission === "Aucune" ? null : command.permission) // définit la permission du slashcommand pour les membres

        if(command.options?.length >= 1) { // si il y a des options (au moins une)
            for(let i = 0; i < command.options.length; i++) { // pour chaque option
                slashcommand[`add${command.options[i].type.slice(0, 1).toLowerCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required)) // ajoute l'option au slashcommand
            }
        }
        await commands.push(slashcommand); // ajoute le slashcommand au tableau de commandes
    })

    const rest = new REST({version: "10"}).setToken(client.token); // crée un nouvel objet rest avec la version 10

    await rest.put(Routes.applicationCommands(client.user.id), {body: commands}); // met à jour les commandes du bot sur le serveur Discord
    console.log("Slash commands chargées avec succès !"); // affiche un message de succès
}