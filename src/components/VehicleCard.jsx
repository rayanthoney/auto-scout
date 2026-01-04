import { Link } from 'react-router-dom';
import { MapPin, Gauge, Calendar, ExternalLink } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { formatPrice, formatMileage, formatLocation } from '../utils/formatters';

export default function VehicleCard({ vehicle }) {
    // Handle both old mock data format and new AI format
    const imageUrl = vehicle.images?.[0] || vehicle.image || 'https://via.placeholder.com/400x300?text=No+Image';
    const listingUrl = vehicle.listing_url || `/listing/${vehicle.id}`;
    const source = vehicle.source || 'Unknown';

    return (
        <Card className="overflow-hidden p-0 hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-neutral-200">
                <img
                    src={imageUrl}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-medium text-neutral-700 shadow-sm">
                    {source}
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    {vehicle.trim && (
                        <p className="text-sm text-neutral-600">{vehicle.trim}</p>
                    )}
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                        <Gauge size={16} />
                        <span>{formatMileage(vehicle.mileage)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{vehicle.year}</span>
                    </div>
                </div>

                {vehicle.location && (
                    <div className="flex items-center gap-1 text-sm text-neutral-600">
                        <MapPin size={16} />
                        <span>{formatLocation(vehicle.location)}</span>
                    </div>
                )}

                {/* Features */}
                {vehicle.features && (
                    <div className="flex flex-wrap gap-2 text-xs">
                        {vehicle.features.transmission && (
                            <span className="px-2 py-1 bg-neutral-100 rounded-md text-neutral-700">
                                {vehicle.features.transmission}
                            </span>
                        )}
                        {vehicle.features.fuel_type && (
                            <span className="px-2 py-1 bg-neutral-100 rounded-md text-neutral-700">
                                {vehicle.features.fuel_type}
                            </span>
                        )}
                    </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                    <div>
                        <p className="text-2xl font-bold text-primary-600">
                            {formatPrice(vehicle.price)}
                        </p>
                    </div>
                    {vehicle.listing_url && vehicle.listing_url !== 'url_to_listing' && vehicle.listing_url.startsWith('http') ? (
                        <a
                            href={vehicle.listing_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1"
                        >
                            <Button size="sm">
                                View Listing
                                <ExternalLink size={14} className="ml-1" />
                            </Button>
                        </a>
                    ) : (
                        <Link to={`/listing/${vehicle.id}`} state={{ vehicle }}>
                            <Button size="sm">View Details</Button>
                        </Link>
                    )}
                </div>
            </div>
        </Card>
    );
}
