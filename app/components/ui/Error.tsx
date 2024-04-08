'use client';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { Button } from './Button';
import Paragraph from './Paragraph';
import { FaFaceDizzy } from 'react-icons/fa6';
import useMeasure from 'react-use-measure';

const Error = () => {
	const [ref, { width }] = useMeasure();

	const [message, setMessage] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [time, setTime] = useState(5);
	const [hasError, setHasError] = useState<boolean>(false);

	const showErr = async (message: string, desc: string, timeout: number) => {
		setTime(timeout);
		setMessage(message);
		setDescription(desc);
		setHasError(true);
		setTimeout(() => {
			setHasError(false);
		}, timeout * 1000);
	};

	<motion.div
		initial={{ x: -400 }}
		animate={{ x: 0 }}
		exit={{ x: -400 }}
		className="bg-t-300 border-[3px] border-r-600 w-96 rounded m-2 border-out absolute bottom-0 left-0 flex flex-col p-4 gap-2"
	>
		<div className="flex gap-4">
			<FaFaceDizzy className="p-3 w-12 h-12 font-bold rounded-md bg-r-600 text-r-100" />
			<div>
				<Paragraph className="m-0 text-g-950" size={'sm'}>
					{message}
				</Paragraph>
				<Paragraph className="m-0 text-g-500" size={'xs'}>
					{description}
				</Paragraph>
			</div>
		</div>
		<div ref={ref} className="bg-t-200 rounded h-1 flex justify-between items-center relative">
			<motion.div
				transition={{ duration: time, ease: 'linear' }}
				className="h-full bg-r-600 rounded"
				initial={{ width: 0 }}
				animate={{ width }}
			></motion.div>
		</div>
	</motion.div>;
	const errContainer = hasError ? (
		<motion.div
			initial={{ x: -400 }}
			animate={{ x: 0 }}
			exit={{ x: -400 }}
			className="bg-t-300 border-[3px] border-r-600 w-96 rounded m-2 border-out absolute bottom-0 left-0 flex flex-col p-4 gap-2"
		>
			<div className="flex gap-4">
				<FaFaceDizzy className="p-3 w-12 h-12 font-bold rounded-md bg-r-600 text-r-100" />
				<div>
					<Paragraph className="m-0 text-g-950" size={'sm'}>
						{message}
					</Paragraph>
					<Paragraph className="m-0 text-g-500" size={'xs'}>
						{description}
					</Paragraph>
				</div>
			</div>
			<div ref={ref} className="bg-t-200 rounded h-1 flex justify-between items-center relative">
				<motion.div
					transition={{ duration: time, ease: 'linear' }}
					className="h-full bg-r-600 rounded"
					initial={{ width: 0 }}
					animate={{ width }}
				></motion.div>
			</div>
		</motion.div>
	) : null;

	return { errContainer, showErr };
};

export default Error;
