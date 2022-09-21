const { Permissions, MessageAttachment, MessageEmbed } = require('discord.js');
const index = require("../index");
const Canvas = require('canvas');
const canvasUtils = require('../Libraries/Utils/canvasUtils');
const databaseUtils = require('../Libraries/Utils/databaseUtils');

module.exports = class prefix {
    constructor() {
        this.name = 'prefix'
            this.alias = []
            this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions")

        const oldPrefix = await databaseUtils.getServerPrefix(message.guild);
        if (args.length !== 2) return message.channel.send("Please specify a new prefix.");
        const newPrefix = args[1].toLowerCase();

            await index.databaseConnection.query(`UPDATE guilds SET prefix='${newPrefix}' WHERE guild_id=${message.guild.id}`, async (err, result) => {
                if (err) throw err;

                const prefixUpdated = new MessageEmbed()
                    .setColor("#A3DE34")
                    .setDescription(`Prefix has successfully been updated!`);
                
                // Sending UI components to the channel
                message.channel.send({ embeds: [prefixUpdated] });
                message.channel.send({ files: [sendCanvas(oldPrefix, newPrefix)] })
            });
    }
}

function sendCanvas(prefix, newPrefix) {
    // Setting up the attachment
    const canvas = Canvas.createCanvas(900, 220);
    const ctx = canvas.getContext('2d');

    // Setting up the initial background - Matching discord's dark theme color
    ctx.fillStyle = '#36393F';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Old prefix - Box
    ctx.fillStyle = '#333336';
    canvasUtils.roundEdges(ctx, 11, 10, 420, canvas.height - 25, 25);
    ctx.fill();

    // Old prefix - Title
    ctx.fillStyle = '#ED3419';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "28px 'Sans Ultra-Bold'";
    ctx.fillText('OLD PREFIX', 221, 40);

    // Old prefix - Value
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "116px 'Sans Ultra-Bold'";
    ctx.fillText(prefix, 221, 120);


    // New prefix - Box
    ctx.fillStyle = '#333336';
    canvasUtils.roundEdges(ctx, 469, 10, 420, canvas.height - 25, 25);
    ctx.fill();

    // New prefix - Title
    ctx.fillStyle = '#A3DE34';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "28px 'Sans Ultra-Bold'";
    ctx.fillText('NEW PREFIX', canvas.width - 221, 40);

    // New prefix - Value
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "116px 'Sans Ultra-Bold'";
    ctx.fillText(newPrefix, canvas.width - 221, 120);

    // Creating Attachment
    const attachment = new MessageAttachment(canvas.toBuffer(), 'prefix_update.png');

    return attachment;
}