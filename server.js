import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { searchCarListings } from './src/utils/gemini.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory cache for search results
const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Helper function to generate cache key
function getCacheKey(params) {
    return JSON.stringify(params);
}

// Helper function to check cache
function getFromCache(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }
    cache.delete(key);
    return null;
}

// Helper function to set cache
function setCache(key, data) {
    cache.set(key, {
        data,
        timestamp: Date.now()
    });
}

// Search endpoint
app.post('/api/search', async (req, res) => {
    try {
        const { make, model, yearMin, yearMax, priceMin, priceMax, location, radius } = req.body;

        // Validation
        if (!make || !model) {
            return res.status(400).json({
                error: 'Make and model are required',
                details: 'Please provide both make and model for the search'
            });
        }

        // Check cache
        const cacheKey = getCacheKey(req.body);
        const cachedResults = getFromCache(cacheKey);

        if (cachedResults) {
            console.log('✅ Returning cached results');
            return res.json({
                ...cachedResults,
                cached: true,
                cacheAge: Math.floor((Date.now() - cache.get(cacheKey).timestamp) / 1000)
            });
        }

        console.log('🔍 Searching for:', { make, model, yearMin, yearMax, priceMin, priceMax, location, radius });

        // Call Gemini API
        const startTime = Date.now();
        const listings = await searchCarListings({
            make,
            model: model,
            yearMin: yearMin || 2015,
            yearMax: yearMax || new Date().getFullYear(),
            priceMin: priceMin || 0,
            priceMax: priceMax || 100000,
            location: location || '90210',
            radius: radius || 50
        });

        const searchTime = ((Date.now() - startTime) / 1000).toFixed(2);

        const response = {
            results: listings,
            totalCount: listings.length,
            searchTime: `${searchTime}s`,
            timestamp: new Date().toISOString(),
            cached: false
        };

        // Cache the results
        setCache(cacheKey, response);

        console.log(`✅ Found ${listings.length} listings in ${searchTime}s`);
        res.json(response);

    } catch (error) {
        console.error('❌ Search error:', error);
        res.status(500).json({
            error: 'Search failed',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        cacheSize: cache.size,
        uptime: process.uptime()
    });
});

// Cache stats endpoint
app.get('/api/cache/stats', (req, res) => {
    const stats = {
        size: cache.size,
        keys: Array.from(cache.keys()).map(key => {
            const cached = cache.get(key);
            return {
                params: JSON.parse(key),
                age: Math.floor((Date.now() - cached.timestamp) / 1000),
                resultsCount: cached.data.results.length
            };
        })
    };
    res.json(stats);
});

// Clear cache endpoint
app.post('/api/cache/clear', (req, res) => {
    const size = cache.size;
    cache.clear();
    res.json({
        message: 'Cache cleared',
        clearedEntries: size
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 API Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔍 Search endpoint: POST http://localhost:${PORT}/api/search`);
});

export default app;
