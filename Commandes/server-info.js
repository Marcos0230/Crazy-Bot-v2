const Discord = require("discord.js")
const {EmbedBuilder} = require('discord.js');
const config = require("../config.json");

module.exports = {
    name: "server-info",
    description: "Permet de savoir les informations du serveur où est executé la commande !",
    permission: "Aucune",
    dmPermission: false,

    async run(client, message, args) {
        const serverInfoEmbed = new EmbedBuilder()
            .setTitle(`Voici les informations du serveur ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({dynamic: true}))
            .addFields({
                name: '👥 • Membres',
                value: `**${message.guild.memberCount}** membres\n**${message.guild.members.cache.filter(member => !member.user.bot).size}** humains\n**${message.guild.members.cache.filter(member => member.user.bot).size}** bots`,
                inline: true
            })
            .addFields({
                name: '📋 • Channels',
                value: `**${message.guild.channels.cache.size}** salons\n**${message.guild.channels.cache.filter(channel => channel.isTextBased()).size}** salons textuels\n**${message.guild.channels.cache.filter(channel => channel.isVoiceBased()).size}** salons vocaux`,
                inline: true
            })
            .addFields({
                name: '😀 • Emojis',
                value: `**${message.guild.emojis.cache.size}** emojis\n**${message.guild.emojis.cache.filter(emoji => !emoji.animated).size}** emojis statiques\n**${message.guild.emojis.cache.filter(emoji => emoji.animated).size}** emojis animés`,
                inline: true
            })

            .addFields({
                name: '👤 • Rôles',
                value: `**${message.guild.roles.cache.size}** rôles`,
                inline: true
            })
            .addFields({
                name: '👑 • Propriétaire',
                value: `**<@${message.guild.ownerId}>** est le propriétaire du serveur`,
                inline: true
            })
            .addFields({
                name: '📅 • Date de création',
                value: `<t:${Math.floor(message.guild.createdAt / 1000)}:F>`,
                inline: true
            })
            .addFields({
                name: '💵 • Nitro boost',
                value: `Tier : **${message.guild.premiumTier}**\nNombre de boosts : **${message.guild.premiumSubscriptionCount}**`,
                inline: true
            })
            .addFields({
                name: '🆔 • ID',
                value: `**${message.guild.id}**`,
                inline: true
            })
            .setTimestamp()
            .setFooter({text: "Commande : server-info", iconURL: client.user.displayAvatarURL({dynamic: true})})

        await message.reply({embeds: [serverInfoEmbed]});
    }
}