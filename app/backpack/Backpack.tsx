'use client';
import { Container } from '@/components/ui/Container';
import Heading from '@/ui/Heading';
import Paragraph from '@/ui/Paragraph';
import AnimatedPage from '@/ui/AnimatedPage';
import { useEffect, useState } from 'react';
import { EventDataType, initialValues, AveragesType, LogType, DisplayedLogsType } from '@/lib/formTypes';
import { Dot } from 'lucide-react';
import { Button } from '@/ui/Button';
import { uuid } from 'uuidv4';
import { Log } from '@/components/Log';
import { Form } from '@/components/Form';
import { usePagination } from '@/lib/usePagination';
import { calculateScore } from './calcScore';
import scheduel from './scheduel.json';
import QRCodes from './qrCodes';

interface BackpackProps {
	event: EventDataType;
	setSelectedEvent: Function;
	dispatch: Function;
}

const Backpack = ({ event, setSelectedEvent, dispatch }: BackpackProps) => {
	const [eventInfo, setEventInfo] = useState<EventDataType>(event);

	const [currentLog, setCurrentLog] = useState(initialValues);
	const [formOpen, setFormOpen] = useState(false);

	const [displayedLogs, setDisplayedLogs] = useState<Array<DisplayedLogsType>>([]);

	// self explainatory, find log from ID.
	const findLogFromId = (id: string): LogType => {
		var locatedLog = initialValues;
		event.logs.map((log) => {
			if (log.id == id) {
				locatedLog = log;
			}
		});
		return locatedLog;
	};

	const openLog = (match: number, team: number) => {
		setCurrentLog({
			...currentLog,
			match: match,
			team: team,
			id: uuid(),
		});
		setFormOpen(!formOpen);
	};

	// this generates the logs to be displayed. Adds data like score and shit.
	const generateDisplayedLogs = () => {
		var toSet: Array<DisplayedLogsType> = [];

		event.logs.map((log: LogType, i: number) => {
			const { autoScore, teleopScore, total } = calculateScore(log);
			console.log(calculateScore(log));
			toSet = [
				...toSet,
				{
					score: total,
					autoScore: autoScore,
					teleopScore: teleopScore,
					team: log.team,
					match: log.match,
					rankingPoints: 0,
					dateSubmitted: log.dateSubmitted,
					id: log.id,
				},
			];
		});

		setDisplayedLogs(toSet);
	};

	const calcAverageScores = (): AveragesType => {
		var totalScore: number = 0;
		var totalAutoScore: number = 0;
		var totalTeleopScore: number = 0;

		displayedLogs.map((logInfo: DisplayedLogsType) => {
			totalScore += logInfo.score;
			totalAutoScore += logInfo.autoScore;
			totalTeleopScore += logInfo.teleopScore;
		});

		const averageTotal = totalScore / event.logs.length;
		const averageAuto = totalAutoScore / event.logs.length;
		const averageTeleop = totalTeleopScore / event.logs.length;

		return { averageAuto, averageTeleop, averageTotal };
	};

	useEffect(() => {
		generateDisplayedLogs();
	}, [event]);

	const [averageScore, setAverageScore] = useState(calcAverageScores());

	useEffect(() => {
		setEventInfo(event);
	}, [event]);

	const { currentPage, goToStep, numButtons, currentStep, forwards, backwards } = usePagination(5, displayedLogs);
	const [qrOpen, setQROpen] = useState(false);

	return (
		<div className="flex flex-col w-full items-center">
			{qrOpen ? <QRCodes data={event.logs} dispatch={dispatch} /> : null}
			<Form eventInfo={event} dispatch={dispatch} modalState={formOpen} closeModal={setFormOpen} formValues={currentLog} />
			<Container key={1} className={`w-full max-w-4xl my-4 mx-2 ${formOpen ? 'overflow-hidden select-none' : ''} `}>
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
									<Button size={'md'} variant={'default'} onClick={() => setQROpen(!qrOpen)}>
										Import / Export Logs
									</Button>
								</div>
								{currentPage != undefined
									? currentPage.map((log: DisplayedLogsType, i: number) => {
											return (
												<Log
													key={i}
													eventData={findLogFromId(log.id)}
													autoScore={log.autoScore}
													teleopScore={log.teleopScore}
													averageScore={averageScore}
												/>
											);
									  })
									: null}
							</div>
							<div className="flex gap-2 justify-center pt-4">
								<Button variant={'none'} size={'sm'} onClick={() => backwards()}>
									-
								</Button>
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
								<Button variant={'none'} size={'sm'} onClick={() => forwards()}>
									+
								</Button>
							</div>
						</div>
					</Container>
					<Container className=" bg-neutral-900/50">
						<div className="flex items-center justify-between p-4 bg-neutral-900/75 rounded-t-md">
							<Paragraph size={'sm'} className="inline-flex items-center text-neutral-300">
								Match Selecter
							</Paragraph>
						</div>
						<div className="p-2">
							{/* {scheduel
								.slice(
									curMatch - 1 > 0 ? curMatch - 1 : 0,
									curMatch + 2 < schedule.Schedule.length ? curMatch + 2 : schedule.Schedule.length
								)
								.map((val, i) => {
									return (
										<div
											key={i}
											onClick={() => {
												curMatch == val.matchNumber ? openLog(val.matchNumber, val.teams[tabletNumber].teamNumber) : null;
											}}
											className={`group group-hover bg-g-200 m-2 rounded flex snap-center ${
												curMatch == val.matchNumber ? ' hover:cursor-pointer' : ''
											} transition-all`}
										>
											<div
												className={` ${
													curMatch == val.matchNumber ? 'bg-t-400' : 'bg-b-100'
												} py-2 h-full px-4 rounded-l flex items-center justify-center `}
											>
												{curMatch == val.matchNumber ? (
													<Paragraph size={'xs'} className="group invisible w-0 group-hover:visible group-hover:w-full">
														Create Log
													</Paragraph>
												) : null}
												<Paragraph size={'sm'}>{val.matchNumber}</Paragraph>
											</div>
											<div className="px-2 flex items-center justify-between w-full">
												<Paragraph size={'sm'}>{val.description}</Paragraph>
												<div>
													<Paragraph size={'sm'} className={`${tabletNumber > 2 ? 'text-r-100' : 'text-blue-300'}`}>
														{val.teams[tabletNumber].teamNumber}
													</Paragraph>
												</div>
											</div>
										</div>
									);
								})} */}
						</div>
					</Container>
				</AnimatedPage>
			</Container>
		</div>
	);
};

export { Backpack };
