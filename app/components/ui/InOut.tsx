import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import useMeasure from 'react-use-measure';

const InOut = ({ children, width, className, ...props }: any) => {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={children.key}
				transition={{ ease: 'easeInOut', x: { duration: 0.25 }, duration: 0.35 }}
				initial={{ x: -width, opacity: 0.5 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: -width, opacity: 0.5 }}
				className={className}
				{...props}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default InOut;
