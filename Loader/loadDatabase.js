const mysql = require('mysql');

module.exports = async () => {
    let db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'crazy_bot_v2_bdd'
    })

    return db;
}