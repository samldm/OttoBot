const AdvancedClient = require("../structure/Client");
const { Guild } = require('discord.js');
const Logger = require("../utils/Logger");
const { formatUptime } = require("../utils/utils.js");

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
            client.api.putStats({
                guilds: client.guilds.cache.size,
                users: client.users.cache.size,
                uptime: formatUptime(client.uptime),
                commands: client.commands.map((cmd) => cmd.data)
            });
        }, 1000);
    }
}