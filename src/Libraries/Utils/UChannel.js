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

module.exports.getWordleCategory = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT category_wordle FROM channels WHERE guild_id = ${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.category_wordle);
        });
    });
}

module.exports.setWordleCategory = function (guild, id) {
    index.databaseConnection.query(`UPDATE channels SET category_wordle='${id}' WHERE guild_id=${guild.id}`);
}