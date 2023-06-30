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

            client.guilds.cache.forEach(async (guild) => {
                await guild.roles.fetch();
                await guild.channels.fetch();
                client.api.putRoles(guild.id, guild.roles.cache.map((role) => ({ id: role.id, name: role.name})));
                client.api.putChannels(guild.id, guild.channels.cache.map((channel) => ({ id: channel.id, name: channel.name})));
            });
        }, 1000);
    }
}