import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';

const animations = {
	inital: { x: 100 },
	animate: { x: 0 },
	exit: { x: -100 },
};

const AnimatedPage = ({ children }: any) => {
	return (
		<motion.div variants={animations} initial="inital" animate="animate" exit="exit">
			{children}
		</motion.div>
	);
};

export default AnimatedPage;
