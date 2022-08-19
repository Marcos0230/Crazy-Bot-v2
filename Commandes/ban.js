const Discord = require("discord.js");

module.exports = {
    name: "ban",
    description: "Permet de bannir un membre",
    dmPermission: false,
    permission: Discord.PermissionFlagsBits.BanMembers,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à bannir",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "La raison du ban",
            required: false
        }
    ],
    async run(client, message, args) {
        try {
            let user = await client.users.fetch(args._hoistedOptions[0].value);
            if (!user) {
                return message.reply(`Le membre n'existe pas !`);
            }
            let member = await message.guild.members.cache.get(user.id);

            let reason = args.getString("raison");
            if (!reason) {
                reason = "Aucune raison donnée";
            }

            if (message.user.id === user.id) {
                return message.reply(`Vous ne pouvez pas vous bannir vous même !`);
            }
            if ((await message.guild.fetchOwner()).id === user.id) {
                return message.reply(`Vous ne pouvez pas bannir le propriétaire du serveur !`);
            }
            if (member && !member.bannable) {
                return message.reply(`Je ne peux pas bannir ce membre !`);
            }
            if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
                return message.reply(`Vous ne pouvez pas bannir ce membre !`);
            }
            if ((await message.guild.bans.fetch()).get(user.id)) {
                return message.reply(`Ce membre est déjà banni !`);
            }

            try {
                await user.send(`Vous avez été banni du serveur **${message.guild.name}** par **${message.user.tag}** pour la raison suivante : **${reason}**`);
            } catch (err) {
                message.reply(`Le membre n'a pas pu être averti !`);
            }
            await message.reply(`**${message.user}** a banni **${user.tag}** pour la raison suivante : **${reason}**`);

            await message.guild.bans.create(user.id, {reason: reason});
        } catch (error) {
            message.reply(`Le membre n'existe pas !`);
            console.log(error);
        }
    }
}