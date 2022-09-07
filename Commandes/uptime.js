const Discord = require('discord.js'); // require le module discord.js
const {EmbedBuilder} = require("discord.js");

module.exports = { // exporte la commande uptime
    name: 'uptime', // nom de la commande
    description: 'Permet de connaître le uptime du bot', // description de la commande
    permission: 'Aucune', // permission nécessaire pour exécuter la commande
    dmPermission: true, // permission nécessaire pour exécuter la commande en message privé
    category: 'Utilitaire', // catégorie de la commande

    async run(client, message) { // execute la commande uptime
        let days = Math.floor(client.uptime / 86400000); // calcule le nombre de jours
        let hours = Math.floor(client.uptime / 3600000) % 24; // calcule le nombre d'heures
        let minutes = Math.floor(client.uptime / 60000) % 60; // calcule le nombre de minutes
        let seconds = Math.floor(client.uptime / 1000) % 60; // calcule le nombre de secondes

        const uptimeEmbed = new EmbedBuilder() // crée un embed
            .setTitle('Uptime') // titre de l'embed
            .setDescription(`Je suis online depuis **${days}** jours, **${hours}** heures, **${minutes}** minutes, **${seconds}** secondes !`) // description de l'embed
            .setColor('Random') // couleur de l'embed
            .setTimestamp() // ajoute une horodatage
            .setThumbnail("https://thumbs.gfycat.com/CapitalAggravatingHake-size_restricted.gif")
            .setFooter({text: "Commande : uptime", iconURL: client.user.displayAvatarURL({dynamic: true})}) // ajoute un pied de page
        await message.reply({embeds: [uptimeEmbed]}); // répond à l'utilisateur avec le uptime du bot
    }
}