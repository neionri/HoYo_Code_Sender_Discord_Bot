/**
 * botInfo.js
 * ─────────────────────────────────────────────────────────
 * Single source of truth for all bot metadata, links, and
 * game-related URLs.
 *
 * When you need to update any link, version, or social info
 * just edit this one file — no hunting through commands.
 * ─────────────────────────────────────────────────────────
 */

// ── Developer / Bot Owner Info ──────────────────────────
const DEVELOPER = {
    name:      'Neionri',
    github:    'https://github.com/neionri',
    bio:       'https://neionri.xyz',
    donate:    'https://sociabuzz.com/neionri',
    sponsor:   'https://github.com/sponsors/neionri',
    kofi:      'https://ko-fi.com/neionri',
};

// ── Bot / Project Info ───────────────────────────────────
const BOT = {
    name:          'HoYo Code Sender',
    sourceCode:    'https://github.com/neionri/HoYo-Code-Sender',
    support:       'https://discord.gg/Wy2U46pCXZ',
    topgg:         'https://top.gg/bot/1365996720210579476',
    topggVote:     'https://top.gg/bot/1365996720210579476/vote',
    statusPage:    'https://uptime-chika-alpine.fly.dev/status/hoyo',

    /** Full invite URL — pulled from .env at runtime */
    inviteUrl(clientId) {
        return `https://discord.com/oauth2/authorize?client_id=${clientId}&permissions=2416331856&scope=applications.commands%20bot`;
    },
};

// ── HoYoverse API ────────────────────────────────────────
const HOYO_API = {
    codesEndpoint: 'https://hoyo-codes.seria.moe/codes',
};

// ── Game Redeem URLs ─────────────────────────────────────
const REDEEM_URLS = {
    genshin: 'https://genshin.hoyoverse.com/en/gift',
    hkrpg:   'https://hsr.hoyoverse.com/gift',
    nap:     'https://zenless.hoyoverse.com/redemption',

    // Alias untuk konsistensi pemanggilan
    hsr:     'https://hsr.hoyoverse.com/gift',
    zzz:     'https://zenless.hoyoverse.com/redemption',
};

// ── Game Display Names ───────────────────────────────────
const GAME_NAMES = {
    genshin: 'Genshin Impact',
    hkrpg:   'Honkai: Star Rail',
    nap:     'Zenless Zone Zero',
    hsr:     'Honkai: Star Rail',
    zzz:     'Zenless Zone Zero',
};

// ── Embed Color ──────────────────────────────────────────
const COLORS = {
    default:  '#5865F2',   // Discord Blurple
    success:  '#57F287',   // Green
    error:    '#ED4245',   // Red
    warning:  '#FEE75C',   // Yellow
    info:     '#5865F2',
};

// ── Export ───────────────────────────────────────────────
module.exports = {
    DEVELOPER,
    BOT,
    HOYO_API,
    REDEEM_URLS,
    GAME_NAMES,
    COLORS,
};
