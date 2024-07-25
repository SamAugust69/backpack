import { ChevronUp, Edit, Edit2 } from 'lucide-react';
import { Container } from '@/ui/Container';
import Paragraph from '@/ui/Paragraph';
import { Button } from '@/ui/Button';
import { useState } from 'react';
import AnimatedPage from '@/ui/AnimatedPage';
import { AveragesType, LogType } from '@/lib/formTypes';
import { Form } from './Form';
import useMeasure from 'react-use-measure';

interface LogProps {
	logData: LogType | null;
	autoScore: number;
	teleopScore: number;
	averageScore: AveragesType;
	editLog: Function;
}

const toDisplaySwitcher = (toDisplay: any, i: number) => {
	const type = toDisplay[1][0];

	switch (type) {
		case 'number':
			var prop1 = toDisplay[1][1];
			var prop2 = prop1 * toDisplay[1][2];

			return (
				<div key={i} className="flex justify-between font-medium text-b-100 items-center gap-2">
					<Paragraph size={'sm'} className="flex gap-2">
						<span className={` text-r-100`}>{prop1}</span>
						{toDisplay[0]}
					</Paragraph>
					<Paragraph size={'sm'}>{prop2 > 0 ? '+ ' + prop2 + 'pt' : null}</Paragraph>
				</div>
			);
		case 'boolean':
			var prop1 = toDisplay[1][1];
			console.log(toDisplay[0], prop1, toDisplay[1][3]);
			return (
				<div key={i} className="flex justify-between font-medium text-b-100 items-center">
					<Paragraph size={'sm'} className="">
						{prop1 ? toDisplay[0] : toDisplay[1][2]}
					</Paragraph>
					<Paragraph size={'sm'}>{prop1 == true ? '+ ' + toDisplay[1][3] + 'pt' : null}</Paragraph>
				</div>
			);
		default:
			var prop1 = toDisplay[1][1];
			var prop2 = prop1 * toDisplay[1][2];

			return (
				<div key={i} className="flex justify-between font-medium text-b-100 items-center gap-2">
					<Paragraph size={'sm'} className="flex gap-2">
						<span className={` text-r-100`}>{prop1}</span>
						{toDisplay[0]}
					</Paragraph>
					<Paragraph size={'sm'}>{prop2 > 0 ? '+ ' + prop2 + 'pt' : null}</Paragraph>
				</div>
			);
	}
};

const Log = ({ logData, autoScore, teleopScore, averageScore, editLog }: LogProps) => {
	const [open, setOpen] = useState<boolean>(false);

	if (logData == null) return <div>Problem..</div>;

	const toDisplay: Array<any> = [
		{
			title: 'Auto Summary',
			display: [
				{
					'Left Starting Zone': ['boolean', logData.auto.leftStartingZone, 'Stayed In Zone', 2],
				},
				{
					"Speaker Note's Scored": ['number', logData.auto.speakerScore, 5],
					"Amp Note's Scored": ['number', logData.auto.ampScore, 2],
				},
			],
		},
		{
			title: 'Teleop Summary',
			display: [
				{
					"Amp Note's Scored": ['number', logData.teleop.ampScore, 1],
				},
				{
					'Speaker Score': ['number', logData.teleop.speakerScore, 2],
					'Amplified Speaker Score': ['number', logData.teleop.amplifiedSpeakerScore, 5],
				},
				{
					Hung: ['boolean', logData.teleop.hangOnChain, 'Did Not Hang', 3],
					Harmonize: ['boolean', logData.teleop.hangInHarmony, 'No Harmony', 2],
					'Scored In Trap': ['number', logData.teleop.trapScore, 5],
				},
			],
		},
	];
	const [ref, { width }] = useMeasure();

	return (
		<Container className="flex flex-col">
			<div className="flex gap-4 justify-between items-center p-3">
				<div className="flex gap-4">
					<Paragraph size={'sm'} className="text-neutral-400 font-medium">
						Match <span className="text-r-500 mx-1">{logData.match}</span>
					</Paragraph>
					<Paragraph size={'sm'} className="text-neutral-400 font-medium">
						Team <span className="text-r-500 mx-1">{logData.team}</span>
					</Paragraph>
				</div>
				<div className="flex gap-2">
					<Button onClick={() => editLog(logData)}>
						<Edit2 className="w-4" />
					</Button>
					<Button onClick={() => setOpen(!open)}>
						<ChevronUp className={`w-4 font-medium ${open ? 'rotate-180' : ''} transition-transform duration-100`} />
					</Button>
				</div>
			</div>
			{open ? (
				<Container
					variant={'none'}
					className="p-2 border-t border-neutral-700 rounded-b-md flex gap-2 flex-wrap justify-center"
				>
					{toDisplay.map((val, i) => {
						return (
							<Container key={i} className="">
								<div className="py-3 px-4 bg-neutral-900/30 rounded-t-md border-b border-neutral-600 min-w-[16rem] font-semibold">
									{val.title}
								</div>
								<div className="p-4 flex flex-col gap-2">
									{val.display.map((display: any, i: number) => {
										return (
											<div key={i} className="">
												{Object.entries(display).map((toDisplay: any, i: number) => {
													return toDisplaySwitcher(toDisplay, i);
												})}
											</div>
										);
									})}
								</div>
							</Container>
						);
					})}
					<Container>
						<div className="py-3 px-4 bg-neutral-900/30 rounded-t-md border-b border-neutral-600 min-w-[16rem] font-semibold">
							test
						</div>
						<div className="p-4 flex flex-col gap-2">
							<Paragraph size={'sm'}>Auto Score: {autoScore}</Paragraph>
							<Paragraph size={'sm'}>Teleop Score: {teleopScore}</Paragraph>
							<Paragraph size={'sm'}>Total Score: {autoScore + teleopScore}</Paragraph>
						</div>
						<div className="p-4">{logData.notes}</div>
					</Container>
				</Container>
			) : null}
		</Container>
	);
};

export { Log };
