const { IntentsBitField: I } = require('discord.js');

module.exports = {
    intents: [
        I.Flags.Guilds, I.Flags.GuildMembers, I.Flags.GuildMessages, I.Flags.GuildMessageReactions
    ],
    paths: { // Based from ./src
        commands: "./commands/",
        events: "./events/"
    },
    api: {
        url: "http://localhost:3000"
    }
}