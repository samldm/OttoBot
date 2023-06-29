const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const AdvancedClient = require('../structure/Client');

module.exports = {
    guilds: [], // Empty = Global command
    /**
     * 
     * @param {AdvancedClient} client 
     * @param {CommandInteraction} interaction 
     */
    execute: (client, interaction) => {
        const tag = interaction.options.getString('tag');
        if (tag == null) {
            interaction.reply({ content: "> Veuillez spécifier votre tag.", ephemeral: true });
            return;
        }
        client.api.putUser(interaction.user.id, tag).then(async (res) => {
            if (res.status == "ok") {
                interaction.reply({ content: "> Votre compte a été lié avec succès.", ephemeral: true });
            } else if (res.status == "user already exists") {
                interaction.reply({ content: "> Votre compte est déjà lié.", ephemeral: true });
                return;
            } else {
                interaction.reply({ content: "> Une erreur est survenue lors de la liaison de votre compte.", ephemeral: true });
                return;
            }
            let guild = await client.api.getGuild(interaction.guild.id);
        
            let stats = res.user.stats.sort((a, b) => b.date - a.date);
            if (guild.status != "ok")
                return;
            let guildData = guild.guild;
            let member = interaction.guild.members.cache.get(interaction.user.id);
            
            console.log(guildData);
            guildData.clanRoles.forEach((role) => {
                if (res.user.clanTag == role.clanTag && !member.roles.cache.has(role.role)) {
                    member.roles.add(role.role);
                } else if (member.roles.cache.has(role.role)) {
                    member.roles.remove(role.role);
                }
            });
            guildData.thRoles.forEach((role) => {
                if (stats[0].thLevel == role.th && !member.roles.cache.has(role.role)) {
                    member.roles.add(role.role);
                } else if (member.roles.cache.has(role.role)) {
                    member.roles.remove(role.role);
                }
            });
        })
    }
}