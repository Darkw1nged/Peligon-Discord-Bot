const index = require('../../index');

module.exports.getRankChannel = function getRankChannel(guild) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT rankup FROM channels WHERE guild_id = ${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.rankup);
        });
    });
}

module.exports.getLogsChannel = function getLogsChannel(guild) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT log FROM channels WHERE guild_id = ${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.log);
        });
    });
}

module.exports.setLogsChannel = function (guild, channel) {
    index.databaseConnection.query(`UPDATE channels SET log='${channel.id}' WHERE guild_id=${guild.id}`);
}

module.exports.getWordleCategory = function getWordleCategory(guild) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT category_wordle FROM channels WHERE guild_id = ${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.category_wordle);
        });
    });
}

module.exports.setWordleCategory = function setWordleCategory(guild, id) {
    index.databaseConnection.query(`UPDATE channels SET category_wordle='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
        if (err) throw err;
    });
}


// module.exports.getStatisticsCatagory = function getStatisticsCatagory(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT statistics_category FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.statistics_category);
//         });
//     })
// }

// module.exports.setStatisticsCatagory = function setStatisticsCatagory(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET statistics_category='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }

// module.exports.getServerTotalChannel = function getServerTotalChannel(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT server_total FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.server_total);
//         });
//     })
// }

// module.exports.setServerTotalChannel = function setServerTotalChannel(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET server_total='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }

// module.exports.getHumansChannel = function getHumansChannel(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT humans FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.humans);
//         });
//     })
// }

// module.exports.setHumansChannel = function setHumansChannel(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET humans='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }

// module.exports.getBotsChannel = function getBotsChannel(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT bots FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.bots);
//         });
//     })
// }

// module.exports.setBotsChannel = function setBotsChannel(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET bots='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }

// module.exports.getOnlineChannel = function getOnlineChannel(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT online FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.online);
//         });
//     })
// }

// module.exports.setOnlineChannel = function setOnlineChannel(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET online='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }

// module.exports.getBoostersChannel = function getBoostersChannel(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT boosters FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.boosters);
//         });
//     })
// }

// module.exports.setBoostersChannel = function setBoostersChannel(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET boosters='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }

// module.exports.getRolesChannel = function getRolesChannel(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT roles FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.roles);
//         });
//     })
// }

// module.exports.setRolesChannel = function setRolesChannel(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET roles='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }

// module.exports.getTotalChannelsChannel = function getTotalChannelsChannel(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT channels FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.channels);
//         });
//     })
// }

// module.exports.setTotalChannelsChannel = function setTotalChannelsChannel(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET channels='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }

// module.exports.getTotalVoiceChannelsChannel = function getTotalVoiceChannelsChannel(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT voice_channels FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.voice_channels);
//         });
//     })
// }

// module.exports.setTotalVoiceChannelsChannel = function setTotalVoiceChannelsChannel(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET voice_channels='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }

// module.exports.getTotalTextChannelsChannel = function getTotalTextChannelsChannel(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT text_channels FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.text_channels);
//         });
//     })
// }

// module.exports.setTotalTextChannelsChannel = function setTotalTextChannelsChannel(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET text_channels='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }

// module.exports.getCategoryChannel = function getCategoryChannel(guild) {
//     return new Promise((resolve, reject) => {
//         index.databaseConnection.query(`SELECT categories FROM peligonCoreStats WHERE guild_id=${guild.id}`, (err, result) => {
//             if (err) throw err;
//             resolve(result[0]?.categories);
//         });
//     })
// }

// module.exports.setCategoryChannel = function setCategoryChannel(guild, id) {
//     index.databaseConnection.query(`UPDATE peligonCoreStats SET categories='${id}' WHERE guild_id=${guild.id}`, (err, result) => {
//         if (err) throw err;
//     });
// }