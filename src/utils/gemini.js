import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';
import { mockVehicles } from '../data/mockVehicles.js';

/**
 * Initialize Gemini AI client
 * @returns {GoogleGenerativeAI} Configured Gemini AI instance
 */
export function initializeGemini() {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    return new GoogleGenerativeAI(apiKey);
}

/**
 * Get Gemini model
 * @param {string} modelName - Model name
 * @returns {Object} Configured Gemini model
 */
export function getGeminiModel(modelName = 'gemini-2.5-flash') {
    const genAI = initializeGemini();
    return genAI.getGenerativeModel({ model: modelName });
}

/**
 * Search for car listings
 * @param {Object} searchParams - Search parameters
 * @param {boolean} useMockFallback - Whether to use mock data if AI search fails
 * @returns {Promise<Array>} Array of car listings
 */
export async function searchCarListings(searchParams, useMockFallback = true) {
    const {
        make,
        model: carModel,
        yearMin,
        yearMax,
        priceMin,
        priceMax,
        location,
        radius = 50
    } = searchParams;

    console.log(`🤖 AI Searching for: ${make} ${carModel} (${yearMin}-${yearMax}) near ${location}`);

    try {
        const geminiModel = getGeminiModel();

        const prompt = `You are an intelligent car listing aggregator.
Task: Search for vehicles matching these criteria.
If you cannot browse the live web or find real listings, GENERATE REALISTIC EXAMPLE LISTINGS based on market data.

Search Parameters:
- Make: ${make}
- Model: ${carModel}
- Year: ${yearMin} to ${yearMax}
- Price: $${priceMin} to $${priceMax}
- Location: within ${radius} miles of ${location}

Instructions:
1. Generate 10-15 HIGHLY REALISTIC listings that match the criteria.
2. Use real-world pricing, mileage, and trim levels typical for these cars.
3. Vary the locations slightly around the target zip code.
4. return the data in the strict JSON format below.

Format:
[
  {
    "year": integer,
    "make": string,
    "model": string,
    "trim": string,
    "price": integer,
    "mileage": integer,
    "location": {"city": string, "state": string, "zip": string},
    "features": {
      "transmission": string,
      "drivetrain": string,
      "exterior_color": string,
      "fuel_type": string
    },
    "images": ["url_to_image"],
    "listing_url": "url_to_listing",
    "source": "Autotrader" | "Cars.com" | "CarGurus",
    "seller": {"name": string, "type": "dealer" | "private"},
    "ai_generated": true
  }
]

Return ONLY the JSON array. Do not include markdown formatting like \`\`\`json.`;

        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON response
        const jsonMatch = text.match(/\[[\s\S]*\]/);

        if (jsonMatch) {
            let listings = JSON.parse(jsonMatch[0]);

            // Filter AI results just in case
            listings = listings.filter(item =>
                isMatch(item, searchParams)
            );

            if (listings.length > 0) {
                // Add IDs to listings
                listings = listings.map((item, index) => ({
                    ...item,
                    id: item.id || `ai_${Date.now()}_${index}`,
                }));

                console.log(`✅ AI returned ${listings.length} listings`);
                return listings;
            }
        }

        console.warn('⚠️ AI returned no valid matches, falling back to mock data...');
        if (useMockFallback) {
            return getMockListings(searchParams);
        }

        return [];

    } catch (error) {
        console.error('❌ Error searching car listings:', error);

        if (useMockFallback) {
            console.log('🔄 Serving mock data due to error');
            return getMockListings(searchParams);
        }
        throw error;
    }
}

/**
 * Filter mock data based on search params
 */
function getMockListings(params) {
    const { make, model, yearMin, yearMax, priceMin, priceMax } = params;

    // First try strictly matching make/model
    let results = mockVehicles.filter(v =>
        v.make.toLowerCase() === make.toLowerCase() &&
        v.model.toLowerCase() === model.toLowerCase()
    );

    // If no exact matches, just match make
    if (results.length === 0) {
        results = mockVehicles.filter(v =>
            v.make.toLowerCase() === make.toLowerCase()
        );
    }

    // Apply other filters (softly)
    if (yearMin) results = results.filter(v => v.year >= parseInt(yearMin));
    if (yearMax) results = results.filter(v => v.year <= parseInt(yearMax));
    if (priceMin) results = results.filter(v => v.price >= parseInt(priceMin));
    if (priceMax) results = results.filter(v => v.price <= parseInt(priceMax));

    // If strict filtering returned no results, generate synthetic mock data
    if (results.length === 0) {
        return generateSyntheticMocks(params);
    }

    // Add metadata to static mocks
    return results.map(v => ({
        ...v,
        is_mock: true,
        source: `${v.source} (Mock)`
    }));
}

/**
 * Generate synthetic mock data matching params
 */
function generateSyntheticMocks(params) {
    const { make, model, yearMin, yearMax, priceMin, priceMax, location } = params;
    const count = 5; // Generate 5 examples
    const results = [];

    const startYear = parseInt(yearMin) || 2015;
    const endYear = parseInt(yearMax) || 2024;
    const minPrice = parseInt(priceMin) || 15000;
    const maxPrice = parseInt(priceMax) || 45000;

    for (let i = 0; i < count; i++) {
        const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
        const price = Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;

        results.push({
            id: `mock_synthetic_${Date.now()}_${i}`,
            year,
            make: make || 'Generic',
            model: model || 'Car',
            trim: ['LE', 'XLE', 'SE', 'Limited', 'Touring'][Math.floor(Math.random() * 5)],
            price,
            mileage: Math.floor(Math.random() * 80000) + 5000,
            location: {
                city: location || 'Anytown',
                state: 'CA',
                zip: typeof location === 'string' && location.match(/^\d{5}$/) ? location : '90210'
            },
            features: {
                transmission: 'Automatic',
                drivetrain: ['FWD', 'AWD', 'RWD'][Math.floor(Math.random() * 3)],
                exterior_color: ['Silver', 'Black', 'White', 'Blue', 'Red'][Math.floor(Math.random() * 5)],
                fuel_type: 'Gasoline'
            },
            images: [`https://via.placeholder.com/400x300?text=${year}+${make}+${model}`],
            listing_url: `https://example.com/search?q=${make}+${model}`,
            source: 'Simulated Listing',
            seller: { name: 'Example Motors', type: 'dealer' },
            is_mock: true,
            ai_generated: false
        });
    }

    return results;
}

/**
 * Helper to check AI results against params
 */
function isMatch(item, params) {
    if (params.yearMin && item.year < parseInt(params.yearMin)) return false;
    if (params.yearMax && item.year > parseInt(params.yearMax)) return false;
    if (params.priceMin && item.price < parseInt(params.priceMin)) return false;
    if (params.priceMax && item.price > parseInt(params.priceMax)) return false;
    return true;
}

export function validateListing(listing) {
    // Basic validation
    return {
        isValid: !!(listing.make && listing.model && listing.price)
    };
}
