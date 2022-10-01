const index = require('../../index');

module.exports.getRankChannel = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT rankup FROM channels WHERE guild_id = ${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.rankup);
        });
    });
}

module.exports.getLogsChannel = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT log FROM channels WHERE guild_id = ${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.log);
        });
    });
}

module.exports.setLogsChannel = function (guild, channel) {
    index.databaseConnection.query(`UPDATE channels SET log='${channel.id}' WHERE guild_id=${guild.id}`);
}

module.exports.getGamesCategory = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT category_games FROM channels WHERE guild_id = ${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.category_games);
        });
    });
}

module.exports.setGamesCategory = function (guild, id) {
    index.databaseConnection.query(`UPDATE channels SET category_games='${id}' WHERE guild_id=${guild.id}`);
}