export function validateSearchForm(data) {
    const errors = {};

    if (!data.make || data.make.trim() === '') {
        errors.make = 'Make is required';
    }

    if (!data.model || data.model.trim() === '') {
        errors.model = 'Model is required';
    }

    if (data.zipCode && !/^\d{5}$/.test(data.zipCode)) {
        errors.zipCode = 'Zip code must be 5 digits';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

export function validatePriceRange(min, max) {
    if (min && max && parseInt(min) > parseInt(max)) {
        return { isValid: false, error: 'Minimum price cannot be greater than maximum price' };
    }
    return { isValid: true };
}

export function validateYearRange(min, max) {
    const currentYear = new Date().getFullYear();

    if (min && (min < 1900 || min > currentYear + 1)) {
        return { isValid: false, error: 'Invalid minimum year' };
    }

    if (max && (max < 1900 || max > currentYear + 1)) {
        return { isValid: false, error: 'Invalid maximum year' };
    }

    if (min && max && parseInt(min) > parseInt(max)) {
        return { isValid: false, error: 'Minimum year cannot be greater than maximum year' };
    }

    return { isValid: true };
}
