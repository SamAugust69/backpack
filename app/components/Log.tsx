import { ChevronUp } from 'lucide-react';
import { Container } from '@/ui/Container';
import Paragraph from '@/ui/Paragraph';
import { Button } from '@/ui/Button';
import { useState } from 'react';
import AnimatedPage from '@/ui/AnimatedPage';
import { LogType } from '@/lib/formTypes';
import { Form } from './Form';

interface LogProps {
	eventData: LogType;
}

const Log = ({ eventData }: LogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const toDisplay: Array<any> = [
		{
			title: 'Auto Summary',
			display: [
				{
					'Left Starting Zone': ['number', eventData.auto.leftStartingZone, 2],
				},
				{
					"Speaker Note's Scored": ['number', eventData.auto.speakerScore, 5],
					"Amp Note's Scored": ['number', eventData.auto.ampScore, 2],
				},
			],
		},
		{
			title: 'Teleop Summary',
			display: [
				{
					"Amp Note's Scored": ['number', eventData.teleop.ampScore, 1],
				},
				{
					'Speaker Score': ['number', eventData.teleop.speakerScore, 2],
					'Amplified Speaker Score': ['number', eventData.teleop.amplifiedSpeakerScore, 5],
				},
				{
					Hung: ['boolean', eventData.teleop.hangOnChain, 'Did Not Hang', 3],
					Harmonize: ['boolean', eventData.teleop.hangInHarmony, 'No Harmony', 2],
					'Scored Trap': ['number', eventData.teleop.trapScore, 5],
				},
			],
		},
	];

	return (
		<Container className="flex flex-col">
			<div className="flex gap-4 justify-between items-center p-3">
				<div className="flex gap-4">
					<Paragraph size={'sm'} className="text-neutral-400 font-medium">
						Match <span className="text-r-500 mx-1">{eventData.match}</span>
					</Paragraph>
					<Paragraph size={'sm'} className="text-neutral-400 font-medium">
						Team <span className="text-r-500 mx-1">{eventData.team}</span>
					</Paragraph>
				</div>
				<Button onClick={() => setOpen(!open)}>
					<ChevronUp className={`w-4 font-medium ${open ? 'rotate-180' : ''} transition-transform duration-100`} />
				</Button>
			</div>
			{open ? (
				<Container variant={'none'} className="p-2 border-t border-neutral-700 rounded-b-md flex gap-2">
					{toDisplay.map((val, i) => {
						return (
							<Container key={i} className="">
								<div className="py-3 px-4 bg-neutral-900/30 rounded-t-md border-b border-neutral-600 min-w-[16rem] font-semibold">
									{val.title}
								</div>
								<div className="p-4"></div>
							</Container>
						);
					})}
				</Container>
			) : null}
		</Container>
	);
};

export { Log };
