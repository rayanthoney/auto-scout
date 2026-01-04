import { cn } from '../../lib/utils';

const variants = {
    primary:
        'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary:
        'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 focus:ring-neutral-400',
    outline:
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
};

const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) {
    return (
        <button
            className={cn(
                'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
}
