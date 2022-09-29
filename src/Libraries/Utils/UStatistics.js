const index = require('../../index');

module.exports.getCategory = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT category FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.category);
        });
    })
}

module.exports.getServerTotalChannel = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT server_total FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.server_total);
        });
    })
}

module.exports.setServerTotalChannel = function (guild, id) {
    index.databaseConnection.query(`UPDATE statistics SET server_total='${id}' WHERE guild_id=${guild.id}`);
}

module.exports.getHumansChannel = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT humans FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.humans);
        });
    })
}

module.exports.setHumansChannel = function setHumansChannel(guild, id) {
    index.databaseConnection.query(`UPDATE statistics SET humans='${id}' WHERE guild_id=${guild.id}`);
}

module.exports.getBotsChannel = function getBotsChannel(guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT bots FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.bots);
        });
    })
}

module.exports.setBotsChannel = function setBotsChannel(guild, id) {
    index.databaseConnection.query(`UPDATE statistics SET bots='${id}' WHERE guild_id=${guild.id}`);
}

module.exports.getOnlineChannel = function getOnlineChannel(guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT online FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.online);
        });
    })
}

module.exports.setOnlineChannel = function setOnlineChannel(guild, id) {
    index.databaseConnection.query(`UPDATE statistics SET online='${id}' WHERE guild_id=${guild.id}`);
}

module.exports.getBoostersChannel = function getBoostersChannel(guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT boosters FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.boosters);
        });
    })
}

module.exports.setBoostersChannel = function setBoostersChannel(guild, id) {
    index.databaseConnection.query(`UPDATE statistics SET boosters='${id}' WHERE guild_id=${guild.id}`);
}

module.exports.getRolesChannel = function getRolesChannel(guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT roles FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.roles);
        });
    })
}

module.exports.setRolesChannel = function setRolesChannel(guild, id) {
    index.databaseConnection.query(`UPDATE statistics SET roles='${id}' WHERE guild_id=${guild.id}`);
}

module.exports.getTotalChannelsChannel = function getTotalChannelsChannel(guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT channels FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.channels);
        });
    })
}

module.exports.setTotalChannelsChannel = function setTotalChannelsChannel(guild, id) {
    index.databaseConnection.query(`UPDATE statistics SET channels='${id}' WHERE guild_id=${guild.id}`);
}

module.exports.getTotalVoiceChannelsChannel = function getTotalVoiceChannelsChannel(guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT voice_channels FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.voice_channels);
        });
    })
}

module.exports.setTotalVoiceChannelsChannel = function setTotalVoiceChannelsChannel(guild, id) {
    index.databaseConnection.query(`UPDATE statistics SET voice_channels='${id}' WHERE guild_id=${guild.id}`);
}

module.exports.getTotalTextChannelsChannel = function getTotalTextChannelsChannel(guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT text_channels FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.text_channels);
        });
    })
}

module.exports.setTotalTextChannelsChannel = function setTotalTextChannelsChannel(guild, id) {
    index.databaseConnection.query(`UPDATE statistics SET text_channels='${id}' WHERE guild_id=${guild.id}`);
}

module.exports.getCategoryChannel = function getCategoryChannel(guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT categories FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.categories);
        });
    })
}

module.exports.setCategoryChannel = function setCategoryChannel(guild, id) {
    index.databaseConnection.query(`UPDATE statistics SET categories='${id}' WHERE guild_id=${guild.id}`);
}