const { SlashCommandBuilder, CommandInteraction } = require('discord.js');
const AdvancedClient = require('../structure/Client');

module.exports = {
    guilds: [], // Empty = Global command
    /**
     * 
     * @param {AdvancedClient} client 
     * @param {CommandInteraction} interaction 
     */
    execute: async (client, interaction) => {
        const subcommand = interaction.options.getSubcommand();
        console.log(subcommand);
        let options = {};
        switch (subcommand) {
            case "admin_role":
                options = {
                    adminRole: interaction.options.getRole('role').id
                }

                let adminRoleRes = await client.api.putGuildAdminRole(interaction.guild.id, options.adminRole);
                
                if (adminRoleRes.status == "ok") {
                    interaction.reply({ content: "> Le rôle administrateur a été défini avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la définition du rôle administrateur.", ephemeral: true });
                }
                break;
            case "clan_role":
                options = {
                    clanTag: interaction.options.getString('clan_tag'),
                    role: interaction.options.getRole('role').id
                }
                
                let clanRoleRes = await client.api.putGuildClanRole(interaction.guild.id, options.clanTag, options.role);

                if (clanRoleRes.status == "ok") {
                    interaction.reply({ content: "> Le rôle a été défini avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la définition du rôle.", ephemeral: true });
                }
                break;

            case "th_role":
                options = {
                    thLevel: interaction.options.getInteger('th_level'),
                    role: interaction.options.getRole('role').id
                }

                let thRoleRes = await client.api.putGuildThRole(interaction.guild.id, options.thLevel, options.role);

                if (thRoleRes.status == "ok") {
                    interaction.reply({ content: "> Le rôle a été défini avec succès.", ephemeral: true });
                } else {
                    interaction.reply({ content: "> Une erreur est survenue lors de la définition du rôle.", ephemeral: true });
                }
                break;
        }
    }
}