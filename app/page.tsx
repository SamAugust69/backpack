'use client';
import { useReducer, useState } from 'react';
import './globals.css';
import Dialog from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import Form from '@/components/form/Form';
import useLocalStorage from '@rehooks/local-storage';
import { unsavedReducer } from '@/lib/unsavedReducer';
import { FormItems, initialValues } from '@/lib/formTypes';
import LogView from './components/log/LogView';
import AnimatedPage from './components/ui/AnimatedPage';

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
	const [formData, setFormData] = useState<FormItems>(structuredClone(initialValues));
	const [localData, setLocalData] = useLocalStorage<Array<FormItems>>('local-data', []); // stores local match information from scout
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

	const openLog = () => {};

	return (
		<div className="min-h-screen">
			<Form modalState={formOpen} closeModal={() => setFormOpen(false)} dispatch={localDispatch} formValues={formData} />
			{/* <Dialog {...modalState}>Test</Dialog> */}
			<AnimatedPage>test</AnimatedPage>
			<AnimatedPage>test</AnimatedPage>
		</div>
	);
}
