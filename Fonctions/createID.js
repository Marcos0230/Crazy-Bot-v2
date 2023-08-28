module.exports = async prefix => {
    let characters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    let ID = [];
    for (let i = 0; i < 6; i++) {
        ID.push(characters[Math.floor(Math.random() * characters.length)]);
    }

    return `${ID.join("")}`;
}