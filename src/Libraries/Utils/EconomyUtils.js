const index = require('../../index');

module.exports.getCoins = function getCoins(guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT * FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.coins);
        });
    });
}

module.exports.addCoins = async function addCoins(guild, user, coins) {
    index.databaseConnection.query(`UPDATE users SET coins = ${await this.getCoins(guild, user) + coins} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
    });
}

module.exports.removeCoins = async function removeCoins(guild, user, coins) {
    index.databaseConnection.query(`UPDATE users SET coins = ${await this.getCoins(guild, user) - coins} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
    });
}

module.exports.getBankBalance = function getBankBalance(guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT bank FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.bank);
        });
    });
}

module.exports.getCoinsRank = function getCoinsRank(guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT coins_leaderboard_position FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.coins_leaderboard_position);
        });
    });
}

module.exports.getBankRank = function getBankRank(guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT bank_leaderboard_position FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.bank_leaderboard_position);
        });
    });
}

module.exports.getCoinBooster = async function getCoinBooster(guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT coin_boosters FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.coin_boosters);
        });
    });
}

module.exports.addCoinBooster = async function addCoinBooster(guild, user, amount) {
    index.databaseConnection.query(`UPDATE users SET coin_boosters = ${await this.getCoinBooster(guild, user) + amount} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
    });
}

module.exports.removeCoinBooster = async function removeCoinBooster(guild, user, amount) {
    index.databaseConnection.query(`UPDATE users SET coin_boosters = ${await this.getCoinBooster(guild, user) - amount} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
    });
}