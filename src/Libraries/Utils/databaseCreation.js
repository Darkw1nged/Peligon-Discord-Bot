module.exports.initializeDatabase = function initializeDatabase(client, databaseConnection) {
    databaseConnection.connect(err => {
        if (err) throw err;

        try {
            databaseConnection.query(`CREATE TABLE IF NOT EXISTS guilds (guild_id VARCHAR(255) NOT NULL, prefix VARCHAR(255) NOT NULL DEFAULT '-', PRIMARY KEY (guild_id))`);
            databaseConnection.query(`CREATE TABLE IF NOT EXISTS messages (guild_id VARCHAR(255) NOT NULL, server_join TEXT, server_leave TEXT, private_join TEXT, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
            databaseConnection.query(`CREATE TABLE IF NOT EXISTS channels (guild_id VARCHAR(255) NOT NULL, welcome VARCHAR(255), log VARCHAR(255), rankup VARCHAR(255), category_wordle VARCHAR(255), FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
            databaseConnection.query(`CREATE TABLE IF NOT EXISTS users (guild_id VARCHAR(255) NOT NULL, user_id VARCHAR(255) NOT NULL, experience INT DEFAULT 0, level INT DEFAULT 0, experience_boosters INT DEFAULT 0, coins INT DEFAULT 0, bank INT DEFAULT 0, coin_boosters INT DEFAULT 0, infractions INT DEFAULT 0, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
            databaseConnection.query(`CREATE TABLE IF NOT EXISTS leaderboard (guild_id VARCHAR(255) NOT NULL, user_id VARCHAR(255) NOT NULL, experience INT DEFAULT 0, coins INT DEFAULT 0, bank INT DEFAULT 0, wordle INT DEFAULT 0, wordle_best INT DEFAULT 0, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`);
            databaseConnection.query(`CREATE TABLE IF NOT EXISTS wordle (guild_id VARCHAR(255) NOT NULL, user_id VARCHAR(255) NOT NULL, channel_id VARCHAR(255) NOT NULL, tries INT DEFAULT 0, word VARCHAR(255) NOT NULL, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`)
            databaseConnection.query(`CREATE TABLE IF NOT EXISTS wordle_profile (guild_id VARCHAR(255) NOT NULL, user_id VARCHAR(255) NOT NULL, words_guessed INT DEFAULT 0, words_failed INT DEFAULT 0, wordle_current_streak INT DEFAULT 0, wordle_best_streak INT DEFAULT 0, FOREIGN KEY (guild_id) REFERENCES guilds(guild_id))`)
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

        databaseConnection.query(`CREATE TABLE IF NOT EXISTS peligonCoreStats (
guild_id VARCHAR(255) NOT NULL,
server_total VARCHAR(255) NOT NULL DEFAULT '',
humans VARCHAR(255) NOT NULL DEFAULT '',
bots VARCHAR(255) NOT NULL DEFAULT '',
online VARCHAR(255) NOT NULL DEFAULT '',
boosters VARCHAR(255) NOT NULL DEFAULT '',
roles VARCHAR(255) NOT NULL DEFAULT '',
channels VARCHAR(255) NOT NULL DEFAULT '',
voice_channels VARCHAR(255) NOT NULL DEFAULT '',
text_channels VARCHAR(255) NOT NULL DEFAULT '',
categories VARCHAR(255) NOT NULL DEFAULT '',
statistics_category VARCHAR(255) NOT NULL DEFAULT '',
PRIMARY KEY (guild_id)
)`, (err, result) => {
            if (err) throw err;
        });

    });
}