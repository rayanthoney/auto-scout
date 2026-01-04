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

    const [results, setResults] = useState([]);

    const filteredResults = useMemo(() => {
        if (!results.length) return [];
        let data = [...results];

        // Filter by search params
        if (searchParams.make) {
            data = data.filter((v) =>
                v.make.toLowerCase().includes(searchParams.make.toLowerCase()),
            );
        }
        if (searchParams.model) {
            data = data.filter((v) =>
                v.model.toLowerCase().includes(searchParams.model.toLowerCase()),
            );
        }

        // Apply filters
        data = data.filter(
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
                data.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                data.sort((a, b) => b.price - a.price);
                break;
            case 'year-desc':
                data.sort((a, b) => b.year - a.year);
                break;
            case 'mileage-asc':
                data.sort((a, b) => a.mileage - b.mileage);
                break;
            default:
                break;
        }

        return data;
    }, [results, searchParams, filters, sortBy]);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const paginatedResults = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredResults.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredResults, currentPage]);

    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

    const value = {
        searchParams,
        setSearchParams,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        setSortBy,
        results,
        setResults,
        filteredResults,
        paginatedResults,
        currentPage,
        setCurrentPage,
        totalPages,
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
