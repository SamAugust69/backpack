'use client';
import { Button, buttonVariants } from '@/ui/Button';
import { Container } from '@/components/ui/Container';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import AnimatedPage from '@/ui/AnimatedPage';
import { Dot, Edit2, Ellipsis, Plus, Trash, Trash2 } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import { NewEvent } from './NewEvent';
import { dataReducer } from '@/lib/saveLogReducer';
import { EventDataType } from '@/lib/formTypes';
import useLocalStorage from '@rehooks/local-storage';
import InOut from '@/ui/InOut';
import { Settings } from './Settings';
import { db } from '../lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import Link from 'next/link';

const scoutingTips = ['Scouting...', 'Data Monkey Labor ™', ''];

export default function Home() {
	const [creatingLog, setCreatingLog] = useState<boolean>(false);

	const [pageLoaded, setPageLoaded] = useState(false);

	const [localData, setLocalData] = useLocalStorage<Array<EventDataType>>('local-data', []); // stores local match information from scout

	const events = useLiveQuery(() => db.events.toArray()) ?? [];

	useEffect(() => {
		localData == undefined ?? setLocalData([]);
		setPageLoaded(true);
	}, []);

	return pageLoaded ? (
		<>
			<Settings />
			<InOut width={1000} className={'flex items-center justify-center'}>
				<Container key={0} className="w-full max-w-4xl my-4 mx-2">
					<Container className="bg-neutral-900/75 p-4 rounded-t-md px-6 flex justify-between items-center" variant={'none'}>
						<div className="">
							<Heading size={'xs'} className="text-r-500">
								Backpack
							</Heading>
							{/* This should be one of those changing text things, funny words go here */}
							{/* <Paragraph className="m-0">{scoutingTips[Math.floor(Math.random() * scoutingTips.length)]}</Paragraph> */}
							{/* never mind... */}
							<Paragraph className="m-0">To Get Started, Select a Competition</Paragraph>
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
							<NewEvent setCreatingLog={setCreatingLog} />
						) : (
							<Container className="flex flex-col gap-6 p-2">
								{events != undefined && events.length > 0 ? (
									<Container variant={'none'} className={`flex flex-col gap-4 rounded-md `}>
										{events.map((event: EventDataType, i: number) => {
											return (
												<div className={buttonVariants({ variant: 'none', size: 'none', className: 'flex' })} key={i}>
													<Link
														href={`/backpack/${event.id}`}
														className={buttonVariants({ variant: 'secondary', size: 'xl', className: 'flex flex-col w-full' })}
													>
														<Paragraph size={'sm'} className="m-0 text-g-700 flex px-4">
															{event.name}
														</Paragraph>
														<Paragraph size={'xs'} className="m-0 text-g-700 flex px-4">
															{event.week != null ? `Week ${event.week}` : null}
															{event.week != null ? <Dot /> : null}
															{event.year != null ? event.year : null}
														</Paragraph>
													</Link>
													{/* <Button className="absolute right-4" variant="hidden"></Button> */}
													<div className="absolute right-4 group h-4">
														<Ellipsis className="group-hover:hidden" />
														<div className="gap-4 absolute top-0 right-0 hidden group-hover:flex">
															<Button size={'none'} onClick={() => db.events.delete(event.id)} variant={'hidden'}>
																<Trash2 className="w-4 text-neutral-600 hover:text-r-500" />
															</Button>
															<Button size={'none'} onClick={() => db.events.delete(i + 1)} variant={'hidden'}>
																<Edit2 className="w-4 text-neutral-600 hover:text-neutral-500" />
															</Button>
														</div>
													</div>
												</div>
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
			</InOut>
		</>
	) : null;
}
