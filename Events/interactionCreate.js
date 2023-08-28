const Discord = require('discord.js');

module.exports = async (client, interaction) => {
    if (interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {
        let entry = interaction.options.getFocused()

        if (interaction.commandName === "help") {
            let choices = client.commands.filter(cmd => cmd.name.includes(entry))
            await interaction.respond(entry === "" ? client.commands.map(cmd => ({name : cmd.name, value : cmd.name})) : choices.map(choice => ({name : choice.name, value : choice.name})))
        }

    }

    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
        let command = require(`../Commandes/${interaction.commandName}`);
        if (!command || !interaction.commandName) {
            interaction.reply("Pas de commande renseignée ! / Commande inconnue !");
        }
        else command.run(client, interaction, interaction.options, client.db);
    }

    if (interaction.isButton()) {
        if (interaction.customId === "ticket") {
            let channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                topic: interaction.user.id,
                type: Discord.ChannelType.GuildText,
                parent: "1145844366372511877",
                permissionOverwrites: [
                    {
                    id: interaction.guild.roles.everyone.id,
                    deny: Discord.PermissionFlagsBits.ViewChannel
                    },
                    {
                    id: interaction.user.id,
                    allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ReadMessageHistory, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks]
                    }
                ]
            })

            await interaction.reply({content: `Votre ticket a été créé !\n\nRetrouvez le ici : ${channel}`, ephemeral: true})

            const reply_in_channel_embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setTitle("Ticket")
                .setDescription("Voici votre ticket, décrivez votre problème et nous essaierons de vous répondre le plus rapidement possible !\n\nPour fermer le ticket, cliquez sur la réaction ci-dessous !")
                .setThumbnail("https://c.tenor.com/Op9wKgHRM-MAAAAM/verstappen-max-verstappen.gif")
                .setFooter({text: "Commande : ticket", iconURL: client.user.displayAvatarURL({dynamic: true})})
                .setTimestamp()

            const close_button = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder()
                .setCustomId("close")
                .setLabel("Ferme ce ticket")
                .setStyle(Discord.ButtonStyle.Danger)
                .setEmoji("🗑️")
            )

            await channel.send({embeds: [reply_in_channel_embed], components: [close_button]})
        }

        if (interaction.customId === "close") {
            let user = client.users.cache.get(interaction.channel.topic)
            try {
                await user.send(`Votre ticket a été fermé par **${interaction.user.username}** (${interaction.user.id}) !`)
            } catch (error) {
                console.log(error)
            }

            await interaction.channel.delete()
        }
    }
}