const index = require('../../index');

module.exports.ServerJoin = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT server_join FROM messages WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.server_join);
        })
    });
}

module.exports.ServerQuit = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT server_leave FROM messages WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.server_leave);
        })
    });
}

module.exports.PrivateJoin = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT private_join FROM messages WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.private_join);
        })
    });
}