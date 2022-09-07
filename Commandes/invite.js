const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Permet d'obtenir l'invitation vers le serveur de \"support\" du bot",
    dmPermission: true,
    permission: Discord.PermissionFlagsBits.CreateInstantInvite,
    category: "Utilitaire",

    async run(client, message) {
        let invite = await message.guild.invites.create('695196659860373537', {
            temporary: false,
            maxAge: 86400,
            maxUses: 1,
            unique: true,
            reason: `Invitation créée suite à la commande invite`
        });

        await message.reply({content: `${invite.url}`, ephemeral: true});
    }
}