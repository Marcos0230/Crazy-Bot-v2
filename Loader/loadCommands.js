const fs = require('fs'); // require le module fs

module.exports = async (client) => {
    fs.readdirSync('./Commandes/').filter(f => f.endsWith(".js")).forEach(async files => {
        let command = require(`../Commandes/${files}`); // require le fichier command.js
        if(!command.name || typeof command.name !== "string") throw new TypeError(`${files} n'a pas de nom ou n'est pas un string`); // vérifie que le fichier a un nom et que ce nom est un string
        await client.commands.set(command.name, command); // ajoute la commande au tableau des commandes du bot
        console.log(`${files} chargé avec succès !`); // affiche dans la console que le fichier a été chargé avec succès
    })
}