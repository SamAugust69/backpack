'use client';
import { Button } from '@/ui/Button';
import useMultiForm from '@/lib/useMultiForm';
import Paragraph from '@/ui/Paragraph';
import { Container } from '@/ui/Container';
import FormInput from '@/ui/Input';
import Err from '@/ui/Err';
import fetchData from '@/lib/apiCall';
import { useRef, useState } from 'react';

type eventType = {
	city: string;
	country: string;
	district: {
		abbreviation: string;
		display_name: string;
		key: string;
		year: number;
	};
	end_date: string;
	event_code: string;
	event_type: number;
	key: string;
	week: number;
	name: string;
	start_date: string;
	year: number;
};

const NewEvent = ({ reducer, setCreatingLog }: any) => {
	const { errContainer, showErr } = Err();
	const [events, setEvents] = useState<Array<any>>([]);
	const [selectedEvent, setSelectedEvent] = useState<eventType | any>();
	const [searchingForEvents, setSearchingForEvents] = useState(false);

	const teamInput = useRef<HTMLInputElement>(null);
	const yearInput = useRef<null | HTMLInputElement>(null);

	const searchEvents = async (team: number, year: number) => {
		if (team < 1 || year < 1992) {
			showErr('Invalid Input', 'Check your uhh things...', 3);
			return;
		}

		setSearchingForEvents(true);
		let eventKeys = await fetchData({
			url: `https://www.thebluealliance.com/api/v3/team/frc${team}/events/${year}/keys`,
			onErr: () => showErr('Search Failed', 'Check your internet connection', 5),
		}).then((res: Array<string>) => {
			return res;
		});

		let events: Array<any> = [];

		eventKeys != undefined
			? await Promise.all(
					eventKeys.map(async (key) => {
						let event = await fetchData({
							url: `https://www.thebluealliance.com/api/v3/event/${key}`,
						});
						events = [...events, event];
					})
			  )
			: showErr('Search Failed', "Couldn't Find Anybody... sorry", 5);
		setEvents(events);

		setSearchingForEvents(false);
	};

	const createNewEvent = () => {
		const { event_code, name, event_type, week, year } = selectedEvent;

		const newEvent = {
			name,
			event_code,
			event_type,
			week,
			year,
			logs: [],
		};

		reducer({ type: 'ADDED_EVENT', payload: newEvent });
	};

	let { currentStep, currentStepNumber, backwards, forwards, goToStep, isLastStep, length } = useMultiForm([
		<div key={0} className="flex flex-col gap-2">
			<Button className="flex flex-col" size={'xl'} variant={'secondary'} onClick={() => forwards()}>
				<Paragraph className="m-0 text-g-950 flex px-4" size={'sm'}>
					Create Manually
				</Paragraph>
				<Paragraph className="m-0 text-g-700 flex px-4" size={'xs'}>
					Start Fresh
				</Paragraph>
			</Button>
			<div className="relative flex">
				<Button className="flex flex-col" size={'xl'} variant={'secondary'} onClick={() => console.log('ah')}>
					<Paragraph className="m-0 text-g-950 flex px-4" size={'sm'}>
						Import Event
					</Paragraph>
					<Paragraph className={`m-0 text-g-700 flex px-4`} size={'xs'}>
						Import event from JSON
					</Paragraph>
				</Button>
				<Button
					variant={'hidden'}
					className="absolute self-center right-4"
					onClick={() => console.log('aha')}
					tooltip={'Need Some Help?'}
				>
					?
				</Button>
			</div>
			<Button variant={'link'} onClick={() => setCreatingLog(false)}>
				Go Back
			</Button>
		</div>,
		<div key={1}>
			<Container>
				<div className="flex justify-between p-4 bg-neutral-900/75 rounded-t-md">
					<Paragraph size={'sm'}>Event Searcher</Paragraph>
					<Paragraph size={'sm'} className="underline">
						Requires Internet
					</Paragraph>
				</div>
				<div className="p-4 flex justify-between gap-2">
					<Button
						variant={'border'}
						loading={searchingForEvents}
						size={'md'}
						onClick={() =>
							searchEvents(
								teamInput.current?.value ? parseInt(teamInput.current?.value) : -1,
								yearInput.current?.value ? parseInt(yearInput.current?.value) : -1
							)
						}
					>
						Search
					</Button>
					<div className="flex gap-2">
						<FormInput type="number" ref={teamInput} title="Team" value={0}></FormInput>
						<FormInput type="number" ref={yearInput} title="Year" value={new Date().getFullYear()}></FormInput>
					</div>
				</div>
				<div className={`flex flex-col gap-4 ${events?.length > 0 ? 'p-4' : ''}`}>
					{events?.map((event, i) => {
						return (
							<Button key={i} size={'xl'} variant={'secondary'} onClick={() => setSelectedEvent(event)}>
								{event.name}
							</Button>
						);
					})}
				</div>
			</Container>
			<Container variant={'none'} className="flex gap-4 m-8 justify-center">
				<FormInput
					title="Event Name"
					type="text"
					value={selectedEvent?.name ? selectedEvent?.name : ''}
					onChange={(e: any) => setSelectedEvent({ ...selectedEvent, name: e.target.value })}
				/>
				<FormInput
					title="Event Code"
					type="text"
					value={selectedEvent?.event_code ? selectedEvent.event_code : ''}
					onChange={(e: any) => setSelectedEvent({ ...selectedEvent, event_code: e.target.value })}
				/>
				<FormInput
					title="Year"
					type="number"
					value={selectedEvent?.year ? selectedEvent.year : 0}
					onChange={(e: any) => setSelectedEvent({ ...selectedEvent, year: e.target.value })}
				/>
				<FormInput
					title="Week"
					type="number"
					value={selectedEvent?.week ? selectedEvent.week : 0}
					onChange={(e: any) => setSelectedEvent({ ...selectedEvent, week: e.target.value })}
				/>
			</Container>
			<Container variant={'none'} className="flex justify-between">
				<Button variant={'link'} onClick={() => backwards()}>
					Go Back
				</Button>
				<Button variant={'silly'} onClick={() => createNewEvent()}>
					Create Event
				</Button>
			</Container>
		</div>,
	]);

	return (
		<>
			{errContainer}
			{currentStep}
		</>
	);
};

export { NewEvent };
