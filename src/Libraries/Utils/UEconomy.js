const index = require('../../index');

module.exports.getCoins = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT * FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.coins);
        });
    });
}

module.exports.addCoins = async function (guild, user, coins) {
    index.databaseConnection.query(`UPDATE users SET coins = ${await this.getCoins(guild, user) + coins} WHERE guild_id=${guild.id} AND user_id=${user.id}`);
}

module.exports.removeCoins = async function (guild, user, coins) {
    index.databaseConnection.query(`UPDATE users SET coins = ${await this.getCoins(guild, user) - coins} WHERE guild_id=${guild.id} AND user_id=${user.id}`);
}

module.exports.getBankBalance = function (guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT bank FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.bank);
        });
    });
}

module.exports.getCoinsRank = function (guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT coins_leaderboard_position FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.coins_leaderboard_position);
        });
    });
}

module.exports.getBankRank = function (guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT bank_leaderboard_position FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.bank_leaderboard_position);
        });
    });
}

module.exports.getCoinBooster = async function (guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT coin_boosters FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.coin_boosters);
        });
    });
}

module.exports.addCoinBooster = async function (guild, user, amount) {
    index.databaseConnection.query(`UPDATE users SET coin_boosters = ${await this.getCoinBooster(guild, user) + amount} WHERE guild_id=${guild.id} AND user_id=${user.id}`);
}

module.exports.removeCoinBooster = async function (guild, user, amount) {
    index.databaseConnection.query(`UPDATE users SET coin_boosters = ${await this.getCoinBooster(guild, user) - amount} WHERE guild_id=${guild.id} AND user_id=${user.id}`);
}