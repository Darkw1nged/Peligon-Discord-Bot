module.exports.initializeDatabase = function initializeDatabase(client, databaseConnection) {
    try {
        databaseConnection.query(`CREATE TABLE IF NOT EXISTS guilds (guild_id VARCHAR(255) NOT NULL, prefix VARCHAR(255) NOT NULL DEFAULT '-', PRIMARY KEY (guild_id))`);
        databaseConnection.query(`CREATE TABLE IF NOT EXISTS messages (guild_id VARCHAR(255) NOT NULL, server_join TEXT, server_leave TEXT, private_join TEXT, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
        databaseConnection.query(`CREATE TABLE IF NOT EXISTS channels (guild_id VARCHAR(255) NOT NULL, welcome VARCHAR(255), log VARCHAR(255), rankup VARCHAR(255), category_wordle VARCHAR(255), FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
        databaseConnection.query(`CREATE TABLE IF NOT EXISTS statistics (guild_id VARCHAR(255) NOT NULL, category VARCHAR(255), server_total VARCHAR(255), humans VARCHAR(255), bots VARCHAR(255), online VARCHAR(255), boosters VARCHAR(255), roles VARCHAR(255), channels VARCHAR(255), voice_channels VARCHAR(255), text_channels VARCHAR(255), categories VARCHAR(255), FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
        databaseConnection.query(`CREATE TABLE IF NOT EXISTS users (guild_id VARCHAR(255) NOT NULL, user_id VARCHAR(255) NOT NULL, experience INT DEFAULT 0, level INT DEFAULT 0, experience_boosters INT DEFAULT 0, coins INT DEFAULT 0, bank INT DEFAULT 0, coin_boosters INT DEFAULT 0, infractions INT DEFAULT 0, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
        databaseConnection.query(`CREATE TABLE IF NOT EXISTS leaderboard (guild_id VARCHAR(255) NOT NULL, user_id VARCHAR(255) NOT NULL, experience INT DEFAULT 0, coins INT DEFAULT 0, bank INT DEFAULT 0, wordle INT DEFAULT 0, wordle_best INT DEFAULT 0, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
        databaseConnection.query(`CREATE TABLE IF NOT EXISTS wordle (guild_id VARCHAR(255) NOT NULL, user_id VARCHAR(255) NOT NULL, channel_id VARCHAR(255) NOT NULL, tries INT DEFAULT 0, word VARCHAR(255) NOT NULL, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
        databaseConnection.query(`CREATE TABLE IF NOT EXISTS wordle_profile (guild_id VARCHAR(255) NOT NULL, user_id VARCHAR(255) NOT NULL, words_guessed INT DEFAULT 0, words_failed INT DEFAULT 0, wordle_current_streak INT DEFAULT 0, wordle_best_streak INT DEFAULT 0, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
        databaseConnection.query(`CREATE TABLE IF NOT EXISTS crews (guild_id VARCHAR(255) NOT NULL, crew_id VARCHAR(255) NOT NULL, crew_leader_id VARCHAR(255) NOT NULL, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
        databaseConnection.query(`CREATE TABLE IF NOT EXISTS crew_profile (guild_id VARCHAR(255) NOT NULL, crew_id VARCHAR(255) NOT NULL, user_id VARCHAR(255) NOT NULL, pay_cut INT DEFAULT 0, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
    } catch (Exception) {
        console.log(Exception);
    }

    client.guilds.cache.forEach(async (guild) => {
        const databaseUtils = require('../Utils/databaseUtils');
        databaseUtils.isGuildInDatabase(guild).then(async (result) => {
            if (!result) {
                databaseConnection.query(`INSERT INTO guilds (guild_id, prefix) VALUES ('${guild.id}', '-')`);
                databaseConnection.query(`INSERT INTO channels (guild_id, welcome, log, rankup, category_wordle) VALUES ('${guild.id}', 0, 0, 0, 0)`);                    
                console.log(`Could not find guild > ${guild.name} inside of database; Inserting them now!`)
            }
        })
    });
}