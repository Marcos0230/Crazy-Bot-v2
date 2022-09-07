const Discord = require('discord.js');
const { ActivityType } = require('discord.js');
const intents = new Discord.IntentsBitField(3276799);
const client = new Discord.Client({intents});
const loadCommands = require('./Loader/loadCommands.js');
const loadEvents = require('./Loader/loadEvents');
const token = require('./token.json');

client.commands = new Discord.Collection();

client.login(token.token) // On se connecte au bot
loadCommands(client); // On charge les commandes
loadEvents(client); // On charge les events

client.on('ready', () => {
    const statuses = [
        'mon développeur : 🦄𝐋𝐞𝐆𝐚𝐫𝐬𝐅𝐨𝐮🌈#0230',
        'mon prefix : c.',
        'ma version : 2.0.4'
    ]
    let i = 0;
    /*client.user.setPresence({
        activities: [{ name: `discord.js v14`, type: ActivityType.Watching }],
        status: 'dnd',
    });*/
    setInterval(() => {
        client.user.setPresence({
            activities: [{ name: statuses[i], type: ActivityType.Watching }],
            status: 'online',
        });
        i = ++i % statuses.length
    }, 10000)
});

client.on('messageCreate', (message) => { // écoute l'évènement messageCreate
    if (message.content.includes(token.token)) { // si le message contient le token du bot
        message.delete() // supprime le message
        console.log('Le token a été envoyé sur Discord, la sécurité du bot est compromise : régénère le token du bot au plus vite !\nhttps://discord.com/developers/applications/1009100180055924746/bot'); // affiche un message dans la console
        client.users.fetch('588381876989853697').then(user => { // récupère l'utilisateur avec l'ID 588381876989853697
            user.send("Le token a été envoyé sur Discord, la sécurité du bot est compromise : régénère le token du bot au plus vite !\nhttps://discord.com/developers/applications/1009100180055924746/bot").then(client => { // envoie un message à l'utilisateur
                client.destroy() //Not a function but still kills the client so use whatever you want.
            })
        })
    }

    if (message.author.bot) return; // si l'auteur du message est un bot, on sort de la fonction

    const evalaccess = ["588381876989853697"] // liste des ID des personnes qui ont accès à la commande eval
    let clean = text => { // fonction qui nettoie le message
        if (typeof text === "string") // si le message est une chaîne de caractères
            return text // on retourne la chaîne de caractères
                .replace(/`/g, "`" + String.fromCharCode(8203)) // on remplace les ` par des ` + un espace invisible
                .replace(/@/g, "@" + String.fromCharCode(8203)); // on remplace les @ par des @ + un espace invisible
        else return text; // sinon on retourne le message
    };

    if (message.content.startsWith(">eval")) { // si le message commence par >eval
        if (!evalaccess.includes(message.author.id)) return client.users.fetch('588381876989853697').then(user => { // si l'utilisateur n'a pas accès à la commande eval
            message.reply("Vous n'avez pas accès au eval !")// envoie un message à l'utilisateur
            user.send(`${message.author.tag} tente d'utiliser le eval, penser à prendre des mesures d'éloignement !`) // on envoie un message au créateur du bot
        });
        try { // on essaye de
            const code = message.content.substr(6); // code contient le code à évaluer
            let evaled = eval(code); // evaled contient le résultat de l'évaluation

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled); // si le résultat de l'évaluation n'est pas une chaîne de caractères, on l'affiche sous forme d'objet
            if (evaled.length > 2000) // si le résultat de l'évaluation est plus long que 2000 caractères
                evaled =
                    "Je ne peux pas envoyer un message de plus de 2000 caractères."; // on affiche un message d'erreur
            message.channel.send(clean(evaled), {code: "xl"}); // on envoie le résultat de l'évaluation
            message.react("✅"); // on réagit avec un ✅
        } catch (err) { // si une erreur est survenue
            message.channel.send(`\`ERROR\` \`\`\`\n${clean(err)}\n\`\`\``); // on envoie un message d'erreur avec le message d'erreur
            message.react("❌"); // on réagit avec un ❌
        }
    }
});