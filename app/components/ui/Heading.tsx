import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, FC, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export const headingVariants = cva('text-neutral-400', {
	variants: {
		size: {
			lg: 'text-5xl md:text-6xl leading-tight font-extrabold',
			default: 'text-4xl md:text-5xl leading-lose font-extrabold',
			sm: 'text-3xl md:text-4xl leading-tight font-bold',
			xs: 'text-2xl md:text-3xl xl:text-4xl leading-snug font-bold',
			uberSmall: 'text-xl leading-tight font-medium',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof headingVariants> {
	isLoading?: boolean;
}

const Heading: FC<HeadingProps> = forwardRef<HTMLHeadingElement, HeadingProps>(
	({ className, children, size, ...props }, ref) => {
		return (
			<h1 className={cn(headingVariants({ size, className }))} ref={ref} {...props}>
				{children}
			</h1>
		);
	}
);

Heading.displayName = 'Heading';
export default Heading;
