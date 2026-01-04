import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, TrendingUp, Shield, Zap } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

export default function HomePage() {
    const navigate = useNavigate();
    const { setSearchParams } = useSearch();
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        zipCode: '',
        yearMin: '',
        yearMax: '',
        priceMin: '',
        priceMax: '',
        radius: '50',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams(formData);
        navigate('/search');
    };

    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-12">
                <div className="inline-block">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                        <Zap size={16} />
                        Search Multiple Platforms Instantly
                    </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 leading-tight">
                    Find Your Perfect Car
                    <br />
                    <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                        Across All Platforms
                    </span>
                </h1>
                <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                    Compare prices, features, and availability from multiple car sales
                    platforms in one place. Save time and find the best deals.
                </p>

                {/* Search Form */}
                <form
                    onSubmit={handleSearch}
                    className="max-w-4xl mx-auto mt-8 bg-white rounded-2xl shadow-lg p-6 border border-neutral-200"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <Input
                            label="Make *"
                            placeholder="e.g., Toyota"
                            value={formData.make}
                            onChange={(e) =>
                                setFormData({ ...formData, make: e.target.value })
                            }
                            required
                        />
                        <Input
                            label="Model *"
                            placeholder="e.g., Camry"
                            value={formData.model}
                            onChange={(e) =>
                                setFormData({ ...formData, model: e.target.value })
                            }
                            required
                        />
                        <Input
                            label="Zip Code"
                            placeholder="e.g., 90210"
                            value={formData.zipCode}
                            onChange={(e) =>
                                setFormData({ ...formData, zipCode: e.target.value })
                            }
                        />
                    </div>

                    {/* Advanced Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <Input
                            label="Min Year"
                            type="number"
                            placeholder="2015"
                            value={formData.yearMin}
                            onChange={(e) =>
                                setFormData({ ...formData, yearMin: e.target.value })
                            }
                        />
                        <Input
                            label="Max Year"
                            type="number"
                            placeholder={new Date().getFullYear().toString()}
                            value={formData.yearMax}
                            onChange={(e) =>
                                setFormData({ ...formData, yearMax: e.target.value })
                            }
                        />
                        <Input
                            label="Min Price"
                            type="number"
                            placeholder="$10,000"
                            value={formData.priceMin}
                            onChange={(e) =>
                                setFormData({ ...formData, priceMin: e.target.value })
                            }
                        />
                        <Input
                            label="Max Price"
                            type="number"
                            placeholder="$50,000"
                            value={formData.priceMax}
                            onChange={(e) =>
                                setFormData({ ...formData, priceMax: e.target.value })
                            }
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Search Radius
                        </label>
                        <select
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            value={formData.radius}
                            onChange={(e) =>
                                setFormData({ ...formData, radius: e.target.value })
                            }
                        >
                            <option value="25">25 miles</option>
                            <option value="50">50 miles</option>
                            <option value="100">100 miles</option>
                            <option value="200">200 miles</option>
                            <option value="500">Any distance</option>
                        </select>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                        <Search size={20} className="inline mr-2" />
                        Search Vehicles with AI
                    </Button>
                </form>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="text-center space-y-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                        <Search className="text-primary-600" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                        Multi-Source Search
                    </h3>
                    <p className="text-neutral-600">
                        Search across 5+ platforms including AutoTrader, Cars.com, and
                        CarGurus simultaneously.
                    </p>
                </Card>

                <Card className="text-center space-y-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                        <TrendingUp className="text-primary-600" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                        Price Comparison
                    </h3>
                    <p className="text-neutral-600">
                        Compare prices and identify the best deals with our intelligent
                        price analysis.
                    </p>
                </Card>

                <Card className="text-center space-y-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                        <Shield className="text-primary-600" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                        Trusted Data
                    </h3>
                    <p className="text-neutral-600">
                        Real-time data from verified sources ensures you get accurate and
                        up-to-date information.
                    </p>
                </Card>
            </section>
        </div>
    );
}
