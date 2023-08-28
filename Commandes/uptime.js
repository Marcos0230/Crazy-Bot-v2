const Discord = require('discord.js');
const {EmbedBuilder} = require("discord.js");

module.exports = {
    name: 'uptime',
    description: 'Permet de connaître le uptime du bot',
    permission: 'Aucune',
    dmPermission: true,
    category: 'Information',
    syntax: 'uptime',

    async run(client, message) {
        let days = Math.floor(client.uptime / 86400000); // calcule le nombre de jours
        let hours = Math.floor(client.uptime / 3600000) % 24; // calcule le nombre d'heures
        let minutes = Math.floor(client.uptime / 60000) % 60; // calcule le nombre de minutes
        let seconds = Math.floor(client.uptime / 1000) % 60; // calcule le nombre de secondes

        const uptimeEmbed = new EmbedBuilder()
            .setTitle('Uptime')
            .setDescription(`Je suis online depuis **${days}** jours, **${hours}** heures, **${minutes}** minutes, **${seconds}** secondes !`)
            .setColor('Random')
            .setTimestamp()
            .setThumbnail("https://thumbs.gfycat.com/CapitalAggravatingHake-size_restricted.gif")
            .setFooter({text: "Commande : uptime", iconURL: client.user.displayAvatarURL({dynamic: true})})
        await message.reply({embeds: [uptimeEmbed]});
    }
}