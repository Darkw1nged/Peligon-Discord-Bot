const index = require('../../index');

module.exports.getLeaderboardLevelPosition = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT experience FROM leaderboard WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.experience);
        });
    });
}

module.exports.updateLeaderboardLevelPosition = function (guild, user, level) {
    index.databaseConnection.query(`SELECT level FROM users WHERE guild_id=${guild.id} AND user_id=${user.id} ORDER BY level DESC`, (err, result) => {
        if (err) throw err;
        let pos = 1;
        for (let i = 0; i < result.length; i++) {
            if (result[i].level === level) {
                index.databaseConnection.query(`UPDATE leaderboard SET experience = ${pos} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
                    if (err) throw err;
                });
            }
            pos++;
        }
    });
}

module.exports.getLeaderboardCoinsPosition = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT coins FROM leaderboard WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve( result[0]?.coins);
        });
    });
}

module.exports.updateLeaderboardCoinsPosition = function (guild, user, coins) {
    index.databaseConnection.query(`SELECT coins FROM users WHERE guild_id=${guild.id} AND user_id=${user.id} ORDER BY coins DESC`, (err, result) => {
        if (err) throw err;
        let pos = 1;
        for (let i = 0; i < result.length; i++) {
            if (result[i].coins === coins) {
                index.databaseConnection.query(`UPDATE leaderboard SET coins = ${pos} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
                    if (err) throw err;
                    return;
                });
            }
            pos++;
        }
    });
}

module.exports.getLeaderboardBankPosition = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT bank FROM leaderboard WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.bank);
        });
    });
}

module.exports.updateLeaderboardBankPosition = function (guild, user, balance) {
    index.databaseConnection.query(`SELECT bank FROM users WHERE guild_id=${guild.id} AND user_id=${user.id} ORDER BY bank DESC`, (err, result) => {
        if (err) throw err;
        let pos = 1;
        for (let i = 0; i < result.length; i++) {
            if (result[i].bank === balance) {
                index.databaseConnection.query(`UPDATE leaderboard SET bank = ${pos} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
                    if (err) throw err;
                    return;
                });
            }
            pos++;
        }
    });
}

module.exports.getWordleCurrentStreak = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT wordle FROM leaderboard WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.wordle);
        });
    });
}

module.exports.updateWordleCurrentStreak = function (guild, user, bestStreak) {
    index.databaseConnection.query(`SELECT wordle_best_streak FROM wordle_profile WHERE guild_id=${guild.id} AND user_id=${user.id} ORDER BY wordle_best_streak DESC`, (err, result) => {
        if (err) throw err;
        let pos = 1;
        for (let i = 0; i < result.length; i++) {
            if (result[i].wordle_best_streak === bestStreak) {
                index.databaseConnection.query(`UPDATE leaderboard SET wordle = ${pos} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
                    if (err) throw err;
                    return;
                });
            }
            pos++;
        }
    });
}

module.exports.getWordleBestStreak = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT wordle_best FROM leaderboard WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.wordle_best);
        });
    });
}

module.exports.updateWordleBestStreak = function (guild, user, newStreak) {
    index.databaseConnection.query(`UPDATE leaderboard SET wordle_best=${newStreak} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
        return;
    });
}

module.exports.getWordSearchCurrentStreak = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT word_search FROM leaderboard WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.wordle);
        });
    });
}

module.exports.updateWordSearchCurrentStreak = function (guild, user, bestStreak) {
    index.databaseConnection.query(`SELECT word_search_best_streak FROM word_search_profile WHERE guild_id=${guild.id} AND user_id=${user.id} ORDER BY word_search_best_streak DESC`, (err, result) => {
        if (err) throw err;
        let pos = 1;
        for (let i = 0; i < result.length; i++) {
            if (result[i].word_search_best_streak === bestStreak) {
                index.databaseConnection.query(`UPDATE leaderboard SET word_search = ${pos} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
                    if (err) throw err;
                    return;
                });
            }
            pos++;
        }
    });
}

module.exports.getWordSearchBestStreak = function (guild, user) {
    return new Promise((resolve) => {
        index.databaseConnection.query(`SELECT word_search_best FROM leaderboard WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.word_search_best);
        });
    });
}

module.exports.updateWordSearchBestStreak = function (guild, user, newStreak) {
    index.databaseConnection.query(`UPDATE leaderboard SET word_search_best=${newStreak} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
        return;
    });
}