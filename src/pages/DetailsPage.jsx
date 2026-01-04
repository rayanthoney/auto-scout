import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Gauge, Calendar, Fuel, Cog } from 'lucide-react';
import { mockVehicles } from '../data/mockVehicles';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function DetailsPage() {
    const { id } = useParams();
    const location = useLocation();

    // Try to get vehicle from location state (AI results), otherwise fallback to id lookup (legacy)
    const vehicle = location.state?.vehicle || mockVehicles.find((v) => v.id === id);

    if (!vehicle) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-neutral-900">
                    Vehicle not found
                </h2>
                <Link to="/search" className="mt-4 inline-block">
                    <Button>Back to Search</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <Link to="/search">
                <Button variant="outline" size="sm">
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Results
                </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Image */}
                    <Card className="p-0 overflow-hidden">
                        <div className="relative h-96 bg-neutral-200">
                            <img
                                src={vehicle.image}
                                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full text-sm font-medium text-neutral-700">
                                {vehicle.source}
                            </div>
                        </div>
                    </Card>

                    {/* Details */}
                    <Card>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            Vehicle Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                    <Calendar className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Year</p>
                                    <p className="font-semibold text-neutral-900">
                                        {vehicle.year}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                    <Gauge className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Mileage</p>
                                    <p className="font-semibold text-neutral-900">
                                        {vehicle.mileage.toLocaleString()} mi
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                    <Cog className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Transmission</p>
                                    <p className="font-semibold text-neutral-900">
                                        {vehicle.features.transmission}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                    <Fuel className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Fuel Type</p>
                                    <p className="font-semibold text-neutral-900">
                                        {vehicle.features.fuelType}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                    <MapPin className="text-primary-600" size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-neutral-600">Location</p>
                                    <p className="font-semibold text-neutral-900">
                                        {vehicle.location.city}, {vehicle.location.state}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Features */}
                    <Card>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                            Features
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <p className="text-sm text-neutral-600">Drivetrain</p>
                                <p className="font-medium text-neutral-900">
                                    {vehicle.features.drivetrain}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-600">Body Style</p>
                                <p className="font-medium text-neutral-900">
                                    {vehicle.features.bodyStyle}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-600">Exterior Color</p>
                                <p className="font-medium text-neutral-900">
                                    {vehicle.features.exteriorColor}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-neutral-600">Interior Color</p>
                                <p className="font-medium text-neutral-900">
                                    {vehicle.features.interiorColor}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <div className="space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold text-neutral-900">
                                    {vehicle.year} {vehicle.make} {vehicle.model}
                                </h1>
                                <p className="text-lg text-neutral-600">{vehicle.trim}</p>
                            </div>

                            <div className="py-4 border-y border-neutral-200">
                                <p className="text-4xl font-bold text-primary-600">
                                    ${vehicle.price.toLocaleString()}
                                </p>
                            </div>

                            <Button size="lg" className="w-full">
                                Contact Seller
                            </Button>
                            <Button variant="outline" size="lg" className="w-full">
                                Add to Compare
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
