/**
 * routes/codes.js
 * Public API routes for fetching HoYoverse redemption codes.
 * Source: hoyo-codes.seria.moe
 */
const express = require('express');
const axios = require('axios');

const router = express.Router();

// Simple in-memory cache for API responses
const apiCache = new Map();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

/**
 * Get cached or fresh code data from the upstream API.
 * Falls back to stale cache on upstream error.
 */
async function getCachedApiData(game, apiUrl) {
    const cacheKey = `codes_${game}`;
    const cached = apiCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    try {
        const startTime = Date.now();
        const response = await axios.get(apiUrl, {
            timeout: 10000,
            headers: { 'User-Agent': 'HoYo-Code-Sender-Bot/1.0' }
        });
        const responseTime = Date.now() - startTime;

        if (responseTime > 5000) {
            console.warn(`⚠️  Slow API response for ${game}: ${responseTime}ms`);
        }

        apiCache.set(cacheKey, {
            data: response.data,
            timestamp: Date.now(),
            responseTime
        });

        return response.data;
    } catch (error) {
        // Return stale cache on error to avoid downstream failures
        if (cached) {
            console.warn(`API error for ${game}, using cached data:`, error.message);
            console.log(`Using stale cached data for ${game} (age: ${Math.round((Date.now() - cached.timestamp) / 1000)}s)`);
            return cached.data;
        }
        throw error;
    }
}

// Clear stale cache entries every hour
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of apiCache.entries()) {
        if (now - value.timestamp > CACHE_DURATION * 2) {
            apiCache.delete(key);
        }
    }
}, 60 * 60 * 1000);

// GET /api/codes/genshin
router.get('/genshin', async (req, res) => {
    try {
        const data = await getCachedApiData('genshin', 'https://hoyo-codes.seria.moe/codes?game=genshin');
        res.json(data);
    } catch (error) {
        console.error('Error fetching Genshin codes:', error);
        res.status(500).json({ error: 'Failed to fetch codes' });
    }
});

// GET /api/codes/hsr
router.get('/hsr', async (req, res) => {
    try {
        const data = await getCachedApiData('hkrpg', 'https://hoyo-codes.seria.moe/codes?game=hkrpg');
        res.json(data);
    } catch (error) {
        console.error('Error fetching HSR codes:', error);
        res.status(500).json({ error: 'Failed to fetch codes' });
    }
});

// GET /api/codes/zzz
router.get('/zzz', async (req, res) => {
    try {
        const data = await getCachedApiData('nap', 'https://hoyo-codes.seria.moe/codes?game=nap');
        res.json(data);
    } catch (error) {
        console.error('Error fetching ZZZ codes:', error);
        res.status(500).json({ error: 'Failed to fetch codes' });
    }
});

module.exports = router;
