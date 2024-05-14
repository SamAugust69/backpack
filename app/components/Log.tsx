import { ChevronUp } from 'lucide-react';
import { Container } from '@/ui/Container';
import Paragraph from '@/ui/Paragraph';
import { Button } from '@/ui/Button';
import { useState } from 'react';
import AnimatedPage from './ui/AnimatedPage';

const Log = () => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<Container className="flex flex-col">
			<div className="flex gap-4 justify-between items-center p-3">
				<div className="flex gap-4">
					<Paragraph size={'sm'} className="text-neutral-400 font-medium">
						Match <span className="text-r-500 mx-1">0</span>
					</Paragraph>
					<Paragraph size={'sm'} className="text-neutral-400 font-medium">
						Team <span className="text-r-500 mx-1">0</span>
					</Paragraph>
				</div>
				<Button onClick={() => setOpen(!open)}>
					<ChevronUp className={`w-4 font-medium ${open ? 'rotate-180' : ''} transition-transform duration-100`} />
				</Button>
			</div>
			{open ? (
				<Container variant={'none'} className="p-2 border-t border-neutral-700 rounded-b-md">
					hello
				</Container>
			) : null}
		</Container>
	);
};

export { Log };
