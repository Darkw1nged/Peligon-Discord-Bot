const Discord = require('discord.js');
const Canvas = require('canvas');
const economyUtils = require('../Libraries/Utils/EconomyUtils');
const leaderboardUtils = require('../Libraries/Utils/LeaderboardUtils');
const canvasUtils = require('../Libraries/Utils/canvasUtils');

module.exports = class balance {
    constructor() {
        this.name = 'balance'
        this.alias = ['money', 'bal', 'coins', 'gold']
        this.usage = ``
    }

    async run(client, message, args, user) {

        // Setting up the attachment
        const canvas = Canvas.createCanvas(900, 220);
        const ctx = canvas.getContext('2d');

        const coins = await economyUtils.getCoins(message.guild, message.author);
        const bank = await economyUtils.getBankBalance(message.guild, message.author);
        const coins_leaderboard_position = await leaderboardUtils.getLeaderboardCoinsPosition(message.guild, message.author);
        const bank_leaderboard_position = await leaderboardUtils.getLeaderboardBankPosition(message.guild, message.author);

        // Setting up the initial background - Matching discord's dark theme color
        ctx.fillStyle = '#36393F';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Username Box
        ctx.fillStyle = '#333336';
        canvasUtils.roundEdges(ctx, 11, 10, 619, canvas.height - 20, 25);
        ctx.fill();

        // Username + Tag - Settings
        ctx.font = "20px 'Sans Ultra-Bold'";
        let usernameWidth = ctx.measureText(`${message.author.username}`).width;
        let tagPosition = 230 + (usernameWidth + (usernameWidth / 2));

        // Displaying Username
        ctx.textAlign = "left";
        ctx.font = "30px 'Sans Ultra-Bold'";
        ctx.fillStyle = '#ffd474';
        ctx.fillText(`${message.author.username}`, 230, 60)

        // Displaying Tag
        ctx.font = "24px 'Sans Ultra-Bold'";
        ctx.fillStyle = 'rgba(255,212,116,0.5)';
        ctx.fillText(`${message.author.tag.split(message.author.username)[1]}`, tagPosition + 10, 63)

        // Coins Leaderboard Position - Heading
        ctx.font = "20px 'Sans Ultra-Bold'";
        ctx.fillStyle = '#a4a4a4';
        ctx.fillText(`Coins Rank`, 233, 100.5)

        // Coins Leaderboard Position - Background
        ctx.fillStyle = '#212226';
        canvasUtils.roundEdges(ctx, 233, 120.5, 140, 36, 10);
        ctx.fill();

        // Coins Leaderboard Position - Actual Position
        ctx.font = "26px 'Sans Ultra-Bold'";
        ctx.fillStyle = '#ffd474';
        ctx.fillText(`#${coins_leaderboard_position}`, 180 + (120 / 2), 130.5 + (36 / 2));

        // Bank Leaderboard Position - Heading
        ctx.font = "20px 'Sans Ultra-Bold'";
        ctx.fillStyle = '#a4a4a4';
        ctx.fillText(`Bank Rank`, 400, 100.5)

        // Bank Leaderboard Position - Background
        ctx.fillStyle = '#212226';
        canvasUtils.roundEdges(ctx, 400, 120.5, 140, 36, 10);
        ctx.fill();

        // Bank Leaderboard Position - Actual Position
        ctx.font = "26px 'Sans Ultra-Bold'";
        ctx.fillStyle = '#ffd474';
        ctx.fillText(`#${bank_leaderboard_position}`, 348 + (120 / 2), 130.5 + (36 / 2));


        // Coins Box
        ctx.fillStyle = '#333336';
        canvasUtils.roundEdges(ctx, 639, 10, 252, 95, 25);
        ctx.fill();

        // Coins Box - Title
        ctx.fillStyle = '#a4a4a4';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px 'Sans Ultra-Bold'";
        ctx.fillText('COINS', 639 + (252 / 2), 31);

        // Coins Amount - Background
        ctx.fillStyle = '#212226';
        canvasUtils.roundEdges(ctx, 659, 50, 212, 36, 10);

        // Coins Amount - Value
        ctx.fill();
        ctx.font = "20px 'Sans Ultra-Bold'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#00aa00";
        ctx.fillText(`$${coins}`, 659 + (212 / 2), 50 + (36 / 2));


        // Bank Box
        ctx.fillStyle = '#333336';
        canvasUtils.roundEdges(ctx, 639, 115, 252, 95, 25);
        ctx.fill();

        // Bank Box - Title
        ctx.fillStyle = '#a4a4a4';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px 'Sans Ultra-Bold'";
        ctx.fillText('BANK', 639 + (252 / 2), 134);

        // bank Amount - Background
        ctx.fillStyle = '#212226';
        canvasUtils.roundEdges(ctx, 659, 154, 212, 36, 10);
        ctx.fill();

        // bank Amount - Value
        ctx.font = "20px 'Sans Ultra-Bold'";
        ctx.textAlign = "center";
        ctx.fillStyle = "#00aa00";
        ctx.fillText(`$${bank}`, 659 + (212 / 2), 154 + (36 / 2));

        // Users avatar - Settings
        ctx.beginPath();
        ctx.arc(65 + (112 / 2), 54 + (112 / 2), 56, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // Users avatar - Displaying
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: 'jpg'}));
        ctx.drawImage(avatar, 65, 54, 112, 112);

        // Creating Attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'balance.png');

        // send attachment to current channel
        message.channel.send({files: [attachment]});
    }

}
