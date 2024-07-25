'use client';

import { X } from 'lucide-react';
import { Container } from '../components/ui/Container';
import Heading from '../components/ui/Heading';
import Modal from '../components/ui/Modal';
import Paragraph from '../components/ui/Paragraph';
import { Button } from '../components/ui/Button';

const Settings = () => {
	return (
		<Modal open={false} className="h-full w-full flex flex-col max-w-3xl md:h-4/6 bg-neutral-800">
			<div className="p-4 bg-neutral-900/75 rounded-t-md flex justify-between">
				<Paragraph size={'sm'}>Settings</Paragraph>
				<Button variant={'hidden'} size={'none'}>
					<X className="w-5" />
				</Button>
			</div>
		</Modal>
	);
};
export { Settings };
