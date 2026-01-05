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
        priceMax: 500000,
        yearMin: 1990,
        yearMax: new Date().getFullYear() + 1,
        mileageMax: 500000,
    });

    const [sortBy, setSortBy] = useState('price-asc');

    const [results, setResults] = useState([]);

    const filteredResults = useMemo(() => {
        if (!results.length) return [];
        let data = [...results];

        // Filter by search params
        if (searchParams.make) {
            console.log('Filtering by make:', searchParams.make);
            const searchMake = searchParams.make.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
            data = data.filter((v) =>
                v.make.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchMake),
            );
        }
        if (searchParams.model) {
            console.log('Filtering by model:', searchParams.model);
            const searchModel = searchParams.model.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
            data = data.filter((v) =>
                v.model.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchModel),
            );
        }

        console.log('Data after make/model filter:', data.length);
        console.log('Applying numeric filters:', filters);

        // Apply filters
        data = data.filter(
            (v) => {
                // strict safe parsing
                const price = typeof v.price === 'string' ? parseInt(v.price.replace(/[^0-9]/g, '')) : v.price;
                const year = typeof v.year === 'string' ? parseInt(v.year) : v.year;
                const mileage = typeof v.mileage === 'string' ? parseInt(v.mileage.replace(/[^0-9]/g, '')) : v.mileage;

                const pass = (price || 0) >= filters.priceMin &&
                    (price || 0) <= filters.priceMax &&
                    (year || 0) >= filters.yearMin &&
                    (year || 0) <= filters.yearMax &&
                    (mileage || 0) <= filters.mileageMax;

                if (!pass) {
                    // console.log('Dropped item:', v.make, v.model, 'Price:', price, 'Year:', year);
                }
                return pass;
            }
        );
        console.log('Data after numeric filters:', data.length);

        // Apply sorting
        switch (sortBy) {
            case 'price-asc':
                data.sort((a, b) => {
                    const pa = typeof a.price === 'string' ? parseInt(a.price.replace(/[^0-9]/g, '')) : a.price;
                    const pb = typeof b.price === 'string' ? parseInt(b.price.replace(/[^0-9]/g, '')) : b.price;
                    return (pa || 0) - (pb || 0);
                });
                break;
            case 'price-desc':
                data.sort((a, b) => {
                    const pa = typeof a.price === 'string' ? parseInt(a.price.replace(/[^0-9]/g, '')) : a.price;
                    const pb = typeof b.price === 'string' ? parseInt(b.price.replace(/[^0-9]/g, '')) : b.price;
                    return (pb || 0) - (pa || 0);
                });
                break;
            case 'year-desc':
                data.sort((a, b) => {
                    const ya = typeof a.year === 'string' ? parseInt(a.year) : a.year;
                    const yb = typeof b.year === 'string' ? parseInt(b.year) : b.year;
                    return (yb || 0) - (ya || 0);
                });
                break;
            case 'mileage-asc':
                data.sort((a, b) => {
                    const ma = typeof a.mileage === 'string' ? parseInt(a.mileage.replace(/[^0-9]/g, '')) : a.mileage;
                    const mb = typeof b.mileage === 'string' ? parseInt(b.mileage.replace(/[^0-9]/g, '')) : b.mileage;
                    return (ma || 0) - (mb || 0);
                });
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
