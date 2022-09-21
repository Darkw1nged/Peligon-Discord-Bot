// TODO booster types: Money, Exeprience
const {MessageAttachment, Permissions, MessageEmbed} = require('discord.js');
const Canvas = require('canvas');
const economyUtils = require('../Libraries/Utils/EconomyUtils');
const experineceUtils = require('../Libraries/Utils/ExperienceUtils');
const canvasUtils = require('../Libraries/Utils/canvasUtils');

module.exports = class BoostersMenu {
    constructor() {
        this.name = 'boosters'
        this.alias = []
        this.usage = ``
    }

    async run(client, message, args, user) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.channel.send("Inefficient permissions");

        // Setting up the attachment
        const canvas = Canvas.createCanvas(1100, 800);
        const ctx = canvas.getContext('2d');

        // Setting up the initial background - Matching discord's dark theme color
        ctx.fillStyle = '#36393F';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Coin box
        ctx.fillStyle = '#333336';
        canvasUtils.roundEdges(ctx, 11, 10, 525, canvas.height - 20, 25);
        ctx.fill();

        // Coin box - Icon
        ctx.fillStyle = '#ffd474';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "116px 'Sans Ultra-Bold'";
        ctx.fillText('🪙', 273.5, 120);

        // Coin box - Icon underline
        ctx.fillStyle = '#ffffff';
        canvasUtils.roundEdges(ctx, 120, 200, 307, 2, 1);
        ctx.fill();

        // Coin box - Title
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "40px 'Sans Ultra-Bold'";
        ctx.fillText('Coin Boosters', 273.5, 240);

        // Coin box - Description
        ctx.fillStyle = '#999999';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "28px 'Sans Ultra-Bold'";
        ctx.fillText('Have you ever wondered how you\ncan get more money? Are you fed\nup with the constant grind? Well,\nnow you have an excuse to sit back\nand take a break once in a while.\nWith coin boosters, you are able to\nachieve all of your goals.', 273.5, 300);

        // Coin box - Description underline
        ctx.fillStyle = '#ffffff';
        canvasUtils.roundEdges(ctx, 120, canvas.height - 220, 307, 2, 1);
        ctx.fill();

        // Coin box - amount shadow
        ctx.fillStyle = '#725F34';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "80px 'Sans Ultra-Bold'";
        ctx.fillText(`X${await economyUtils.getCoinBooster(message.guild, message.author)}`, 278.5, canvas.height - 120);

        // Coin box - amount
        ctx.fillStyle = '#ffd474';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "80px 'Sans Ultra-Bold'";
        ctx.fillText(`X${await economyUtils.getCoinBooster(message.guild, message.author)}`, 273.5, canvas.height - 125);

        // Experience box
        ctx.fillStyle = '#333336';
        canvasUtils.roundEdges(ctx, (canvas.width - 11) - 525, 10, 525, canvas.height - 20, 25);
        ctx.fill();

        // Experience box - Icon
        ctx.fillStyle = '#ffd474';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "116px 'Sans Ultra-Bold'";
        ctx.fillText('🧪', canvas.width - 273.5, 120);

        // Experience box - Icon underline
        ctx.fillStyle = '#ffffff';
        canvasUtils.roundEdges(ctx, (canvas.width - 120) - 307, 200, 307, 2, 1);
        ctx.fill();

        // Experience box - Title
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "40px 'Sans Ultra-Bold'";
        ctx.fillText('Experience Boosters', canvas.width - 273.5, 240);

        // Experience box - Description
        ctx.fillStyle = '#999999';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "28px 'Sans Ultra-Bold'";
        ctx.fillText('Want to get more out of chatting?\nWant to become #1 in the entire\nserver? With experience boosters,\nyou can! Sit back relax and have a\ncasual conversation, meanwhile,\nothers will be earning less experience\nfor talking just as much.', canvas.width - 273.5, 300);

        // Experience box - Description underline
        ctx.fillStyle = '#ffffff';
        canvasUtils.roundEdges(ctx, (canvas.width - 120) - 307, canvas.height - 220, 307, 2, 1);
        ctx.fill();

        // Experience box - amount shadow
        ctx.fillStyle = '#725F34';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "80px 'Sans Ultra-Bold'";
        ctx.fillText(`X${await experineceUtils.getExperienceBooster(message.guild, message.author)}`, canvas.width - 268.5, canvas.height - 120);

        // Experience box - amount
        ctx.fillStyle = '#ffd474';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "80px 'Sans Ultra-Bold'";
        ctx.fillText(`X${await experineceUtils.getExperienceBooster(message.guild, message.author)}`, canvas.width - 273.5, canvas.height - 125);

        // Creating Attachment
        const attachment = new MessageAttachment(canvas.toBuffer(), 'balance.png');

        // send attachment to current channel
        message.channel.send({files: [attachment]});
    }
    
}