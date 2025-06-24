import { tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
    base: 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',

    variants: {
        color: {
            primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
            secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
            danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
        },
        size: {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        },
        disabled: {
            true: 'opacity-50 cursor-not-allowed',
        },
    },

    compoundVariants: [
        {
            color: 'primary',
            size: 'lg',
            class: 'uppercase',
        },
    ],

    defaultVariants: {
        color: 'primary',
        size: 'md',
    },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        children: React.ReactNode;
        className?: string;
    };

export const Button = ({ children, color, size, disabled, className, ...props }: ButtonProps) => {
    return (
        <button
            className={buttonVariants({ color, size, disabled, className })}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};