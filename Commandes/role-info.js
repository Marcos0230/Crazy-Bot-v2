const Discord = require("discord.js")
const {EmbedBuilder} = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: "role-info",
    description: "Permet de savoir les informations de la personne mentioner !",
    permission: "Aucune",
    dmPermission: false,
    options: [
        {
            type: "role",
            name: "role",
            description: "Le rôle à mentioner",
            required: true
        },
    ],

    async run(client, message, args) {
        let role = await message.guild.roles.fetch(args._hoistedOptions[0].value);
        const no_role = new EmbedBuilder()
            .setColor("#ff0000")
            .setTitle("Erreur")
            .setDescription("Ce membre n'existe pas !")
            .setFooter({text: "Commande : ban", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .setTimestamp()
            .setThumbnail(config.error_gif);
        if (!role) {
            return message.reply({embeds: [no_role]});
        }
        const role_info = new EmbedBuilder()
            .setColor(role.hexColor)
            .setTitle("Rôle : " + role.name)
            .addFields({
                name: "ID",
                value: role.id,
                inline: true
            })
            .addFields({
                name: 'Couleur',
                value: `${role.hexColor}`,
                inline: true
            })
            .addFields({
                name: 'Membres le possédant',
                value: `${role.members.size}`,
                inline: true
            })
            .addFields({
                name: "Date de création du rôle",
                value: `<t:${Math.floor(role.createdAt / 1000)}:F>`,
                inline: true
            })
            .addFields({
                name: "Affiché séparément ?",
                value: `${role.hoist}` ? "Oui" : "Non",
                inline: true
            })
            .addFields({
                name: "Mentionnable ?",
                value: `${role.mentionable}` ? "Oui" : "Non",
                inline: true
            })
            .setThumbnail(role.iconURL({dynamic: true}) ? null : message.guild.iconURL({dynamic: true}))
            .setFooter({text: "ID : " + role.id, iconURL: client.user.displayAvatarURL({dynamic: true})});
        await message.reply({embeds: [role_info]});
    }
}