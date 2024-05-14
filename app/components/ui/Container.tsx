import { cn } from '@/app/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const containerVariants = cva('text-neutral-300 rounded-md backdrop-blur', {
	variants: {
		variant: {
			default: 'border-neutral-700 bg-neutral-800 border',
			border: 'border-neutral-800 border',
			none: 'rounded-none',
		},
	},

	defaultVariants: {
		variant: 'default',
	},
});

interface ContainerProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {
	title?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, className, variant, title }) => {
	return (
		<div className={cn(containerVariants({ variant }), className)}>
			{title ? (
				<span className="font-medium text-sm text-neutral-700 absolute -top-3 left-2 backdrop-blur-3xl px-1">{title}</span>
			) : null}
			{children}
		</div>
	);
});
Container.displayName = 'Container';

export { Container };
