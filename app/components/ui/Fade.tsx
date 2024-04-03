import { motion } from 'framer-motion';

const Fade = ({ children, ...props }: any) => {
	return (
		<motion.div key={children} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} {...props}>
			{children}
		</motion.div>
	);
};

export default Fade;
