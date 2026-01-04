import { cn } from '../../lib/utils';

export default function Card({ children, className, ...props }) {
    return (
        <div
            className={cn(
                'bg-white rounded-xl shadow-sm border border-neutral-200 p-6 transition-shadow hover:shadow-md transform-gpu',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
