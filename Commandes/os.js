const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const os = require("os");

module.exports = {
    name: "os",
    description: "Permet de connaître des infos sur l'OS du bot",
    dmPermission: true,
    permission: "Aucune",
    category: "Information",
    syntax: "os",

    async run(client, message) {
        const osEmbed = new EmbedBuilder()
            .setTitle("Voici les infos sur l'OS du bot :")
            .setColor("Random")
            .setTimestamp()
            .setImage("https://media.tenor.com/xCc58fEqFREAAAAM/nerd-nerdy.gif")
            .setFooter({text: "Commande : os", iconURL: client.user.displayAvatarURL({dynamic: true})})
            .addFields({
                name: "OS",
                value: `${os.type()} ${os.release()} (${os.arch()})`,
                inline: true
            })
            .addFields({
                name: "CPU",
                value: `${os.cpus()[0].model}`,
                inline: true
            })
            .addFields({
                name: "RAM",
                value: `${Math.round(os.totalmem() / 1024 / 1024 / 1024)}GB`,
                inline: true
            })
            .addFields({
                name: "Utilisation de la RAM",
                value: `${Math.round((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024)}GB / ${Math.round(os.totalmem() / 1024 / 1024 / 1024)}GB (${Math.round((os.totalmem() - os.freemem()) / os.totalmem() * 100)}%)`,
                inline: true
            })
            .addFields({
                name:"Uptime de l'OS",
                value: `${Math.floor(os.uptime() / 3600)}h ${Math.floor(os.uptime() / 60) % 60}m ${Math.floor(os.uptime() % 60)}s`,
                inline: true
            })
            .addFields({
                name: "Utilisateur",
                value: `${os.userInfo().username} (${os.userInfo().homedir})`,
                inline: true
            })

        message.reply({embeds: [osEmbed]});
    }
}