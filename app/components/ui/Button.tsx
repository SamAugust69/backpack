import { cn } from '@/app/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import { HTMLAttributes, forwardRef } from 'react';

const buttonVariants = cva(
	'rounded-md inline-flex items-center justify-center font-medium text-neutral-400 hover:text-neutral-300 transition-colors duration-100',
	{
		variants: {
			variant: {
				default: 'bg-neutral-700 hover:bg-neutral-600',
				secondary: 'bg-neutral-900/50 hover:bg-neutral-900 w-full',
				border: 'bg-neutral-700 hover:bg-neutral-600 border border-neutral-600 border',
				silly: 'bg-r-700 hover:bg-r-800',
				link: 'underline',
				none: '',
				hidden: 'hover:underline',
			},
			size: {
				xl: 'p-4',
				lg: 'text-lg px-4 py-1',
				md: 'text-md px-4 h-10',
				default: 'text-md px-4 py-1',
				sm: 'text-sm px-3 py-1',
			},
		},

		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	loading?: boolean;
	tooltip?: String;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, children, loading, onClick, tooltip, ...props }) => {
		const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.stopPropagation();
			if (onClick) onClick(e);
		};

		return (
			<button
				className={`${cn(buttonVariants({ variant, size }), className, tooltip ? 'group' : '')}`}
				onClick={handleClick}
				{...props}
			>
				{loading ? <LoaderCircle className="w-4 mx-1 animate-spin" /> : null}
				{tooltip ? (
					<span className="bg-neutral-950/75 px-2 hidden rounded-l-md relative -left-3 text-sm group-hover:block leading-6 font-semibold text-neutral-300 after:absolute after:border-y-[12px] after:border-r-8 after:border-y-transparent after:-right-2 after:rotate-180 after:border-neutral-950/75">
						{tooltip}
					</span>
				) : null}
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';
export { Button };
