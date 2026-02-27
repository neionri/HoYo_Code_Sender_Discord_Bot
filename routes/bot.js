/**
 * routes/bot.js
 * Protected API routes for Discord bot stats & guild info.
 * All routes require authMiddleware (applied in index.js via app.use('/api/bot', authMiddleware)).
 */
const express = require('express');

/**
 * Factory function — accepts the Discord client so routes can access it.
 * @param {import('discord.js').Client} client
 * @returns {express.Router}
 */
function createBotRouter(client) {
    const router = express.Router();

    // GET /api/bot/stats
    router.get('/stats', async (req, res) => {
        try {
            if (!client || !client.isReady()) {
                return res.status(503).json({ error: 'Bot is not ready' });
            }

            const stats = {
                guildCount: client.guilds.cache.size,
                userCount: client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
                channelCount: client.channels.cache.size,
                uptime: process.uptime(),
                memoryUsage: process.memoryUsage(),
                botUser: {
                    username: client.user.username,
                    discriminator: client.user.discriminator,
                    id: client.user.id,
                    avatar: client.user.displayAvatarURL({ format: 'png', size: 256 })
                },
                status: client.ws.status,
                ping: client.ws.ping,
                version: process.env.VERSION || '1.0.0',
                nodeVersion: process.version
            };

            res.json(stats);
        } catch (error) {
            console.error('Error fetching bot stats:', error);
            res.status(500).json({ error: 'Failed to fetch bot stats' });
        }
    });

    // GET /api/bot/guilds
    router.get('/guilds', async (req, res) => {
        try {
            if (!client || !client.isReady()) {
                return res.status(503).json({ error: 'Bot is not ready' });
            }

            const guilds = client.guilds.cache.map(guild => ({
                id: guild.id,
                name: guild.name,
                memberCount: guild.memberCount,
                icon: guild.iconURL({ format: 'png', size: 128 }),
                ownerId: guild.ownerId,
                joinedAt: guild.joinedAt
            }));

            res.json({ guilds, total: guilds.length });
        } catch (error) {
            console.error('Error fetching guild info:', error);
            res.status(500).json({ error: 'Failed to fetch guild info' });
        }
    });

    // GET /api/bot/commands
    router.get('/commands', async (req, res) => {
        try {
            const commands = client.commands.map(command => ({
                name: command.data.name,
                description: command.data.description,
                options: command.data.options || []
            }));

            res.json({ commands, total: commands.length });
        } catch (error) {
            console.error('Error fetching commands:', error);
            res.status(500).json({ error: 'Failed to fetch commands' });
        }
    });

    // GET /api/bot/guild/:guildId
    router.get('/guild/:guildId', async (req, res) => {
        try {
            const { guildId } = req.params;

            if (!client || !client.isReady()) {
                return res.status(503).json({ error: 'Bot is not ready' });
            }

            const guild = client.guilds.cache.get(guildId);
            if (!guild) {
                return res.status(404).json({ error: 'Guild not found' });
            }

            const guildInfo = {
                id: guild.id,
                name: guild.name,
                memberCount: guild.memberCount,
                icon: guild.iconURL({ format: 'png', size: 128 }),
                ownerId: guild.ownerId,
                joinedAt: guild.joinedAt,
                description: guild.description,
                features: guild.features,
                roles: guild.roles.cache
                    .filter(role => role.name !== '@everyone' && !role.managed)
                    .map(role => ({
                        id: role.id,
                        name: role.name,
                        color: role.hexColor,
                        position: role.position,
                        mentionable: role.mentionable,
                        managed: role.managed
                    }))
                    .sort((a, b) => b.position - a.position),
                channels: guild.channels.cache
                    .filter(channel => channel.type === 0 && channel.permissionsFor(guild.members.me).has('SendMessages'))
                    .map(channel => ({
                        id: channel.id,
                        name: channel.name,
                        type: channel.type,
                        position: channel.position
                    }))
                    .sort((a, b) => a.position - b.position)
            };

            res.json(guildInfo);
        } catch (error) {
            console.error('Error fetching guild info:', error);
            res.status(500).json({ error: 'Failed to fetch guild info' });
        }
    });

    return router;
}

module.exports = { createBotRouter };
