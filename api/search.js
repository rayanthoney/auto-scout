import { searchCarListings } from '../src/utils/gemini.js';

// Simple in-memory cache (Note: Effectively ephemeral in serverless)
const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCacheKey(params) {
    return JSON.stringify(params);
}

export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { make, model, yearMin, yearMax, priceMin, priceMax, location, radius } = req.body;

        if (!make || !model) {
            return res.status(400).json({
                error: 'Make and model are required',
                details: 'Please provide both make and model for the search'
            });
        }

        // Check cache
        const cacheKey = getCacheKey(req.body);
        const cached = cache.get(cacheKey);

        if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
            console.log('✅ Returning cached results (Serverless)');
            return res.status(200).json({
                ...cached.data,
                cached: true,
                cacheAge: Math.floor((Date.now() - cached.timestamp) / 1000)
            });
        }

        console.log('🔍 Searching for:', { make, model, yearMin, yearMax, priceMin, priceMax, location, radius });

        const startTime = Date.now();
        const listings = await searchCarListings({
            make,
            model,
            yearMin: yearMin || 2015,
            yearMax: yearMax || new Date().getFullYear(),
            priceMin: priceMin || 0,
            priceMax: priceMax || 100000,
            location: location || '90210',
            radius: radius || 50
        }, true); // Enable mock fallback

        const searchTime = ((Date.now() - startTime) / 1000).toFixed(2);

        const response = {
            results: listings,
            totalCount: listings.length,
            searchTime: `${searchTime}s`,
            timestamp: new Date().toISOString(),
            cached: false
        };

        // Set cache
        cache.set(cacheKey, {
            data: response,
            timestamp: Date.now()
        });

        console.log(`✅ Found ${listings.length} listings in ${searchTime}s`);
        res.status(200).json(response);

    } catch (error) {
        console.error('❌ Search error:', error);
        res.status(500).json({
            error: 'Search failed',
            details: error.message,
            timestamp: new Date().toISOString()
        });
    }
}
