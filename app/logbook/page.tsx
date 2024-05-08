'use client';
import { Plus } from 'lucide-react';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import '../globals.css';
import { Button } from '../components/ui/Button';
import { LuImport } from 'react-icons/lu';
import useMultiForm from '../lib/useMultiForm';
import { useEffect, useRef, useState } from 'react';
import Fade from '../components/ui/Fade';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import FormInput from '../components/ui/FormInput';
import AnimatedPage from '../components/ui/AnimatedPage';
import Err from '../components/ui/Err';
import fetchData from '../lib/apiCall';
import InOut from '../components/ui/InOut';

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
	name: string;
	start_date: string;
	year: number;
};

const Test = () => {
	const teamInput = useRef<HTMLInputElement>(null);
	const yearInput = useRef<null | HTMLInputElement>(null);
	const [events, setEvents] = useState<Array<any>>([]);
	const [searching, setSearching] = useState(false);
	const [eventData, setEventData] = useState<eventType>();

	const { errContainer, showErr } = Err();

	const searchEvents = async (team: number, year: number) => {
		if (team == -1 || year == -1) {
			showErr('Invalid Input', 'Check your uhh things...', 5);
			return;
		}
		setSearching(true);
		let eventKeys = await fetchData({
			url: `https://www.thebluealliance.com/api/v3/team/frc${team}/events/${year}/keys`,
			onErr: () => showErr('Search Failed', 'Check your internet connection', 5),
		}).then((res: Array<string>) => {
			setSearching(false);
			return res;
		});

		let events: Array<any> = [];
		await Promise.all(
			eventKeys.map(async (key) => {
				let event = await fetchData({ url: `https://www.thebluealliance.com/api/v3/event/${key}` });
				events = [...events, event];
			})
		);
		setEvents(events);
	};

	return (
		<Fade key={1} className={'py-2 flex flex-col gap-4 h-full items-center overflow-scroll'}>
			{errContainer}
			<div className="w-full">
				<Heading size={'sm'} className="text-r-600">
					Welcome
				</Heading>
				<Paragraph className="text-g-700">Get Started- Select an Event</Paragraph>
			</div>
			<div className="max-w-xl">
				<Paragraph
					size={'sm'}
					className="px-4 text-g-950 bg-t-500 py-1 rounded-t-md flex items-center justify-between font-bold"
				>
					Event Searcher <span className="text-r-900 text-xs underline">Requires Internet</span>
				</Paragraph>

				<AnimatedPage className={'bg-t-300 rounded-b-md p-2'}>
					<div className="flex gap-2 p-2 bg-t-400 rounded-md">
						<Button
							size={'md'}
							className="text-t-400"
							isLoading={searching}
							onClick={() =>
								searchEvents(
									teamInput.current?.value ? parseInt(teamInput.current?.value) : -1,
									yearInput.current?.value ? parseInt(yearInput.current?.value) : -1
								)
							}
						>
							Search
						</Button>
						<FormInput ref={teamInput} type="number" title="Team Number" value={155}></FormInput>
						<FormInput ref={yearInput} type="number" title="Year" value={2024}></FormInput>
					</div>
					{events.length > 0 ? (
						<div className="flex flex-col gap-1 mt-2">
							{events.map((event: any, i) => {
								let startDate = `${new Date(event.start_date).getMonth() + 1}-${new Date(event.start_date).getDay()}`;
								let endDate = `${new Date(event.end_date).getMonth() + 1}-${new Date(event.end_date).getDay()}`;

								return (
									<Button
										size={'lg'}
										key={i}
										onClick={() => {
											setEventData(event);
											console.log();
										}}
										className="bg-t-300 p-2 mx-2 border-2 border-t-950 rounded-md flex flex-col items-center"
									>
										<Paragraph size={'xs'}>
											{event.name} <span>{event.year}</span>
										</Paragraph>
										<Paragraph size={'xs'}>
											{startDate} {endDate}
										</Paragraph>
									</Button>
								);
							})}
						</div>
					) : null}
				</AnimatedPage>
			</div>
			<div className="flex gap-2 flex-wrap justify-center my-8">
				<FormInput type="text" title="Event Name" value={eventData?.name ?? ''} />
				<FormInput type="number" title="Year" value={new Date().getFullYear()} />
				<FormInput type="text" title="Event Code" value={eventData?.event_code ?? ''} />
			</div>
		</Fade>
	);
};

export default function Page() {
	const fileInput = useRef<HTMLInputElement>(null);
	const [draggingOver, setDraggingOver] = useState(false);

	//showErr('No Internet', 'You need internet to use this feature', 10)

	const handleFileChange = (event: any) => {
		const fileObj = event.target.files && event.target.files[0];
		if (!fileObj) {
			return;
		}

		//console.log('fileObj is', fileObj);

		event.target.value = null;
	};

	const { errContainer, showErr } = Err();

	let { currentStep, forwards, goToStep } = useMultiForm([
		<Fade key={0}>
			<div className="py-2">
				<Heading size={'sm'} className="text-r-600 text-left">
					Welcome
				</Heading>
				<Paragraph className="text-g-700">Get Started- Select an Event</Paragraph>
			</div>
			<div className="py-2 flex flex-col ">
				<Button
					size={'xl'}
					onClick={() => createNewEvent()}
					className="bg-t-300 rounded-md flex items-center justify-center border-2 border-g-700 hover:bg-t-300/75 transition-colors"
				>
					<Paragraph className="m-0 text-g-700 flex px-8 items-center" size={'xs'}>
						Create New Event
						<Plus className="ml-2 w-4 h-4 font-bold" />
					</Paragraph>
				</Button>
			</div>
		</Fade>,

		<Fade key={1} className="flex flex-col justify-between h-full">
			<div className="flex flex-col gap-4 py-4 overflow-scroll">
				<Button
					size={'xl'}
					className="bg-t-300 rounded-md flex border-2 justify-normal border-g-950 hover:bg-t-300/75 transition-colors h-20"
					onClick={() => goToStep(1)}
				>
					<Plus className="p-3 w-10 h-10 font-bold rounded-md bg-t-400 text-g-950" />
					<div className="flex flex-col justify-center">
						<Paragraph className="m-0 text-g-950 flex px-4" size={'sm'}>
							Create Manually
						</Paragraph>
						<Paragraph className="m-0 text-g-700 flex px-4" size={'xs'}>
							Start Fresh
						</Paragraph>
					</div>
				</Button>
				<input type="file" className="hidden" accept=".json" onChange={handleFileChange} ref={fileInput} />
				<Button
					size={'xl'}
					onClick={() => fileInput.current?.click()}
					className="bg-t-300 rounded-md flex justify-normal hover:bg-t-300/75 transition-colors h-16"
				>
					<LuImport className="p-3 w-10 h-10 font-bold rounded-md bg-t-400 text-t-950" />
					<div className="flex flex-col ">
						<Paragraph className="m-0 text-g-950 flex px-4" size={'sm'}>
							Import Event
						</Paragraph>
						<Paragraph
							className={`m-0 text-g-700 flex px-4 ${draggingOver ?? ''}`}
							size={'xs'}
							onDragOver={() => setDraggingOver(true)}
						>
							Import event from JSON
						</Paragraph>
					</div>
				</Button>
			</div>
			<div className="border-t-2 border-t-900 flex w-full justify-between py-2 items-center">
				<Button className=" border-t-900" variant={'link'} onClick={() => goToStep(0)}>
					Back
				</Button>
			</div>
		</Fade>,
		<div key={2} className={'py-2 flex flex-col gap-4 h-full justify-between items-center'}>
			<Test />
			<div className="border-t-2 border-t-900 flex w-full justify-between py-2 items-center">
				<Button className=" border-t-900" variant={'link'} onClick={() => goToStep(0)}>
					Back
				</Button>
				<Button className=" border-t-900" variant={'default'} onClick={() => goToStep(0)}>
					Submit
				</Button>
			</div>
		</div>,
	]);

	const [createEvent, setCreateEvent] = useState(false);
	const createNewEvent = () => {
		setCreateEvent(!createEvent);
	};

	return (
		<div className="gap-4 w-full flex justify-center h-[calc(100vh-48px)] sm:p-4 sm:border-none border-t-2 border-t-900">
			<AnimatePresence>
				{errContainer}
				<InOut className="bg-t-400 rounded-md py-4 px-8 flex flex-col w-full sm:min-w-[18rem] sm:w-full max-w-6xl sm:border-2 border-t-900 overflow-hidden">
					<MotionConfig transition={{ duration: 0.1 }}>
						<span className="bg-t-500 border-t-2 border-t-900 rounded-md w-full inline-block self-center my-2" />
						<div className="h-full overflow-scroll">
							<InOut width={20} className={'h-full'}>
								{currentStep}
							</InOut>
						</div>
					</MotionConfig>
				</InOut>

				{/* {createEvent ? (
					<InOut
						width={600}
						className="bg-t-400 rounded-md px-8 py-4 flex flex-col justify-center sm:max-w-[30rem] md:max-w-[34rem] h-full w-full"
					>
						<MotionConfig transition={{ duration: 0.25 }}>{currentStep}</MotionConfig>
					</InOut>
				) : null} */}
			</AnimatePresence>
		</div>
	);
}
