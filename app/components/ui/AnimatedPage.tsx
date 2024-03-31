import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

const animations = {
	inital: { x: 1000, opacity: 0 },
	animate: { x: 0, opacity: 1 },
	exit: { x: -1000, opacity: 0 },
};

const AnimatedPage = ({ children }: any) => {
	return (
		<motion.div variants={animations} initial="inital" animate="animate" exit="exit">
			{children}
		</motion.div>
	);
};

export default AnimatedPage;
