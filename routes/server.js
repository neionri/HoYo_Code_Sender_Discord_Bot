/**
 * routes/server.js
 * Protected API routes for per-server configuration (config, settings, language).
 * All routes require authMiddleware (applied in index.js via app.use('/api/server', authMiddleware)).
 */
const express = require('express');
const { EmbedBuilder } = require('discord.js');
const Config = require('../models/Config');
const Settings = require('../models/Settings');
const Language = require('../models/Language');

const SUPPORTED_LANGUAGES = ['en', 'id', 'jp', 'vi'];

/**
 * Factory function — accepts the Discord client for routes that need to send messages.
 * @param {import('discord.js').Client} client
 * @returns {express.Router}
 */
function createServerRouter(client) {
    const router = express.Router();

    // ─── Config ────────────────────────────────────────────────────────────────

    // GET /api/server/:serverId/config
    router.get('/:serverId/config', async (req, res) => {
        try {
            const { serverId } = req.params;
            const config = await Config.findOne({ guildId: serverId });

            if (!config) {
                return res.json({
                    guildId: serverId,
                    genshinRole: null,
                    hsrRole: null,
                    zzzRole: null,
                    channel: null,
                    livestreamChannel: null
                });
            }

            res.json({
                guildId: config.guildId,
                genshinRole: config.genshinRole,
                hsrRole: config.hsrRole,
                zzzRole: config.zzzRole,
                channel: config.channel,
                livestreamChannel: config.livestreamChannel || null
            });
        } catch (error) {
            console.error('Error fetching server config:', error);
            res.status(500).json({ error: 'Failed to fetch server config' });
        }
    });

    // PUT /api/server/:serverId/config
    router.put('/:serverId/config', async (req, res) => {
        try {
            const { serverId } = req.params;
            const updateData = req.body;

            let config = await Config.findOne({ guildId: serverId });
            if (!config) {
                config = new Config({
                    guildId: serverId,
                    genshinRole: null,
                    hsrRole: null,
                    zzzRole: null,
                    channel: null,
                    livestreamChannel: null
                });
            }

            if (updateData.hasOwnProperty('genshinRole')) config.genshinRole = updateData.genshinRole;
            if (updateData.hasOwnProperty('hsrRole')) config.hsrRole = updateData.hsrRole;
            if (updateData.hasOwnProperty('zzzRole')) config.zzzRole = updateData.zzzRole;
            if (updateData.hasOwnProperty('channel')) config.channel = updateData.channel;
            if (updateData.hasOwnProperty('livestreamChannel')) config.livestreamChannel = updateData.livestreamChannel;

            await config.save();

            res.json({
                guildId: config.guildId,
                genshinRole: config.genshinRole,
                hsrRole: config.hsrRole,
                zzzRole: config.zzzRole,
                channel: config.channel,
                livestreamChannel: config.livestreamChannel
            });
        } catch (error) {
            console.error('Error updating server config:', error);
            res.status(500).json({ error: 'Failed to update server config' });
        }
    });

    // ─── Language ───────────────────────────────────────────────────────────────

    // GET /api/server/:serverId/language
    router.get('/:serverId/language', async (req, res) => {
        try {
            const { serverId } = req.params;
            const langConfig = await Language.findOne({ guildId: serverId });

            res.json({
                guildId: serverId,
                language: langConfig ? langConfig.language : 'en'
            });
        } catch (error) {
            console.error('Error fetching server language:', error);
            res.status(500).json({ error: 'Failed to fetch server language' });
        }
    });

    // PUT /api/server/:serverId/language
    router.put('/:serverId/language', async (req, res) => {
        try {
            const { serverId } = req.params;
            const { language } = req.body;

            if (!SUPPORTED_LANGUAGES.includes(language)) {
                return res.status(400).json({
                    error: `Invalid language code. Supported: ${SUPPORTED_LANGUAGES.join(', ')}`
                });
            }

            await Language.findOneAndUpdate(
                { guildId: serverId },
                { language },
                { upsert: true }
            );

            res.json({ success: true, language });
        } catch (error) {
            console.error('Error updating server language:', error);
            res.status(500).json({ error: 'Failed to update server language' });
        }
    });

    // ─── Settings ───────────────────────────────────────────────────────────────

    // GET /api/server/:serverId/settings
    router.get('/:serverId/settings', async (req, res) => {
        try {
            const { serverId } = req.params;
            const settings = await Settings.findOne({ guildId: serverId });

            if (!settings) {
                return res.json({
                    guildId: serverId,
                    autoSendEnabled: false,
                    favoriteGames: {
                        enabled: false,
                        games: { genshin: false, hkrpg: false, nap: false }
                    }
                });
            }

            res.json({
                guildId: settings.guildId,
                autoSendEnabled: settings.autoSendEnabled,
                favoriteGames: settings.favoriteGames
            });
        } catch (error) {
            console.error('Error fetching server settings:', error);
            res.status(500).json({ error: 'Failed to fetch server settings' });
        }
    });

    // PUT /api/server/:serverId/settings
    router.put('/:serverId/settings', async (req, res) => {
        try {
            const { serverId } = req.params;
            const updateData = req.body;

            let settings = await Settings.findOne({ guildId: serverId });
            if (!settings) {
                settings = new Settings({
                    guildId: serverId,
                    autoSendEnabled: false,
                    favoriteGames: {
                        enabled: false,
                        games: { genshin: false, hkrpg: false, nap: false }
                    }
                });
            }

            if (updateData.hasOwnProperty('autoSendEnabled')) {
                settings.autoSendEnabled = updateData.autoSendEnabled;
            }

            if (updateData.favoriteGames) {
                if (updateData.favoriteGames.hasOwnProperty('enabled')) {
                    settings.favoriteGames.enabled = updateData.favoriteGames.enabled;
                }
                if (updateData.favoriteGames.games) {
                    Object.assign(settings.favoriteGames.games, updateData.favoriteGames.games);
                }
            }

            await settings.save();

            res.json({
                guildId: settings.guildId,
                autoSendEnabled: settings.autoSendEnabled,
                favoriteGames: settings.favoriteGames
            });
        } catch (error) {
            console.error('Error updating server settings:', error);
            res.status(500).json({ error: 'Failed to update server settings' });
        }
    });

    // ─── Test & Reset ───────────────────────────────────────────────────────────

    // POST /api/server/:serverId/test
    router.post('/:serverId/test', async (req, res) => {
        try {
            const { serverId } = req.params;

            const config = await Config.findOne({ guildId: serverId });
            if (!config || !config.channel) {
                return res.status(400).json({ error: 'No notification channel configured' });
            }

            const guild = client.guilds.cache.get(serverId);
            if (!guild) {
                return res.status(404).json({ error: 'Server not found' });
            }

            const channel = guild.channels.cache.get(config.channel);
            if (!channel) {
                return res.status(400).json({ error: 'Notification channel not found' });
            }

            const embed = new EmbedBuilder()
                .setColor('#FFD700')
                .setTitle('🧪 Test Notification')
                .setDescription('This is a test notification from HoYo Code Sender!')
                .addFields(
                    { name: '✅ Channel', value: `<#${config.channel}>`, inline: true },
                    { name: '🤖 Bot', value: 'Working correctly!', inline: true }
                )
                .setFooter({ text: 'Test completed successfully' })
                .setTimestamp();

            await channel.send({ embeds: [embed] });

            res.json({ success: true, message: 'Test notification sent successfully!' });
        } catch (error) {
            console.error('Error sending test notification:', error);
            res.status(500).json({ error: 'Failed to send test notification' });
        }
    });

    // POST /api/server/:serverId/reset
    router.post('/:serverId/reset', async (req, res) => {
        try {
            const { serverId } = req.params;

            await Promise.all([
                Config.deleteOne({ guildId: serverId }),
                Settings.deleteOne({ guildId: serverId }),
                Language.deleteOne({ guildId: serverId })
            ]);

            res.json({ success: true, message: 'Configuration reset successfully!' });
        } catch (error) {
            console.error('Error resetting configuration:', error);
            res.status(500).json({ error: 'Failed to reset configuration' });
        }
    });

    return router;
}

module.exports = { createServerRouter };
