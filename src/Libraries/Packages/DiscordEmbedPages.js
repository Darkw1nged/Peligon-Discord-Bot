const { MessageEmbed } = require("../../../node_modules/discord.js/src/index");

/**
 * Options used to determine how to embed pages should be constructed.
 * @typedef {Object} PagesOptions
 * @prop {Array} pages - An array of message embed that will be in the embed pages.
 * @prop {Discord.TextChannel} channel - The channel the embed pages will be sent.
 * @prop {Number} [duration=60000] - The length the reaction collector will last.
 * @prop {Array<Snowflake>|String<Snowflake>|Function} [restricted] - The restricted users to the embed pages.
 * @prop {Boolean} [pageFooter=true] - Whether or not to have the page counter on the embed footer.
 */

const helpEmbed = new MessageEmbed()
    .setTitle("Embed Pages Navigation")
    .setDescription(`**React:**
⏮️ to go to first page.
◀️ to go 1 page backward.
⏹️ to exit the menu.
#️⃣   to got to exact page.
▶️ to go 1 page forward.
⏭️ to go to last page.
ℹ️ to display this embed again.
   `)
    .setFooter("You are currently using this help embed. React ℹ️ again to continue navigating.")

class DiscordEmbedPages {
    /**
     * Constructs a new embed page.
     * @param {PagesOptions} options - Options for the embed pages.
     */
    constructor({
                    pages,
                    channel,
                    duration,
                    restricted,
                    pageFooter,
                } = {}) {

        this.pages = pages;
        this.channel = channel;
        this.duration = duration || 60000;
        this.restricted = restricted;
        this.pageFooter = pageFooter || true;
        this.currentPageNumber = 0;
        this.usingHelpEmbed = false;
    }

    /**
     * Creates and sends the embed pages.
     */
    async createPages() {
        if (!this.pages.length) throw new Error("Tried to create embed pages with no pages in the pages array.");
        if (this.pageFooter) this.pages[0].setFooter(`Page: 1/${this.pages.length}`);
        this.channel.send({ embeds: [this.pages[0]] }).then(msg => {
            this.msg = msg;
            try {
                msg.react("⏮️");
                msg.react("◀️");
                msg.react("⏹️")
                msg.react("#️⃣")
                msg.react("▶️");
                msg.react("⏭️");
                msg.react("ℹ️");
            } catch(error) {
                console.error(`Some emojis failed to react: ${error}`);
            }
            const filter = (reaction, user) => {
                if (user.bot) return false;
                if (!this.restricted) return true;
                else if (this.restricted instanceof Function) return this.restricted(user);
                else if (Array.isArray(this.restricted) && this.restricted.includes(user.id)) return true;
                else if (typeof this.restricted === "string" && this.restricted === user.id) return true;
            };
            const collector = msg.createReactionCollector(filter, { time: this.duration });
            collector.on("collect", async (reaction, user) => {
                //remove user reaction
                if (user.bot) return
                if (this.msg.channel.type !== 'DM') reaction.users.remove(user.id);

                // process user request.
                switch(reaction.emoji.name) {
                    case "⏭️":
                        this.goToPage(this.pages.length);
                        break;
                    case "▶️":
                        this.nextPage();
                        break;
                    case "⏹️":
                        await this.deleteEmbed();
                        break;
                    case "#️⃣":
                        this.msg.channel.send("Please specify a page.").then((message) => {
                            this.msg.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] })
                                .then(collected => {
                                    this.goToPage(parseInt(collected.first().content[0]) - 1);
                                    collected.first().delete();
                                    message.delete();
                                }).catch(collected => {
                                this.msg.followUp(`Received no response.`);
                            });
                        })
                        break;
                    case "◀️":
                        this.previousPage();
                        break;
                    case "⏮️":
                        this.goToPage(0);
                        break;
                    case "ℹ️":
                        this.toggleHelpEmbed();
                        break;
                }
            });
            collector.on("end", () => {
                if (this.msg.channel.type !== 'DM') this.msg.reactions.removeAll();
            });
        });
    }

    /**
     * Go to the next page.
     */
    nextPage() {
        if (!this.msg) throw new Error("Tried to go to next page but embed pages havn't been created yet.");
        if (this.usingHelpEmbed) return;
        this.currentPageNumber++;
        if (this.currentPageNumber >= this.pages.length) this.currentPageNumber = 0;
        const embed = this.pages[this.currentPageNumber];
        if (this.pageFooter) embed.setFooter(`Page: ${this.currentPageNumber + 1}/${this.pages.length}`);
        this.msg.edit({ embeds: [embed] });
    }

    /**
     * Go to to the previous page.
     */
    previousPage() {
        if (!this.msg) throw new Error("Tried to go to previous page but embed pages havn't been created yet.");
        if (this.usingHelpEmbed) return;
        this.currentPageNumber--;
        if (this.currentPageNumber < 0) this.currentPageNumber = this.pages.length - 1;
        const embed = this.pages[this.currentPageNumber];
        if (this.pageFooter) embed.setFooter(`Page: ${this.currentPageNumber + 1}/${this.pages.length}`);
        this.msg.edit({ embeds: [embed] });
    }

    /**
     * Go to a certain embed page.
     * @param {Number} pageNumber - The page index that is turned to.
     */
    goToPage(pageNumber) {
        if (!this.msg) throw new Error("Tried to turn to page before embed pages have even been created.");
        if (this.usingHelpEmbed) return;
        if (pageNumber > this.pages.length - 1) {
            this.currentPageNumber = this.pages.length - 1;
        } else if (pageNumber < 0) {
            this.currentPageNumber = 0;
        } else {
            this.currentPageNumber = pageNumber;
        }
        const embed = this.pages[this.currentPageNumber];
        if (this.pageFooter) embed.setFooter(`Page: ${this.currentPageNumber + 1}/${this.pages.length}`);
        this.msg.edit({ embeds: [embed] });
    }

    /**
     * Toggles help embed.
     */

    toggleHelpEmbed() {
        if (!this.msg) throw new Error("Tried to toggle help embed before embed pages have even been created.");
        this.usingHelpEmbed = !this.usingHelpEmbed;

        if (this.usingHelpEmbed) {
            this.msg.edit({ embeds: [helpEmbed] });
        } else {
            this.msg.edit({ embeds: [this.pages[this.currentPageNumber]] })
        }
    };

    deleteEmbed() {
        if (!this.msg) throw new Error("Could not close embed before being created.");
        this.msg.delete(1000);
    }
}

module.exports = DiscordEmbedPages;