const Discord = require('discord.js');
const { ActivityType } = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const client = new Discord.Client({intents});
const loadCommands = require('./Loader/loadCommands.js');
const loadEvents = require('./Loader/loadEvents.js');
const token = require('./token.json');

client.commands = new Discord.Collection();
client.function = {
    createID: require('./Fonctions/createID.js'),
};

try {
    client.login(token.token)
    loadCommands(client);
    loadEvents(client);
} catch (err) {
    console.log(err);
}


client.on('ready', () => {
    const statuses = [
        'Mon développeur : @legarsfou',
        'Ma version : 2.3.0'
    ]
    let i = 0;
    /*client.user.setPresence({
        activities: [{ name: `discord.js v14`, type: ActivityType.Watching }],
        status: 'dnd',
    });*/
    setInterval(() => {
        client.user.setPresence({
            activities: [{ name: statuses[i], type: ActivityType.Custom }],
            status: 'online',
        });
        i = ++i % statuses.length
    }, 10000)
});

client.on('messageCreate', (message) => {
    if (message.content.includes(token.token)) {
        message.reply('GG I guess? Shutting down... 🙄')
        message.delete()
        console.log('Le token a été envoyé sur Discord, la sécurité du bot est compromise : régénère le token du bot au plus vite !\nhttps://discord.com/developers/applications/1009100180055924746/bot');
        client.users.fetch('588381876989853697').then(user => {
            user.send("Le token a été envoyé sur Discord, la sécurité du bot est compromise : régénère le token du bot au plus vite !\nhttps://discord.com/developers/applications/1009100180055924746/bot").then(client => {
                client.destroy()
            })
        })
    }

    if (message.author.bot) return;

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
            message.reply("Vous n'avez pas accès au eval !")
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