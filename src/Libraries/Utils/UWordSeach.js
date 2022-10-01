const index = require('../../index');
const leaderboardUtils = require('./ULeaderboard');
const experienceUtils = require('./UExperience');
const economyUtils = require('./UEconomy');

module.exports.inGame = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT channel_id FROM word_search WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0] !== undefined);
        });
    });
}

module.exports.startGame = function (guild, user, channel, difficulty, lines, words) {
    index.databaseConnection.query(`INSERT INTO word_search (guild_id, user_id, channel_id, difficulty, board, words) VALUES (${guild.id}, ${user.id}, ${channel.id}, '${difficulty}', '${lines}', '${words}')`);
}

module.exports.getChannel = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT channel_id FROM word_search WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.channel_id);
        });
    })
}

module.exports.getWords = function (guild, user, channel) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT words FROM word_search WHERE guild_id=${guild.id} AND user_id=${user.id} AND channel_id=${channel.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.words);
        });
    })
}

module.exports.getDifficulty = function (guild, user, channel) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT difficulty FROM word_search WHERE guild_id=${guild.id} AND user_id=${user.id} AND channel_id=${channel.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.difficulty);
        });
    })
}

module.exports.getLines = function (guild, user, channel) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT board FROM word_search WHERE guild_id=${guild.id} AND user_id=${user.id} AND channel_id=${channel.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.board);
        });
    })
}

module.exports.getGamesWon = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT games_won FROM word_search_profile WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.games_won);
        });
    })
}

module.exports.getGamesForfeited = function (guild, user) { 
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT forfeited FROM word_search_profile WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.forfeited);
        });
    })
}

module.exports.getWinStreak = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT games_won_streak FROM word_search_profile WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.games_won_streak);
        });
    })
}

module.exports.getBestWinStreak = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT games_won_best_streak FROM word_search_profile WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.games_won_best_streak);
        });
    })
}

module.exports.endGane = async function (guild, user, forfeited) {
    if (forfeited) {
        index.databaseConnection.query(`UPDATE word_search_profile SET games_won_streak=0 WHERE guild_id=${guild.id} AND user_id=${user.id}`);
        index.databaseConnection.query(`UPDATE word_search_profile SET forfeited=${await this.getGamesForfeited(guild, user)} + 1 WHERE guild_id=${guild.id} AND user_id=${user.id}`);
    } else {
        index.databaseConnection.query(`UPDATE word_search_profile SET games_won_streak=${await this.getWinStreak(guild, user)} + 1 WHERE guild_id=${guild.id} AND user_id=${user.id}`);
        index.databaseConnection.query(`UPDATE word_search_profile SET games_won=${await this.getGamesWon(guild, user)} + 1 WHERE guild_id=${guild.id} AND user_id=${user.id}`);

        await experienceUtils.addExperience(guild, user, Math.floor(Math.random() * 100) + 15);
        await economyUtils.addCoins(guild, user, Math.floor(Math.random() * 30) + 15);
    }

    if (await this.getWinStreak(guild, user) > await this.getBestWinStreak(guild, user)) {
        index.databaseConnection.query(`UPDATE word_search_profile SET games_won_best_streak=${await this.getWinStreak(guild, user)} WHERE guild_id=${guild.id} AND user_id=${user.id}`);
    }
    // await leaderboardUtils.updateWordleCurrentStreak(guild, user, await this.getBestWinStreak(guild, user));
    index.databaseConnection.query(`DELETE FROM word_search WHERE guild_id=${guild.id} AND user_id=${user.id}`);
}