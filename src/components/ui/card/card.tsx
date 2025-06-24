import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const cardVariants = tv({
    base: 'rounded-lg border bg-card text-card-foreground shadow-sm',
    variants: {
        variant: {
            default: 'border-border',
            outline: 'border-2 border-border',
            ghost: 'border-0 shadow-none',
            elevated: 'shadow-lg border-0',
        },
        size: {
            sm: 'p-3',
            md: 'p-4',
            lg: 'p-6',
            xl: 'p-8',
        },
        hover: {
            true: 'transition-all duration-200 hover:shadow-md hover:-translate-y-1',
            false: '',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'md',
        hover: false,
    },
});

const cardHeaderVariants = tv({
    base: 'flex flex-col space-y-1.5',
    variants: {
        size: {
            sm: 'p-3 pb-2',
            md: 'p-4 pb-2',
            lg: 'p-6 pb-3',
            xl: 'p-8 pb-4',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

const cardContentVariants = tv({
    base: '',
    variants: {
        size: {
            sm: 'p-3 pt-0',
            md: 'p-4 pt-0',
            lg: 'p-6 pt-0',
            xl: 'p-8 pt-0',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

const cardFooterVariants = tv({
    base: 'flex items-center',
    variants: {
        size: {
            sm: 'p-3 pt-0',
            md: 'p-4 pt-0',
            lg: 'p-6 pt-0',
            xl: 'p-8 pt-0',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

export interface CardHeaderProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> { }

export interface CardContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> { }

export interface CardFooterProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, size, hover, ...props }, ref) => (
        <div
            ref={ref}
            className={cardVariants({ variant, size, hover, className })}
            {...props}
        />
    )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, size, ...props }, ref) => (
        <div
            ref={ref}
            className={cardHeaderVariants({ size, className })}
            {...props}
        />
    )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`}
        {...props}
    />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={`text-sm text-muted-foreground ${className || ''}`}
        {...props}
    />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
    ({ className, size, ...props }, ref) => (
        <div
            ref={ref}
            className={cardContentVariants({ size, className })}
            {...props}
        />
    )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, size, ...props }, ref) => (
        <div
            ref={ref}
            className={cardFooterVariants({ size, className })}
            {...props}
        />
    )
);
CardFooter.displayName = 'CardFooter';

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};
