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
                            label="Make"
                            placeholder="e.g., Toyota"
                            value={formData.make}
                            onChange={(e) =>
                                setFormData({ ...formData, make: e.target.value })
                            }
                        />
                        <Input
                            label="Model"
                            placeholder="e.g., Camry"
                            value={formData.model}
                            onChange={(e) =>
                                setFormData({ ...formData, model: e.target.value })
                            }
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
                    <Button type="submit" size="lg" className="w-full">
                        <Search size={20} className="inline mr-2" />
                        Search Vehicles
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
