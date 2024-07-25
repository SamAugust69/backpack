'use client';

import { DisplayedLogsType, EventDataType, LogType, initialValues } from '@/lib/formTypes';
import { db } from '@/lib/db';
import { Suspense, useEffect, useState } from 'react';
import { PageNotFound } from '@/app/components/404';
import Err from '@/ui/Err';
import { Circle, Dot, LoaderCircle, Plus, Settings, Settings2 } from 'lucide-react';
import { Container } from '@/ui/Container';
import Paragraph from '@/ui/Paragraph';
import { Form } from '@/components/Form';
import Heading from '@/ui/Heading';
import { Button, buttonVariants } from '@/ui/Button';
import AnimatedPage from '@/ui/AnimatedPage';
import { usePagination } from '@/app/lib/usePagination';
import { Log } from '@/components/Log';
import Link from 'next/link';
import InOut from '@/app/components/ui/InOut';
import { useLiveQuery } from 'dexie-react-hooks';

const findLogFromId = (id: string, logs: Array<LogType>): LogType | null => {
	const log = logs.find((log) => log.id === id);
	return log ?? null;
};

const sortLogs = (logs: Array<LogType>, sort: 'recent' | 'team' | 'match') => {
	switch (sort) {
		case 'recent':
			return logs.sort((a, b) => {
				// Assuming logs have a `date` property which is a Date object or a timestamp
				return new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime();
			});
		case 'team':
			return logs.sort((a, b) => {
				// Assuming logs have a `team` property which is a string or a number
				if (a.team < b.team) return -1;
				if (a.team > b.team) return 1;
				return 0;
			});
		case 'match':
			return logs.sort((a, b) => {
				// Assuming logs have a `match` property which is a string or a number
				if (a.match < b.match) return 1;
				if (a.match > b.match) return -1;
				return 0;
			});
		default:
			return logs;
	}
};

const Page = ({ params }: { params: { id: string } }) => {
	// form state
	const [formOpen, setFormOpen] = useState(false);
	const [sortState, setSortState] = useState<'recent' | 'team' | 'match'>('recent');
	const [submittedLog, setSubmittedLog] = useState(true);

	const sort: Array<any> = ['Recent', 'Team', 'Match'];

	const [initialFormData, setInitialFormData] = useState<LogType>(structuredClone(initialValues));
	const [currentLog, setCurrentLog] = useState(structuredClone(initialValues));

	// stores event data
	const eventInfo = useLiveQuery(() => db.events.where('id').equals(params.id).first()) ?? null;
	const [sortedLogs, setSortedLogs] = useState<Array<LogType>>([]);

	const { currentPage, goToStep, numButtons, currentStep, forwards, backwards, updatePagination } = usePagination(
		5,
		sortedLogs
	);

	useEffect(() => {
		const sortedLogs = sortLogs(eventInfo?.logs ?? [], sortState);
		setSortedLogs(sortedLogs);
		updatePagination();
	}, [sortState, eventInfo]);

	if (eventInfo === null)
		return (
			<Container className="self-center m-4 px-8 py-4 flex gap-4 items-center" variant={'border'}>
				<Circle className="text-neutral-300 w-9 h-10 relative left-0.5" />
				<LoaderCircle className="text-neutral-600 w-10 h-10 animate-spin absolute " />
				<Paragraph size={'sm'}>Loading...</Paragraph>
			</Container>
		);
	if (eventInfo === undefined) return <PageNotFound />;

	const editLog = (logData: LogType) => {
		setInitialFormData(structuredClone(logData)); // Save the initial state before editing
		setCurrentLog(logData);
		setFormOpen(true);
	};

	const newLog = () => {
		if (submittedLog == true) {
			setSubmittedLog(false);
			setCurrentLog(initialValues);
		}
		setFormOpen(true);
	};

	return (
		<div className="flex flex-col w-full items-center">
			{/* qr codes need to be added again*/}
			<Form
				submittedLog={submittedLog}
				eventInfo={eventInfo}
				modalState={formOpen}
				closeModal={setFormOpen}
				formValues={currentLog}
				initalFormState={initialFormData}
				setCurrentLog={setCurrentLog}
				onSubmit={() => setSubmittedLog(true)}
			/>
			<Container key={1} className={`w-full max-w-4xl my-4 mx-2 ${formOpen ? 'overflow-none select-none' : ''} `}>
				<Container className="bg-neutral-900/75 p-4 rounded-t-md px-6 flex justify-between items-center" variant={'none'}>
					<div>
						<Heading size={'uberSmall'} className="text-r-500">
							{eventInfo.name}
						</Heading>
						<Paragraph className="m-0 inline-flex items-center text-neutral-400" size={'sm'}>
							Week {eventInfo.week} <Dot /> {eventInfo.year}
						</Paragraph>
					</div>
					<div className="flex">
						<Link className={buttonVariants({ variant: 'hidden' })} href={'/backpack'}>
							Back
						</Link>
						<Button variant={'none'} size={'xs'}>
							<Settings className="w-5" />
						</Button>
					</div>
				</Container>
				<AnimatedPage variant={'none'} className="rounded-b-md p-4 flex flex-col gap-4">
					{/* <Container className=" bg-neutral-900/50">
						<div className="flex items-center justify-between p-4 bg-neutral-900/75 rounded-t-md">
							<Paragraph size={'sm'} className="inline-flex items-center text-neutral-300">
								Your Logs
							</Paragraph>
							<Button size={'sm'} variant={'default'}>
								Import / Export Logs
							</Button>
						</div>
					</Container> */}
					<Container className=" bg-neutral-900/50">
						<div className="flex items-center justify-between p-4 bg-neutral-900/75 rounded-t-md">
							<Paragraph size={'sm'} className="inline-flex items-center text-neutral-300">
								Match Selecter
							</Paragraph>
						</div>
						<div className="p-2"></div>
					</Container>
					<Container className="flex flex-col gap-2 bg-neutral-900/50 rounded-md border border-neutral-700">
						{/* header? */}
						<header className="flex gap-2 p-4 rounded-t-md bg-neutral-900 justify-between">
							<Button size={'md'} variant={'silly'} onClick={() => newLog()}>
								{submittedLog ? <Plus className="w-4 mr-2" /> : null}
								{submittedLog ? 'New Log' : 'Continue Logging'}
							</Button>
							<div className="flex gap-2">
								{sort.map((val, i) => {
									return (
										<Button
											key={i}
											size={'sm'}
											variant={'none'}
											onClick={() => setSortState(val.toLowerCase())}
											className={`border ${
												sortState == val.toLowerCase() ? 'bg-neutral-700 border-neutral-600' : 'border-neutral-900'
											}`}
										>
											{val}
										</Button>
									);
								})}
							</div>
						</header>

						{/* logs */}
						<section className="flex flex-col gap-4 p-4">
							{currentPage != undefined ? (
								currentPage.map((log: DisplayedLogsType, i: number) => {
									return (
										<Log
											key={i}
											logData={findLogFromId(log.id, eventInfo.logs)}
											autoScore={log.autoScore}
											teleopScore={log.teleopScore}
											// averageScore={averageScore}
											editLog={editLog}
											averageScore={{ averageAuto: 0, averageTeleop: 0, averageTotal: 0 }}
										/>
									);
								})
							) : (
								<Paragraph size={'xs'} className="text-neutral-400 text-center">
									No Logs...{' '}
									<Button variant={'link'} size={'none'} onClick={() => newLog()}>
										Add One?
									</Button>
								</Paragraph>
							)}
						</section>

						{/* footer? */}
						<footer className="flex gap-2 justify-center p-2 rounded-b-md bg-neutral-900">
							<Button variant={'none'} size={'sm'} onClick={() => backwards()}>
								-
							</Button>
							<div>
								{Array.from(Array(numButtons), (element, i) => {
									return (
										<Button
											key={i}
											onClick={() => goToStep(i)}
											size={'sm'}
											variant={'none'}
											className={`${i == currentStep ? 'underline' : null}`}
										>
											{i}
										</Button>
									);
								})}
							</div>
							<Button variant={'none'} size={'sm'} onClick={() => forwards()}>
								+
							</Button>
						</footer>
					</Container>
				</AnimatedPage>
			</Container>
		</div>
	);
};

export default Page;
