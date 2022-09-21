const Discord = require('discord.js');
const Canvas = require('canvas');
const experienceUtils = require('../Libraries/Utils/ExperienceUtils');
const leaderboardUtils = require('../Libraries/Utils/LeaderboardUtils');
const canvasUtils = require('../Libraries/Utils/canvasUtils');

module.exports = class rank {
    constructor() {
        this.name = 'rank',
        this.alias = ['level', 'xp', 'experience', 'exp'],
        this.usage = ``
    }

    async run(client, message, args, user) {

        // Setting up the attachment
        const canvas = Canvas.createCanvas(900, 220);
        const ctx = canvas.getContext('2d');

        const roundRectBottom = function(x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.closePath();
        };

        let level = await experienceUtils.getLevel(message.guild, message.author);
        let xp = await experienceUtils.getExperience(message.guild, message.author);
        let toLevel = 5 * (Math.pow(level, 2)) + (50 * level) + 100;
        let xpBar = (xp / toLevel) * 100;
        let serverRank = await leaderboardUtils.getLeaderboardLevelPosition(message.guild, message.author);

        // Setting up the initial background - Matching discord's dark theme color
        ctx.fillStyle = '#36393F';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Username Box
        ctx.fillStyle = '#333336';
        canvasUtils.roundEdges(ctx, 11, 10, 619, canvas.height - 25, 25);
        ctx.fill();

        // Username + Tag - Settings
        ctx.font = "20px 'Sans Ultra-Bold'";
        let usernameWidth = ctx.measureText(`${message.author.username}`).width;
        let tagPosition = 230 + usernameWidth + (usernameWidth / 2);

        // Displaying Username
        ctx.textAlign="left";
        ctx.font = "30px 'Sans Ultra-Bold'";
        ctx.fillStyle = '#ffd474';

        // Displaying Tag
        ctx.fillText(`${message.author.username}`, 230, 60)
        ctx.font = "24px 'Sans Ultra-Bold'";
        ctx.fillStyle = 'rgba(255,212,116,0.5)';
        ctx.fillText(`${message.author.tag.split(message.author.username)[1]}`, tagPosition + 10, 63)

        // Level Progress bar
        ctx.fillStyle = "#484B4E";
        canvasUtils.roundBottomEdges(ctx, 11, canvas.height - 25, 619, 10, 10)
        ctx.fill()

        if (xpBar > 2.4) {
          ctx.fillStyle = "#f8c538";
          canvasUtils.roundBottomEdges(ctx, 11, canvas.height - 25, (xpBar * 619) / 100, 10, 10)
          ctx.fill()
        }

        // Server Rank Leaderboard Position - Heading
        ctx.textAlign="left";
        ctx.font = "20px 'Sans Ultra-Bold'";
        ctx.fillStyle = '#a4a4a4';
        ctx.fillText(`Server Rank`, 233, 100.5)

        // Server Rank Leaderboard Position - Background
        ctx.fillStyle = '#212226';
        canvasUtils.roundEdges(ctx, 233, 120.5, 140, 36, 10);
        ctx.fill();

        // Server Rank Leaderboard Position - Actual Position
        ctx.font = "26px 'Sans Ultra-Bold'";
        ctx.fillStyle = '#ffd474';
        ctx.fillText(`#${serverRank}`, 180 + (120 / 2), 130.5 + (36 / 2));


        // Level Box
        ctx.fillStyle = '#333336';
        canvasUtils.roundEdges(ctx, 639, 10, 252, 95, 25);
        ctx.fill();

        // Level Box - Title
        ctx.fillStyle = '#a4a4a4';
        ctx.textAlign="center";
        ctx.textBaseline = "middle";
        ctx.font = "18px 'Sans Ultra-Bold'";
        ctx.fillText('LEVEL', 639 + (252 / 2), 31);

        // Level - Background
        ctx.fillStyle = '#212226';
        canvasUtils.roundEdges(ctx, 659, 50, 212, 36, 10);

        // Level - Value
        ctx.fill();
        ctx.font="20px 'Sans Ultra-Bold'";
        ctx.textAlign="center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffd474";
        ctx.fillText(`${level}`, 659 + (212 / 2), 50 + (36 / 2));


        // Experience Box
        ctx.fillStyle = '#333336';
        canvasUtils.roundEdges(ctx, 639, 115, 252, 95, 25);
        ctx.fill();

        // Experience Box - Title
        ctx.fillStyle = '#a4a4a4';
        ctx.textAlign="center";
        ctx.textBaseline = "middle";
        ctx.font = "18px 'Sans Ultra-Bold'";
        ctx.fillText('EXP', 639 + (252 / 2), 134);

        // Experience - Background
        ctx.fillStyle = '#212226';
        canvasUtils.roundEdges(ctx, 659, 154, 212, 36, 10);
        ctx.fill();

        // Experience - Value
        ctx.font="20px 'Sans Ultra-Bold'";
        ctx.textAlign="center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${xp}`, 659 + (212 / 2), 154 + (36 / 2));

        // Users avatar - Settings
        ctx.beginPath();
        ctx.arc(65 + (112 / 2), 54 + (112 / 2), 56, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // Users avatar - Displaying
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({format: 'jpg'}));
        ctx.drawImage(avatar, 65, 54, 112, 112);

        // Creating Attachment
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rank.png');

        // send attachment to current channel
        message.channel.send({ files: [attachment] });
    }
}
