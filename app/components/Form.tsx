import { useState } from 'react';
import Modal from './ui/Modal';
import { Container } from './ui/Container';
import Paragraph from './ui/Paragraph';
import { Button } from './ui/Button';
import Heading from './ui/Heading';
import { Dot } from 'lucide-react';

const Form = () => {
	const [open, setOpen] = useState(true);

	const MultiFormSteps = ['Beginning', 'Auto', 'Teleop', 'Notes'];

	return (
		<Modal
			open={open}
			setOpen={setOpen}
			className="h-full w-full p-4 flex md:flex-row flex-col gap-4 max-w-4xl md:h-5/6  bg-neutral-900/75"
		>
			<Container className="p-10 flex md:flex-col items-center md:justify-normal justify-center gap-4">
				{MultiFormSteps.map((step, i) => {
					return (
						<div key={i} className="flex md:gap-3 items-center cursor-pointer">
							<div className="w-11 h-11 flex items-center justify-center bg-neutral-500 rounded-full border border-neutral-400 hover:bg-neutral-600 transition-colors duration-100">
								{i + 1}
							</div>
							<div className="hidden flex-col justify-center md:flex md:w-36">
								<Paragraph size={'xs'} className="text-neutral-400">
									Step {i + 1}
								</Paragraph>
								<Paragraph size={'sm'} className="text-neutral-300">
									{step}
								</Paragraph>
							</div>
						</div>
					);
				})}
				<Button variant={'link'} size={'sm'} className="absolute bottom-2">
					Back
				</Button>
			</Container>
			<div className="flex flex-col w-full h-full gap-4">
				<Container className="p-4 h-full flex flex-col justify-between">
					<div>
						<Paragraph className="font-bold flex m-0">Team Info</Paragraph>
						<Paragraph size={'sm'} className="font-bold flex m-0">
							Match 1 <Dot /> Team 155
						</Paragraph>
					</div>
					<div className="flex justify-between md:hidden">
						<Button variant={'link'}>Go Back</Button>
						<Button>Next</Button>
					</div>
				</Container>
				<Container className="p-4 md:flex justify-between hidden">
					<Button variant={'link'} size={'lg'}>
						Go Back
					</Button>
					<Button>Next</Button>
				</Container>
			</div>
		</Modal>
	);
};

export { Form };
