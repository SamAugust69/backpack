import { cn } from '@/app/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const InOut = ({ children, width, className, ...props }: any) => {
	return (
		<AnimatePresence mode="popLayout">
			<motion.div
				key={children.key}
				transition={{ ease: 'easeInOut', x: { duration: 0.25 }, duration: 0.35 }}
				initial={{ x: -width * 2, opacity: 0.5 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: -width, opacity: 0.5 }}
				className={cn('', className)}
				{...props}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default InOut;
