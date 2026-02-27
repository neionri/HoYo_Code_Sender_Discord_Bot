const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserSubscription = require('../models/UserSubscription');
const languageManager = require('../utils/language');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dmnotify')
        .setDescription('Subscribe to receive game codes via Direct Message')
        .addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Check your current DM notification status')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('enable')
                .setDescription('Enable DM notifications for game codes')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('disable')
                .setDescription('Disable DM notifications')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('games')
                .setDescription('Select which games to receive codes for')
                .addBooleanOption(option =>
                    option.setName('genshin')
                        .setDescription('Genshin Impact codes')
                        .setRequired(false)
                )
                .addBooleanOption(option =>
                    option.setName('hsr')
                        .setDescription('Honkai: Star Rail codes')
                        .setRequired(false)
                )
                .addBooleanOption(option =>
                    option.setName('zzz')
                        .setDescription('Zenless Zone Zero codes')
                        .setRequired(false)
                )
        ),

    async execute(interaction) {
        // Try to get guild language if in a server, otherwise fallback to English
        const guildId = interaction.guildId;
        
        try {
            await interaction.deferReply({ ephemeral: true });

            const subcommand = interaction.options.getSubcommand();
            const userId = interaction.user.id;

            // Get or create user subscription
            let subscription = await UserSubscription.findOne({ userId });
            
            if (!subscription) {
                subscription = new UserSubscription({
                    userId,
                    active: false, // Default to inactive until they explicitly enable
                    language: 'en'
                });
                await subscription.save();
            }

            // Get the game names from language manager
            const gameNames = {
                genshin: await languageManager.getString('games.genshin', guildId),
                hkrpg: await languageManager.getString('games.hkrpg', guildId),
                nap: await languageManager.getString('games.nap', guildId)
            };

            switch (subcommand) {
                case 'status': {
                    const embed = new EmbedBuilder()
                        .setColor(subscription.active ? '#00ff00' : '#ff0000')
                        .setTitle(await languageManager.getString('commands.dmnotify.status.title', guildId));

                    let statusText = subscription.active ? 
                        await languageManager.getString('commands.dmnotify.status.enabled', guildId) : 
                        await languageManager.getString('commands.dmnotify.status.disabled', guildId);
                    
                    embed.setDescription(statusText);

                    // Add games list if active
                    const gamesTitle = await languageManager.getString('commands.dmnotify.status.gamesTitle', guildId);
                    
                    let activeGames = [];
                    if (subscription.games.genshin) activeGames.push(gameNames.genshin);
                    if (subscription.games.hkrpg) activeGames.push(gameNames.hkrpg);
                    if (subscription.games.nap) activeGames.push(gameNames.nap);

                    const gamesList = activeGames.length > 0 ? 
                        `• ${activeGames.join('\n• ')}` : 
                        await languageManager.getString('commands.dmnotify.status.noGames', guildId);

                    embed.addFields({ name: gamesTitle, value: gamesList });
                    embed.setFooter({ text: await languageManager.getString('commands.dmnotify.status.footer', guildId) });

                    await interaction.editReply({ embeds: [embed] });
                    break;
                }

                case 'enable': {
                    if (subscription.active) {
                        return interaction.editReply({ 
                            content: await languageManager.getString('commands.dmnotify.enable.alreadyEnabled', guildId) 
                        });
                    }

                    subscription.active = true;
                    // If they enable but have no games selected, select all by default
                    if (!subscription.games.genshin && !subscription.games.hkrpg && !subscription.games.nap) {
                        subscription.games.genshin = true;
                        subscription.games.hkrpg = true;
                        subscription.games.nap = true;
                    }
                    
                    await subscription.save();

                    // Try to send a test DM
                    try {
                        await interaction.user.send({ 
                            content: await languageManager.getString('commands.dmnotify.enable.success', guildId)
                        });
                        await interaction.editReply({ 
                            content: await languageManager.getString('commands.dmnotify.enable.success', guildId)
                        });
                    } catch (dmError) {
                        // User has DMs disabled
                        subscription.active = false;
                        await subscription.save();
                        await interaction.editReply({ 
                            content: await languageManager.getString('commands.dmnotify.error.dmBlocked', guildId) 
                        });
                    }
                    break;
                }

                case 'disable': {
                    if (!subscription.active) {
                        return interaction.editReply({ 
                            content: await languageManager.getString('commands.dmnotify.disable.alreadyDisabled', guildId) 
                        });
                    }

                    subscription.active = false;
                    await subscription.save();

                    await interaction.editReply({ 
                        content: await languageManager.getString('commands.dmnotify.disable.success', guildId) 
                    });
                    break;
                }

                case 'games': {
                    const genshin = interaction.options.getBoolean('genshin');
                    const hsr = interaction.options.getBoolean('hsr');
                    const zzz = interaction.options.getBoolean('zzz');

                    // Update existing values if provided
                    if (genshin !== null) subscription.games.genshin = genshin;
                    if (hsr !== null) subscription.games.hkrpg = hsr;
                    if (zzz !== null) subscription.games.nap = zzz;

                    await subscription.save();

                    let activeGames = [];
                    if (subscription.games.genshin) activeGames.push(gameNames.genshin);
                    if (subscription.games.hkrpg) activeGames.push(gameNames.hkrpg);
                    if (subscription.games.nap) activeGames.push(gameNames.nap);

                    if (activeGames.length === 0) {
                        await interaction.editReply({ 
                            content: await languageManager.getString('commands.dmnotify.games.noGamesSelected', guildId) 
                        });
                    } else {
                        let msg = await languageManager.getString('commands.dmnotify.games.success', guildId, { 
                            games: activeGames.join(', ') 
                        });
                        
                        // Add warning if they updated games but DM is disabled
                        if (!subscription.active) {
                            msg += '\n\n' + await languageManager.getString('commands.dmnotify.games.notEnabled', guildId);
                        }
                        
                        await interaction.editReply({ content: msg });
                    }
                    break;
                }
            }

        } catch (error) {
            console.error('Error in dmnotify command:', error);
            const errorMessage = await languageManager.getString('commands.dmnotify.error.general', guildId);
            
            if (interaction.deferred) {
                await interaction.editReply({ content: errorMessage });
            } else {
                await interaction.reply({ content: errorMessage, ephemeral: true });
            }
        }
    }
};
