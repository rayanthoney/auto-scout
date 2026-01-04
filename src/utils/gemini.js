import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

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
 * Get Gemini model with web search grounding
 * @param {string} modelName - Model name (default: gemini-2.5-flash)
 * @returns {Object} Configured Gemini model
 */
export function getGeminiModel(modelName = 'gemini-2.5-flash') {
    const genAI = initializeGemini();

    return genAI.getGenerativeModel({
        model: modelName,
        tools: [{ googleSearch: true }] // Enable web search grounding
    });
}

/**
 * Search for car listings using AI web search
 * @param {Object} searchParams - Search parameters
 * @param {string} searchParams.make - Car make (e.g., "Toyota")
 * @param {string} searchParams.model - Car model (e.g., "Camry")
 * @param {number} searchParams.yearMin - Minimum year
 * @param {number} searchParams.yearMax - Maximum year
 * @param {number} searchParams.priceMin - Minimum price
 * @param {number} searchParams.priceMax - Maximum price
 * @param {string} searchParams.location - Zip code or location
 * @param {number} searchParams.radius - Search radius in miles
 * @returns {Promise<Array>} Array of car listings
 */
export async function searchCarListings(searchParams) {
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

    const geminiModel = getGeminiModel();

    const prompt = `You are a car listing aggregator. Search the web for vehicles matching these criteria:
- Make: ${make}
- Model: ${carModel}
- Year: ${yearMin} to ${yearMax}
- Price: $${priceMin} to $${priceMax}
- Location: within ${radius} miles of ${location}

Search across major car sales websites (Autotrader, Cars.com, CarGurus, etc.)

For each listing found, extract:
{
  "year": integer,
  "make": string,
  "model": string,
  "trim": string or null,
  "price": integer,
  "mileage": integer,
  "location": {"city": string, "state": string, "zip": string},
  "features": {
    "transmission": string,
    "drivetrain": string,
    "exterior_color": string,
    "fuel_type": string
  },
  "images": [array of image URLs],
  "listing_url": string,
  "source": string (website name),
  "seller": {"name": string, "type": "dealer" or "private"}
}

Return an array of listings in JSON format. Include only valid, active listings.
Aim for at least 20 results if available.`;

    try {
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON response
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            const listings = JSON.parse(jsonMatch[0]);
            return listings;
        }

        throw new Error('No valid JSON found in response');
    } catch (error) {
        console.error('Error searching car listings:', error);
        throw error;
    }
}

/**
 * Validate car listing data
 * @param {Object} listing - Car listing object
 * @returns {Object} Validation results
 */
export function validateListing(listing) {
    const currentYear = new Date().getFullYear();

    return {
        hasValidPrice: listing.price > 0 && listing.price < 500000,
        hasValidMileage: listing.mileage >= 0 && listing.mileage < 500000,
        hasValidYear: listing.year >= 1990 && listing.year <= currentYear + 1,
        hasValidUrl: listing.listing_url && listing.listing_url.startsWith('http'),
        hasLocation: listing.location?.city && listing.location?.state,
        isValid: function () {
            return this.hasValidPrice &&
                this.hasValidMileage &&
                this.hasValidYear &&
                this.hasValidUrl &&
                this.hasLocation;
        }
    };
}
