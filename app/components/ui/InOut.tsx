import { motion } from 'framer-motion';
import useMeasure from 'react-use-measure';

const InOut = ({ children, width, ...props }: any) => {
	return (
		<motion.div
			key={children}
			transition={{ ease: 'easeInOut', duration: 0.25 }}
			initial={{ x: -width }}
			animate={{ x: 0 }}
			exit={{ x: width }}
			{...props}
		>
			{children}
		</motion.div>
	);
};

export default InOut;
