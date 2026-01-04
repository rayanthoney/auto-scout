import { useSearch } from '../context/SearchContext';
import VehicleCard from '../components/VehicleCard';
import FilterPanel from '../components/FilterPanel';
import Card from '../components/ui/Card';

export default function ResultsPage() {
    const { results, searchParams } = useSearch();

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
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filter Sidebar */}
                <div className="lg:col-span-1">
                    <FilterPanel />
                </div>

                {/* Results Grid */}
                <div className="lg:col-span-3">
                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {results.map((vehicle) => (
                                <VehicleCard key={vehicle.id} vehicle={vehicle} />
                            ))}
                        </div>
                    ) : (
                        <Card className="text-center py-12">
                            <p className="text-neutral-500 text-lg">
                                No vehicles found matching your criteria. Try adjusting your
                                filters.
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
