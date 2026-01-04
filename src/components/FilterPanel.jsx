import { useSearch } from '../context/SearchContext';
import Input from './ui/Input';
import Card from './ui/Card';

export default function FilterPanel() {
    const { filters, setFilters, sortBy, setSortBy } = useSearch();

    return (
        <Card className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Filters
                </h3>

                <div className="space-y-4">
                    {/* Price Range */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Price Range
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                value={filters.priceMin}
                                onChange={(e) =>
                                    setFilters({ ...filters, priceMin: Number(e.target.value) })
                                }
                            />
                            <Input
                                type="number"
                                placeholder="Max"
                                value={filters.priceMax}
                                onChange={(e) =>
                                    setFilters({ ...filters, priceMax: Number(e.target.value) })
                                }
                            />
                        </div>
                    </div>

                    {/* Year Range */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Year Range
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input
                                type="number"
                                placeholder="Min"
                                value={filters.yearMin}
                                onChange={(e) =>
                                    setFilters({ ...filters, yearMin: Number(e.target.value) })
                                }
                            />
                            <Input
                                type="number"
                                placeholder="Max"
                                value={filters.yearMax}
                                onChange={(e) =>
                                    setFilters({ ...filters, yearMax: Number(e.target.value) })
                                }
                            />
                        </div>
                    </div>

                    {/* Mileage */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Max Mileage
                        </label>
                        <Input
                            type="number"
                            placeholder="Max mileage"
                            value={filters.mileageMax}
                            onChange={(e) =>
                                setFilters({ ...filters, mileageMax: Number(e.target.value) })
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Sort */}
            <div className="pt-4 border-t border-neutral-200">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Sort By
                </label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="year-desc">Year: Newest First</option>
                    <option value="mileage-asc">Mileage: Low to High</option>
                </select>
            </div>
        </Card>
    );
}
