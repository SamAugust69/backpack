import { ChevronUp } from 'lucide-react';
import { Container } from '@/ui/Container';
import Paragraph from '@/ui/Paragraph';
import { Button } from '@/ui/Button';
import { useState } from 'react';
import AnimatedPage from '@/ui/AnimatedPage';
import { LogType } from '@/lib/formTypes';
import { Form } from './Form';

interface LogProps {
	eventLogs: LogType;
}

const Log = ({ eventLogs }: LogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	const toDisplay: Array<any> = [
		{
			title: 'Auto Summary',
			display: [
				{
					'Left Starting Zone': ['number', eventLogs.auto.leftStartingZone, 2],
				},
				{
					"Speaker Note's Scored": ['number', eventLogs.auto.speakerScore, 5],
					"Amp Note's Scored": ['number', eventLogs.auto.ampScore, 2],
				},
			],
		},
		{
			title: 'Teleop Summary',
			display: [
				{
					"Amp Note's Scored": ['number', eventLogs.teleop.ampScore, 1],
				},
				{
					'Speaker Score': ['number', eventLogs.teleop.speakerScore, 2],
					'Amplified Speaker Score': ['number', eventLogs.teleop.amplifiedSpeakerScore, 5],
				},
				{
					Hung: ['boolean', eventLogs.teleop.hangOnChain, 'Did Not Hang', 3],
					Harmonize: ['boolean', eventLogs.teleop.hangInHarmony, 'No Harmony', 2],
					'Scored Trap': ['number', eventLogs.teleop.trapScore, 5],
				},
			],
		},
	];

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
				<Container variant={'none'} className="p-2 border-t border-neutral-700 rounded-b-md flex gap-2">
					<Container className="bg-neutral-800">
						<div className="p-3">Auto</div>
						{toDisplay.map((val, i) => {
							return JSON.stringify(val);
						})}
					</Container>
				</Container>
			) : null}
		</Container>
	);
};

export { Log };
