const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const languageManager = require('../utils/language');
const { DEVELOPER, BOT } = require('../config/botinfo');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Show information about the bot'),

    async execute(interaction) {
        try {
            const embed = new EmbedBuilder()
                .setColor('#5865F2')
                .setTitle(await languageManager.getString('commands.about.title', interaction.guildId))
                .setDescription(await languageManager.getString('commands.about.description', interaction.guildId))
                .addFields(
                    {
                        name: await languageManager.getString('commands.about.version', interaction.guildId),
                        value: process.env.VERSION || 'Unknown'
                    },
                    {
                        name: await languageManager.getString('commands.about.sourceCode', interaction.guildId),
                        value: `[GitHub](${BOT.sourceCode})`
                    },
                    {
                        name: await languageManager.getString('commands.about.supportServer', interaction.guildId),
                        value: `[Support Server](${BOT.support})`
                    },
                    {
                        name: await languageManager.getString('commands.about.inviteLink', interaction.guildId),
                        value: `[Invite](${BOT.inviteUrl(process.env.CLIENT_ID)})`
                    },
                    {
                        name: await languageManager.getString('commands.about.donate', interaction.guildId),
                        value: `[Sociabuzz](${DEVELOPER.donate}) • [Ko-fi](${DEVELOPER.kofi})`
                    },
                    {
                        name: await languageManager.getString('commands.about.sponsor', interaction.guildId) || 'GitHub Sponsors',
                        value: `[GitHub Sponsors](${DEVELOPER.sponsor})`
                    },
                    {
                        name: await languageManager.getString('commands.about.devbio', interaction.guildId),
                        value: `[Bio Link](${DEVELOPER.bio})`
                    }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.error('Error in about command:', error);
            await interaction.reply({
                content: await languageManager.getString('commands.about.error', interaction.guildId),
                ephemeral: true
            });
        }
    }
};

