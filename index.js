const Discord = require('discord.js'); // require le module discord.js
const intents = new Discord.IntentsBitField(3276799); // crée un nouvel objet intents avec le bitfield de l'intents
const client = new Discord.Client({intents}); // crée un nouveau client avec l'intents
const loadCommands = require('./Loader/loadCommands'); // require le fichier loadCommands.js
const loadEvents = require('./Loader/loadEvents'); // require le fichier loadEvents.js

client.commands = new Discord.Collection(); // crée un nouveau tableau de commandes

const token = require('./token.json'); // token.json est un fichier contenant le token du bot
const config = require('./config.js'); // config.js est un fichier contenant les paramètres du bot

client.login(token.token); // connecte le bot au serveur Discord
loadCommands(client); // charge les commandes du bot
loadEvents(client); // charge les évènements du bot

client.on('messageCreate', (message) => {
    if (message.content.includes(token.token)) {
        message.delete()
        console.log('Le token a été envoyé sur Discord, la sécurité du bot est compromise : régénère le token du bot au plus vite !\nhttps://discord.com/developers/applications/1009100180055924746/bot');
        client.users.fetch('588381876989853697').then(user => {
            user.send("Le token a été envoyé sur Discord, la sécurité du bot est compromise : régénère le token du bot au plus vite !\nhttps://discord.com/developers/applications/1009100180055924746/bot").then(client => {
                client.destroy() //Not a function but still kills the client so use whatever you want.
            })
        })
    }

    const evalaccess = ["588381876989853697"]
    let clean = text => {
        if (typeof text === "string")
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    };

    if (message.content.startsWith(">eval")) {
        if (!evalaccess.includes(message.author.id)) return client.users.fetch('588381876989853697').then(user => {
            user.send(`${message.author.tag} tente d'utiliser le eval, penser à prendre des mesures d'éloignement !`)
        });
        try {
            const code = message.content.substr(6);
            let evaled = eval(code);

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
            if (evaled.length > 2000)
                evaled =
                    "Je ne peux pas envoyer un message de plus de 2000 caractères.";
            message.channel.send(clean(evaled), {code: "xl"});
            message.react("✅");
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`\n${clean(err)}\n\`\`\``);
            message.react("❌");
        }
    }
});