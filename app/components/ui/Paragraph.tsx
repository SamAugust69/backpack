import { forwardRef, HTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const paragraphVarients = cva('max-w-prose text-t-100', {
	variants: {
		size: {
			default: 'text-base sm:text-lg font-normal mb-2',
			sm: 'text-sm, sm:text-base',
			xs: 'text-xs, sm:text-sm',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVarients> {}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(({ className, size, children, ...props }, ref) => {
	return (
		<p ref={ref} className={cn(paragraphVarients({ size, className }))} {...props}>
			{children}
		</p>
	);
});

Paragraph.displayName = 'Paragraph';
export default Paragraph;
