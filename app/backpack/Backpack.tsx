'use client';
import { Container } from '@/components/ui/Container';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import AnimatedPage from '@/ui/AnimatedPage';
import { useEffect, useState } from 'react';
import { EventDataType, initialValues } from '@/lib/formTypes';
import { Dot } from 'lucide-react';
import { Button } from '@/ui/Button';
import { Log } from '@/components/Log';
import { Form } from '../components/Form';

interface BackpackProps {
	event: EventDataType;
	setSelectedEvent: Function;
	dispatch: Function;
}

const Backpack = ({ event, setSelectedEvent, dispatch }: BackpackProps) => {
	const [eventInfo, setEventInfo] = useState<EventDataType>(event);

	const [currentLog, setCurrentLog] = useState(initialValues);
	const [formOpen, setFormOpen] = useState(false);

	useEffect(() => {
		setEventInfo(event);
	}, [event]);

	return (
		<>
			<Form eventInfo={event} dispatch={dispatch} modalState={formOpen} closeModal={setFormOpen} formValues={currentLog} />
			<Container key={1} className={`w-full max-w-4xl my-16 mx-2 ${formOpen ? 'overflow-hidden select-none' : ''} `}>
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
				<AnimatedPage variant={'none'} className="rounded-b-md p-4 flex flex-col gap-4">
					<Container className=" bg-neutral-900/50">
						<div className="flex items-center justify-between p-4 bg-neutral-900/75 rounded-t-md">
							<Paragraph size={'sm'} className="inline-flex items-center text-neutral-300">
								Your Logs
							</Paragraph>
							<div className="flex gap-2">
								<Button size={'default'}>Team</Button>
								<Button size={'default'}>Match</Button>
							</div>
						</div>
						<div className="p-4">
							<div className="flex flex-col gap-5">
								<div className="flex gap-4 justify-between">
									<Button size={'md'} variant={'silly'} onClick={() => setFormOpen(true)}>
										New Log
									</Button>
									<Button size={'md'} variant={'default'}>
										Import / Export Logs
									</Button>
								</div>
								{eventInfo.logs.map((log, i) => {
									return <Log key={i} eventData={log} />;
								})}
							</div>
						</div>
					</Container>
					<Container className=" bg-neutral-900/50">
						<div className="flex items-center justify-between p-4 bg-neutral-900/75 rounded-t-md">
							<Paragraph size={'sm'} className="inline-flex items-center text-neutral-300">
								Match Selecter
							</Paragraph>
						</div>
						<div className="p-2"></div>
					</Container>
				</AnimatedPage>
			</Container>
		</>
	);
};

export { Backpack };
