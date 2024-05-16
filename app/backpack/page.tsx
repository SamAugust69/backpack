'use client';
import { Button } from '@/ui/Button';
import { Container } from '@/components/ui/Container';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import AnimatedPage from '@/ui/AnimatedPage';
import { Plus } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import { NewEvent } from './NewEvent';
import { dataReducer } from '@/lib/saveLogReducer';
import { EventDataType } from '@/lib/formTypes';
import { Backpack } from './Backpack';
import useLocalStorage from '@rehooks/local-storage';
import InOut from '@/ui/InOut';

const scoutingTips = ['Scouting...', 'Data Monkey Labor ™', ''];

export default function Home() {
	const [creatingLog, setCreatingLog] = useState<boolean>(false);
	const [selectedEvent, setSelectedEvent] = useState<boolean>(false);
	const [eventData, setEventData] = useState<number>(0);

	const [pageLoaded, setPageLoaded] = useState(false);

	const [localData, setLocalData] = useLocalStorage<Array<EventDataType>>('local-data', []); // stores local match information from scout

	const [dataReducerState, reducer] = useReducer(dataReducer, localData);

	useEffect(() => {
		console.log('HELLO', dataReducerState);
		setLocalData(dataReducerState);
		setCreatingLog(false);
	}, [dataReducerState]);

	useEffect(() => {
		localData == undefined ?? setLocalData([]);
		setPageLoaded(true);
	}, []);

	const openEvent = (event: number) => {
		setEventData(event);
		setSelectedEvent(true);
	};

	return pageLoaded ? (
		<>
			<InOut width={1000} className={'flex items-center justify-center'}>
				{selectedEvent ? (
					<Backpack dispatch={reducer} event={dataReducerState[eventData]} setSelectedEvent={setSelectedEvent} />
				) : (
					<Container key={0} className="w-full max-w-4xl my-16 mx-2">
						<Container className="bg-neutral-900/75 p-4 rounded-t-md px-6 flex justify-between items-center" variant={'none'}>
							<div className="">
								<Heading size={'xs'} className="text-r-500">
									Backpack
								</Heading>
								{/* This should be one of those changing text things, funny words go here */}
								<Paragraph className="m-0">{scoutingTips[Math.floor(Math.random() * scoutingTips.length)]}</Paragraph>
							</div>
							<div>
								<Heading size={'xs'} className="m-0 text-right text-r-500">
									{localData.length} Events
								</Heading>
								<Paragraph className="m-0 text-right">0 Logs</Paragraph>
							</div>
						</Container>
						<AnimatedPage variant={'none'} className="rounded-b-md p-4">
							{creatingLog ? (
								<NewEvent reducer={reducer} setCreatingLog={setCreatingLog} />
							) : (
								<Container className="flex flex-col gap-2 p-2">
									{dataReducerState.length > 0 ? (
										<Container variant={'none'} className={`flex flex-col gap-4 rounded-md `}>
											{dataReducerState.map((event: EventDataType, i: number) => {
												return (
													<Button key={i} size={'xl'} variant={'secondary'} onClick={() => openEvent(i)}>
														{event.name}
													</Button>
												);
											})}
										</Container>
									) : null}
									<Button className="" size={'xl'} variant={'secondary'} onClick={() => setCreatingLog(!creatingLog)}>
										<Plus className="h-5 mx-1" /> Create an Event
									</Button>
								</Container>
							)}
						</AnimatedPage>
					</Container>
				)}
			</InOut>
		</>
	) : null;
}
