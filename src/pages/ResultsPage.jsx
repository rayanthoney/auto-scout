import { useEffect, useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { searchCars } from '../services/api';
import VehicleCard from '../components/VehicleCard';
import FilterPanel from '../components/FilterPanel';
import Card from '../components/ui/Card';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function ResultsPage() {
    const { searchParams, setResults, paginatedResults, currentPage, setCurrentPage, totalPages, filteredResults } = useSearch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchInfo, setSearchInfo] = useState(null);

    useEffect(() => {
        if (searchParams.make && searchParams.model) {
            performSearch();
        }
    }, [searchParams]);

    const performSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = {
                make: searchParams.make,
                model: searchParams.model,
                yearMin: parseInt(searchParams.yearMin) || 2015,
                yearMax: parseInt(searchParams.yearMax) || new Date().getFullYear(),
                priceMin: parseInt(searchParams.priceMin) || 0,
                priceMax: parseInt(searchParams.priceMax) || 100000,
                location: searchParams.zipCode || '90210',
                radius: parseInt(searchParams.radius) || 50
            };

            const response = await searchCars(params);
            setResults(response.results || []);
            setSearchInfo({
                totalCount: response.totalCount,
                searchTime: response.searchTime,
                cached: response.cached,
                cacheAge: response.cacheAge
            });
            setCurrentPage(1); // Reset to first page on new search
        } catch (err) {
            setError(err.message || 'Failed to search vehicles');
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    // Loading State
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
                <div className="relative">
                    <Loader2 className="w-16 h-16 text-primary-600 animate-spin" />
                    <Sparkles className="w-8 h-8 text-primary-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-neutral-900">
                        Searching with AI...
                    </h2>
                    <p className="text-neutral-600">
                        Analyzing listings from Autotrader, Cars.com, CarGurus, and more
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 mt-4">
                        <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                        <span>This may take a few seconds...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Card className="max-w-md text-center p-8">
                    <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                        Search Failed
                    </h2>
                    <p className="text-neutral-600 mb-4">{error}</p>
                    <button
                        onClick={performSearch}
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                        Try Again
                    </button>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">
                        Search Results
                    </h1>
                    <p className="text-neutral-600 mt-1">
                        Found {results.length} vehicle{results.length !== 1 ? 's' : ''}
                        {searchParams.make && ` for ${searchParams.make}`}
                        {searchParams.model && ` ${searchParams.model}`}
                    </p>
                    {searchInfo && (
                        <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500">
                            <span>Search time: {searchInfo.searchTime}</span>
                            {searchInfo.cached && (
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                                    Cached ({searchInfo.cacheAge}s ago)
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filter Sidebar */}
                <div className="lg:col-span-1">
                    <FilterPanel />
                </div>

                {/* Results Grid */}
                <div className="lg:col-span-3">
                    {paginatedResults.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                {paginatedResults.map((vehicle, index) => (
                                    <VehicleCard key={index} vehicle={vehicle} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-lg border border-neutral-300 disabled:opacity-50 hover:bg-neutral-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-neutral-600">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-lg border border-neutral-300 disabled:opacity-50 hover:bg-neutral-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <Card className="text-center py-12">
                            <p className="text-neutral-500 text-lg">
                                No vehicles found matching your criteria. Try adjusting your
                                search parameters or filters.
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
