import { AnimatePresence, motion } from 'framer-motion';

const Fade = ({ children, ...props }: any) => {
	return (
		<AnimatePresence>
			<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} {...props}>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default Fade;
