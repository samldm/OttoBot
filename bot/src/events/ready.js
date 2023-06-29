const AdvancedClient = require("../structure/Client");
const { Guild } = require('discord.js');
const Logger = require("../utils/Logger");
module.exports = {
    name: "ready",
    /**
     * 
     * @param {AdvancedClient} client
     */
    execute: (client) => {
        Logger.info(`Logged in as ${client.user.tag}!`);
        setTimeout(() => {
            client.guilds.fetch().then((guilds) => {
                guilds.forEach((guild) => {
                    client.api.getGuild(guild.id);
                });
            });
        }, 1000);
    }
}