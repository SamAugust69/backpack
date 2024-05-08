import { AnimatePresence, motion } from 'framer-motion';

const Fade = ({ children, className, ...props }: any) => {
	return (
		<AnimatePresence>
			<motion.section
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className={className}
				{...props}
			>
				{children}
			</motion.section>
		</AnimatePresence>
	);
};

export default Fade;
