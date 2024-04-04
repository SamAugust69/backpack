'use client';
import { useEffect, useReducer, useState } from 'react';
import './globals.css';
import Dialog from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import Form from '@/components/form/Form';
import useLocalStorage from '@rehooks/local-storage';
import { unsavedReducer } from '@/lib/unsavedReducer';
import { FormItems, initialValues } from '@/lib/formTypes';
import LogView from './components/log/LogView';
import AnimatedPage from './components/ui/AnimatedPage';
import Paragraph from './components/ui/Paragraph';
import schedule from './schedual.json';
import QRCode, { QRCodeSVG } from 'qrcode.react';
import { MotionConfig } from 'framer-motion';

const logA = {
	id: '3a32c2dd-4dbc-471a-802d-166bfffd6b92',
	completed: false,
	match: 2,
	team: 230,
	dateSubmitted: new Date('2024-03-09T14:55:16.601Z'),
	scout: 'Spencer Beatman',
	notes: 'Very good but hang is not the best. Recommend ',
	bot_preformed: 'well',
	auto: {
		scored: true,
		leftStartingZone: true,
		speakerScore: 3,
		ampScore: 0,
	},
	teleop: {
		ampActivatedAmount: 1,
		ampScore: 4,
		speakerScore: 3,
		amplifiedSpeakerScore: 1,
		parkOnStage: false,
		hangOnChain: true,
		hangInHarmony: false,
		scoredTrap: false,
		thrownNoteScore: false,
		thrownNoteAmount: 0,
	},
};

const checkForID = (arr: Array<FormItems>, id: string) => {
	arr.map((log) => {
		if (log.id == id) {
			return true;
		}
	});
	return false;
};

export default function Home() {
	const [formOpen, setFormOpen] = useState(false);

	const [modalState, setModalState] = useState({
		title: 'Delete Log',
		desc: "yos' sure you wants to do dat boss?",
		onContinue: () => console.log('test'),
		continueText: 'Delete Log',
		onClose: () => console.log('ah'),
		closeText: 'Close',
	});

	// form stuff...... data..
	const [initalFormValues, setInitalFormValues] = useState<Partial<FormItems>>();
	const [localData, setLocalData] = useLocalStorage<Array<Partial<FormItems>>>('local-data', []); // stores local match information from scout
	const [localDispatchState, localDispatch] = useReducer(unsavedReducer, localData);

	const toDisplay: Array<any> = [
		{
			title: 'Auto Summary',
			display: [
				{
					'Left Starting Zone': ['number', logA.auto.leftStartingZone, 2],
				},
				{
					"Speaker Note's Scored": ['number', logA.auto.speakerScore, 5],
					"Amp Note's Scored": ['number', logA.auto.ampScore, 2],
				},
			],
		},
		{
			title: 'Teleop Summary',
			display: [
				{
					"Amp Note's Scored": ['number', logA.teleop.ampScore, 1],
					'Amp Activations': ['number', logA.teleop.ampActivatedAmount, 0],
				},
				{
					'Speaker Score': ['number', logA.teleop.speakerScore, 2],
					'Amplified Speaker Score': ['number', logA.teleop.amplifiedSpeakerScore, 5],
				},
				{
					Hung: ['boolean', logA.teleop.hangOnChain, 'Did Not Hang', 3],
					Harmonize: ['boolean', logA.teleop.hangInHarmony, 'No Harmony', 2],
					'Scored Trap': ['boolean', logA.teleop.scoredTrap, 'No Trap', 5],
				},
			],
		},
	];

	// sets local data state
	useEffect(() => {
		setLocalData(localDispatchState);
	}, [localDispatchState]);

	const formStuff = {
		modalState: formOpen,
		closeModal: () => {
			setFormOpen(false);
			setCurMatch(curMatch + 1);
		},
		dispatch: localDispatch,
		initValue: initalFormValues,
	};

	const openLog = (match: number, team: number) => {
		console.log('opened');
		setInitalFormValues({
			match: match,
			team: team,
		});
		console.log({
			match: match,
			team: team,
		});
		setFormOpen(!formOpen);
	};

	// so I want to take a schedual, how would I do this? can i export one from TBA?

	const [curMatch, setCurMatch] = useState(7);
	const [tabletNumber, setTabletNumber] = useState(2);

	const shortenQRCode = (length: number) => {
		let len = 0;
		let stringifiedLogs = '[';

		localData.map((log: Partial<FormItems>) => {
			let str = JSON.stringify(log);
			if (len + str.length > length) return stringifiedLogs;
			len += str.length;
			stringifiedLogs = stringifiedLogs + str + ',';
		});
		console.log(len);
		console.log(stringifiedLogs + ']');
		return stringifiedLogs + ']';
	};

	const [expanded, setExpanded] = useState(false);

	return (
		<div className="max-h-screen overflow-scroll p-12">
			<Form {...formStuff} />
			<Dialog {...modalState}>Test</Dialog>
			{/* <AnimatedPage>
				<div className='bg-g-100 border-2 border-t-100 rounded flex flex-col h-32 overflow-scroll snap-y'>
					{schedule.Schedule.slice(curMatch - 2 > 0 ? curMatch - 2 : 0, curMatch + 1 < schedule.Schedule.length ? curMatch + 1 : schedule.Schedule.length).map((val) => {
						return (
							<div onClick={() => {curMatch == val.matchNumber ? openLog(val.matchNumber, val.teams[tabletNumber].teamNumber) : null}} className={`group group-hover bg-g-200 m-2 rounded flex snap-center ${curMatch == val.matchNumber ? " hover:cursor-pointer" : ""} transition-all`}>
								<div className={` ${curMatch == val.matchNumber ? "bg-t-400" : "bg-b-100"} py-2 h-full px-4 rounded-l flex items-center justify-center `}>
									{curMatch == val.matchNumber ? <Paragraph size={"xs"} className='group invisible w-0 group-hover:visible group-hover:w-full'>Create Log</Paragraph> : null}
									<Paragraph size={"sm"}>{val.matchNumber}</Paragraph>
								</div>
								<div className='px-2 flex items-center justify-between w-full'>
									<Paragraph size={"sm"}>{val.description}</Paragraph>
									<div>
										<Paragraph size={"sm"}>{val.teams[tabletNumber].teamNumber}</Paragraph>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				<Button onClick={() => setCurMatch(curMatch + 1)}></Button>
			</AnimatedPage> */}
			{/* <AnimatedPage>
				<Button onClick={() => setFormOpen(!formOpen)}>Open Log</Button>
				<br />
				{
					
					localData.map((val: Partial<FormItems>) => {
						return (
							<>
								{JSON.stringify({...initialValues, ...val}.id) + JSON.stringify({...initialValues, ...val}).length + " " + JSON.stringify(val).length}
								<br />
							</>
						)
					})
				}
			</AnimatedPage> */}

			{/* <QRCodeSVG className={"w-96 h-96 m-10"} value={shortenQRCode(2000)}/> */}

			<MotionConfig transition={{ duration: 0.75 }}>
				<div className="flex flex-col border-2 bg-t-100 border-t-200 rounded-lg p-2 items-center gap-2">
					<Paragraph className="text-center text-b-100 m-0">Test</Paragraph>
					<Button onClick={() => setExpanded(!expanded)}>Expand</Button>
					<AnimatedPage className={'p-2 bg-t-200 rounded-lg'}>
						{expanded ? (
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et facilis a quos nisi illo, aliquid deserunt est
								commodi placeat aut eligendi architecto omnis rem maxime enim quam voluptatibus reprehenderit laudantium.
							</p>
						) : (
							<p>test</p>
						)}
					</AnimatedPage>
				</div>
			</MotionConfig>
		</div>
	);
}
