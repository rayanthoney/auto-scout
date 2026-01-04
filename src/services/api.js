const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Search for car listings
 * @param {Object} params - Search parameters
 * @returns {Promise<Object>} Search results
 */
export async function searchCars(params) {
    const response = await fetch(`${API_BASE_URL}/api/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || error.error || 'Search failed');
    }

    return response.json();
}

/**
 * Get API health status
 * @returns {Promise<Object>} Health status
 */
export async function getHealth() {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.json();
}

/**
 * Get cache statistics
 * @returns {Promise<Object>} Cache stats
 */
export async function getCacheStats() {
    const response = await fetch(`${API_BASE_URL}/api/cache/stats`);
    return response.json();
}

/**
 * Clear the cache
 * @returns {Promise<Object>} Clear result
 */
export async function clearCache() {
    const response = await fetch(`${API_BASE_URL}/api/cache/clear`, {
        method: 'POST',
    });
    return response.json();
}
