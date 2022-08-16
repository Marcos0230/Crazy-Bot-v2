const fs = require('fs'); // require le module fs

module.exports = async (client) => {
    for (const files of fs.readdirSync('./Events/').filter(f => f.endsWith(".js"))) {
        let event = require(`../Events/${files}`); // require le fichier command.js
        client.on(files.split('.js').join(""), event.bind(null, client)) // ajoute l'évènement au bot
        console.log(`Event ${files} chargé avec succès !`); // affiche dans la console que l'évènement a été chargé
    }
}