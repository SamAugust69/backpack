import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, FC, Ref, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export const buttonVariants = cva(
	'rounded focus:ring-2 disabled:pointer-events-none inline-flex items-center justify-center text-sm font-medium',
	{
		variants: {
			variant: {
				default: 'bg-b-100 text-t-100',
				link: 'bg-transparent underline-offset-4 hover:underline text-slate-900 hover:bg-transparent',
				hidden: 'bg-transparent',
				options: "border-2 border-b-100 bg-t-200",
				unstyled: '',
			},
			size: {
				default: 'h-9 py-2.5 px-4',
				lg: 'h-12 mx-2 px-2 md:px-3',
				sm: 'h-8 p-2',
				xs: 'h-6 p-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	isLoading?: boolean;
}

const Button: FC<ButtonProps> = (
	({ className, children, variant, isLoading, size, ...props }) => {
		return (
			<button className={cn(buttonVariants({ variant, size, className }))} disabled={isLoading} type={"button"} {...props}>
				{isLoading ? <Loader2 className="animate-spin p-1" /> : null}
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';

export { Button };
