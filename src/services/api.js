const API_BASE_URL = import.meta.env.VITE_API_URL || '';

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

    const text = await response.text();
    let data;

    try {
        data = text ? JSON.parse(text) : {};
    } catch (e) {
        console.error('Failed to parse API response:', text);
        throw new Error('Invalid API response format');
    }

    if (!response.ok) {
        throw new Error(data.details || data.error || `Request failed with status ${response.status}`);
    }

    return data;
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
