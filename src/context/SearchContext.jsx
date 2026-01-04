import { createContext, useContext, useState, useMemo } from 'react';
import { mockVehicles } from '../data/mockVehicles';

const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [searchParams, setSearchParams] = useState({
        make: '',
        model: '',
        zipCode: '',
    });

    const [filters, setFilters] = useState({
        priceMin: 0,
        priceMax: 100000,
        yearMin: 2015,
        yearMax: 2024,
        mileageMax: 100000,
    });

    const [sortBy, setSortBy] = useState('price-asc');

    const filteredResults = useMemo(() => {
        let results = [...mockVehicles];

        // Filter by search params
        if (searchParams.make) {
            results = results.filter((v) =>
                v.make.toLowerCase().includes(searchParams.make.toLowerCase()),
            );
        }
        if (searchParams.model) {
            results = results.filter((v) =>
                v.model.toLowerCase().includes(searchParams.model.toLowerCase()),
            );
        }

        // Apply filters
        results = results.filter(
            (v) =>
                v.price >= filters.priceMin &&
                v.price <= filters.priceMax &&
                v.year >= filters.yearMin &&
                v.year <= filters.yearMax &&
                v.mileage <= filters.mileageMax,
        );

        // Apply sorting
        switch (sortBy) {
            case 'price-asc':
                results.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                results.sort((a, b) => b.price - a.price);
                break;
            case 'year-desc':
                results.sort((a, b) => b.year - a.year);
                break;
            case 'mileage-asc':
                results.sort((a, b) => a.mileage - b.mileage);
                break;
            default:
                break;
        }

        return results;
    }, [searchParams, filters, sortBy]);

    const value = {
        searchParams,
        setSearchParams,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        results: filteredResults,
    };

    return (
        <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within SearchProvider');
    }
    return context;
}
