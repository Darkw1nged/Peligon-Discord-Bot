const index = require('../../index');

module.exports.getCategory = function (guild) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT category FROM statistics WHERE guild_id=${guild.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.bank);
        });
    })
}