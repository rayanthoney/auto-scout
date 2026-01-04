export function formatPrice(price) {
    if (typeof price !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

export function formatMileage(miles) {
    if (typeof miles !== 'number') return 'N/A';
    return new Intl.NumberFormat('en-US').format(miles) + ' mi';
}

export function formatDistance(miles) {
    if (typeof miles !== 'number') return 'N/A';
    return `${miles} miles away`;
}

export function getConfidenceBadge(score) {
    if (typeof score !== 'number') return { color: 'gray', text: 'Unknown' };

    if (score >= 0.9) return { color: 'green', text: 'High Confidence' };
    if (score >= 0.7) return { color: 'yellow', text: 'Medium Confidence' };
    return { color: 'orange', text: 'Low Confidence' };
}

export function formatYear(year) {
    return year?.toString() || 'N/A';
}

export function formatLocation(location) {
    if (!location) return 'N/A';
    const { city, state } = location;
    return `${city || ''}${city && state ? ', ' : ''}${state || ''}`;
}
