const index = require('../../index');
const leaderboardUtils = require('../Utils/leaderboardUtils');

module.exports.inGame = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT channel_id FROM wordle WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0] !== undefined);
        });
    });
}

module.exports.startGame = function (guild, user, channel, word) {
    index.databaseConnection.query(`INSERT INTO wordle (guild_id, user_id, channel_id, tries, word) VALUES (${guild.id}, ${user.id}, ${channel.id}, 0, '${word}')`);   
}

module.exports.getChannel = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT channel_id FROM wordle WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.channel_id);
        });
    })
}

module.exports.getWord = function (guild, user, channel) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT word FROM wordle WHERE guild_id=${guild.id} AND user_id=${user.id} AND channel_id=${channel.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.word);
        });
    })
}

module.exports.getTries = function (guild, user, channel) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT tries FROM wordle WHERE guild_id=${guild.id} AND user_id=${user.id} AND channel_id=${channel.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.tries);
        });
    })
}

module.exports.incrementTries = async function (guild, user, channel) {
    index.databaseConnection.query(`UPDATE wordle SET tries=${await this.getTries(guild, user, channel)} + 1 WHERE guild_id=${guild.id} AND user_id=${user.id} AND channel_id=${channel.id}`);
}

module.exports.getGuessed = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT words_guessed FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.words_guessed);
        });
    })
}

module.exports.getLosses = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT words_failed FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.words_failed);
        });
    })
}

module.exports.getWinStreak = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT wordle_current_streak FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.wordle_current_streak);
        });
    })
}

module.exports.getBestWinStreak = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT wordle_best_streak FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.wordle_best_streak);
        });
    })
}

module.exports.endGane = async function (guild, user, failed) {
    if (failed) {
        index.databaseConnection.query(`UPDATE users SET wordle_current_streak=0 WHERE guild_id=${guild.id} AND user_id=${user.id}`);
        index.databaseConnection.query(`UPDATE users SET words_failed=${await this.getLosses(guild, user)} + 1 WHERE guild_id=${guild.id} AND user_id=${user.id}`);
    } else {
        index.databaseConnection.query(`UPDATE users SET wordle_current_streak=${await this.getWinStreak(guild, user)} + 1 WHERE guild_id=${guild.id} AND user_id=${user.id}`);
        index.databaseConnection.query(`UPDATE users SET words_guessed=${await this.getGuessed(guild, user)} + 1 WHERE guild_id=${guild.id} AND user_id=${user.id}`);
    }

    if (await this.getWinStreak(guild, user) > await this.getBestWinStreak(guild, user)) {
        index.databaseConnection.query(`UPDATE users SET wordle_best_streak=${await this.getWinStreak(guild, user)} WHERE guild_id=${guild.id} AND user_id=${user.id}`);
    }
    await leaderboardUtils.updateWordleCurrentStreak(guild, user, await this.getBestWinStreak(guild, user));
    index.databaseConnection.query(`DELETE FROM wordle WHERE guild_id=${guild.id} AND user_id=${user.id}`);
}