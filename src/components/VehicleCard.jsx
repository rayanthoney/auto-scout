import { Link } from 'react-router-dom';
import { MapPin, Gauge, Calendar } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';

export default function VehicleCard({ vehicle }) {
    return (
        <Card className="overflow-hidden p-0 hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-neutral-200">
                <img
                    src={vehicle.image}
                    alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-medium text-neutral-700">
                    {vehicle.source}
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div>
                    <h3 className="text-xl font-bold text-neutral-900">
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-neutral-600">{vehicle.trim}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                        <Gauge size={16} />
                        <span>{vehicle.mileage.toLocaleString()} mi</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{vehicle.year}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-neutral-600">
                    <MapPin size={16} />
                    <span>
                        {vehicle.location.city}, {vehicle.location.state}
                    </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                    <div>
                        <p className="text-2xl font-bold text-primary-600">
                            ${vehicle.price.toLocaleString()}
                        </p>
                    </div>
                    <Link to={`/listing/${vehicle.id}`}>
                        <Button size="sm">View Details</Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}
