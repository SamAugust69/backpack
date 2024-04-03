import { MotionConfig, motion } from 'framer-motion';
import React, { ReactNode, useState } from 'react';
import useMeasure from 'react-use-measure';

const AnimatedPage = ({ children, ...props }: any) => {
	const [ref, { height }] = useMeasure();

	const animations = {
		inital: { x: 1000, opacity: 0, height: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: -1000, opacity: 0 },
	};

	return (
		<motion.div animate={{ height }} className="overflow-hidden">
			<div ref={ref} {...props}>
				{children}
			</div>
		</motion.div>
	);
};

export default AnimatedPage;
