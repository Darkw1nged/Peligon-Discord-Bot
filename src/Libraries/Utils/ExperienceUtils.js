const index = require('../../index')

module.exports.getExperience = function getExperience(guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT experience FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.experience);
        });
    });
}

module.exports.addExperience = async function addExperience(guild, user, experience) {
    index.databaseConnection.query(`UPDATE users SET experience = ${await this.getExperience(guild, user) + experience} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
    });
}

module.exports.removeExperience = async function removeExperience(guild, user, experience) {
    index.databaseConnection.query(`UPDATE users SET experience = ${await this.getExperience(guild, user) - experience} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
    });
}

module.exports.getLevel = function getLevel(guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT level FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.level);
        });
    });
}

module.exports.addLevel = async function addLevel(guild, user) {
    index.databaseConnection.query(`UPDATE users SET level = ${await this.getLevel(guild, user) + 1} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
    });
}

module.exports.removeLevel = async function removeLevel(guild, user) {
    index.databaseConnection.query(`UPDATE users SET level = ${await this.getLevel(guild, user) - 1} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
    });
}

module.exports.getExperienceBooster = async function getExperienceBooster(guild, user) {
    return new Promise((resolve, reject) => {
        index.databaseConnection.query(`SELECT experience_boosters FROM users WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
            if (err) throw err;
            resolve(result[0]?.experience_boosters);
        });
    });
}

module.exports.addExperienceBooster = async function addExperienceBooster(guild, user, amount) {
    index.databaseConnection.query(`UPDATE users SET experience_boosters = ${await this.getExperienceBooster(guild, user) + amount} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
    });
}

module.exports.removeExperienceBooster = async function removeExperienceBooster(guild, user, amount) {
    index.databaseConnection.query(`UPDATE users SET experience_boosters = ${await this.getExperienceBooster(guild, user) - amount} WHERE guild_id=${guild.id} AND user_id=${user.id}`, (err, result) => {
        if (err) throw err;
    });
}