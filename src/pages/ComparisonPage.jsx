import Card from '../components/ui/Card';

export default function ComparisonPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-neutral-900">
                    Compare Vehicles
                </h1>
                <p className="text-neutral-600 mt-1">
                    Select vehicles from search results to compare
                </p>
            </div>

            <Card className="text-center py-12">
                <p className="text-neutral-500 text-lg">
                    Comparison view coming soon.
                </p>
            </Card>
        </div>
    );
}
