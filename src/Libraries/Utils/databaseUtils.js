const index = require('../../index');

module.exports.isGuildInDatabase = function (guild) {
    return new Promise((resolve) =>  {
        index.databaseConnection.query(`SELECT * FROM guilds WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0] !== undefined);
        });
    });
}

module.exports.getServerPrefix = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT prefix FROM guilds WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.prefix);
        });
    });
}

module.exports.isUserInDatabase = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT * FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0] !== undefined);
        });
    });
}

module.exports.getUserInfractions = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT infractions FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0].infractions);
        });
    });
}

module.exports.incrementInfractions = async function (guild, user) {
    index.databaseConnection.query(`UPDATE users SET infractions=${await this.getUserInfractions(guild, user)} + 1 WHERE guild_id=${guild.id} AND user_id=${user.id}`);
}