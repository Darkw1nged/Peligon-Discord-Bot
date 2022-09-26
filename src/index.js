const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS]
});
const mysql = require('../node_modules/mysql/index');
const config = require('./Libraries/JSON/config.json');
const { CommandHandler } = require('./Libraries/Packages/CommandHandler');
const updateStatistics = require('./Mechanics/updateStatistics');
const welcomeChannel = require('./Mechanics/welcomeChannel');

const databaseConnection = mysql.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});
module.exports.databaseConnection = databaseConnection;
module.exports.client = client;

client.on('ready', async () => {
    // Loading database anc reating any necessary tables if need be.
    const databaseCreation = require('./Libraries/Utils/databaseCreation')
    await databaseCreation.initializeDatabase(client, databaseConnection);

    // Registering all events.
    let events = require('fs').readdirSync(__dirname + '/Events/');
    for (let i = 0; i < events.length; i++) {
        let event = require(`./Events/${events[i]}`);
        event(client);
    }

    updateStatistics(client);
    welcomeChannel(client);

    console.log(`Peligon Core has been enabled.`);

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Startup uses approximately ${Math.round(used * 100) / 100} MB`);
});

// registering all commands.
// types: server, direct message
// default prefix: '-'
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    const databaseUtils = require('./Libraries/Utils/databaseUtils');

    const args = message.content.split(" ");
    const command = args[0];
    const CH = new CommandHandler({
        folder: __dirname + '/Commands/',
        prefix: [await databaseUtils.getServerPrefix(message.guild)]
    });
    const cmd = CH.getCommand(command.toLowerCase());
    const user = message.mentions.users.first();
    if (!cmd) return;

    try {
        cmd.run(client, message, args, user)
    } catch (err) {
        console.log(err)
    }
})

client.login(config.secret)
