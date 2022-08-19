const Discord = require("discord.js");

module.exports = {
    name: "kick",
    description: "Permet de kick un membre",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.KickMembers,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à kick",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du kick",
            required: false
        }
    ],
    async run(client, message, args) {

        let user = args.getUser("membre");
        if (!user) {
            message.reply(`Le membre n'existe pas !`);
        }
        let member = await message.guild.members.cache.get(user.id);
        if (!member) {
            message.reply(`Le membre n'existe pas !`);
        }

        let reason = args.getString("raison");
        if (!reason) {
            reason = "Aucune raison donnée";
        }

        if (message.user.id === user.id) {
            message.reply(`Vous ne pouvez pas vous kick vous même !`);
        }
        if ((await message.guild.fetchOwner()).id === user.id) {
            message.reply(`Vous ne pouvez pas kick le propriétaire du serveur !`);
        }
        if (member && !member.kickable) {
            message.reply(`Je ne peux pas kick ce membre !`);
        }
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
            message.reply(`Vous ne pouvez pas kick ce membre !`);
        }

        await member.kick(reason);

        try {
            await user.send(`Vous avez été kick du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
        } catch (err) {
            message.reply(`Le membre n'a pas pu être averti !`);
        }
        await message.reply(`**${message.user}** a kick **${user.tag}** pour la raison suivante : **${reason}**`);

    }
}