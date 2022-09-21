const index = require('../../index');

module.exports.isGuildInDatabase = function isGuildInDatabase(guild) {
    return new Promise((resolve) =>  {
        index.databaseConnection.query(`SELECT * FROM guilds WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0] !== undefined);
        });
    });
}

module.exports.getServerPrefix = function getServerPrefix(guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT prefix FROM guilds WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.prefix);
        });
    });
}

module.exports.isUserInDatabase = function isUserInDatabase(guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT * FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0] !== undefined);
        });
    });
}