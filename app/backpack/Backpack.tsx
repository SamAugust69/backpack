'use client';
import { Container } from '@/components/ui/Container';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import AnimatedPage from '@/ui/AnimatedPage';
import { useState } from 'react';
import { EventDataType } from '@/lib/formTypes';
import { Dot } from 'lucide-react';
import { Button } from '@/ui/Button';
import { Log } from '@/components/Log';
import { Form } from '../components/Form';

interface BackpackProps {
	event: EventDataType;
	setSelectedEvent: Function;
}

const Backpack = ({ event, setSelectedEvent }: BackpackProps) => {
	const [eventInfo, setEventInfo] = useState<EventDataType>(event);
	const [formOpen, setFormOpen] = useState(true);

	return (
		<>
			<Form modalState={formOpen} closeModal={setFormOpen} />
			<Container key={1} className="w-full max-w-4xl my-16 mx-2 ">
				<Container className="bg-neutral-900/75 p-4 rounded-t-md px-6 flex justify-between items-center" variant={'none'}>
					<div>
						<Heading size={'uberSmall'} className="text-r-500">
							{eventInfo.name}
						</Heading>
						<Paragraph className="m-0 inline-flex items-center text-neutral-400" size={'sm'}>
							Week {eventInfo.week} <Dot /> {eventInfo.year}
						</Paragraph>
					</div>
					<Button variant={'link'} onClick={() => setSelectedEvent(false)}>
						Back
					</Button>
				</Container>
				<AnimatedPage variant={'none'} className="rounded-b-md p-4 flex flex-col gap-2">
					<Container className=" bg-neutral-900/50">
						<div className="flex items-center justify-between p-4 bg-neutral-900/75 rounded-t-md">
							<Paragraph size={'sm'} className="inline-flex items-center text-neutral-400">
								{'search bar here'}
							</Paragraph>
							<div className="flex gap-2">
								<Button size={'default'}>Team</Button>
								<Button size={'default'}>Match</Button>
							</div>
						</div>
						<div className="p-4">
							<div className="flex flex-col gap-4">
								<div className="flex gap-4 justify-between">
									<Button size={'md'} variant={'silly'} onClick={() => setFormOpen(true)}>
										New Log
									</Button>
									<Button size={'md'} variant={'default'}>
										Import / Export Logs
									</Button>
								</div>
								{eventInfo.logs.map((log, i) => {
									return <Log key={i} eventLogs={log} />;
								})}
							</div>
						</div>
					</Container>
				</AnimatedPage>
			</Container>
		</>
	);
};

export { Backpack };
