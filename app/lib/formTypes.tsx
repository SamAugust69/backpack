import { uuid } from 'uuidv4';

// objective data, take data and
export type LogType = {
	id: string;
	match: number;
	team: number;
	scout: string;
	dateSubmitted: Date;
	notes: string;
	bot_preformed: string;

	// offensive vs defensive
	auto: {
		leftStartingZone: boolean;

		scored: boolean;
		speakerScore: number;
		ampScore: number;
	};
	teleop: {
		ampScore: number;

		speakerScore: number;
		amplifiedSpeakerScore: number;

		parkOnStage: boolean;
		hangOnChain: boolean;
		hangInHarmony: boolean; // is big bulky, or bad at coordination
		trapScore: number;

		thrownNoteScore: boolean;
		thrownNoteAmount: number;
	};
};

export type EventDataType = {
	name: string;
	week: string;
	year: number;
	event_code: string;
	event_type: number;
	logs: Array<LogType>;
};

export const initialValues: LogType = {
	id: uuid(),
	match: 0,
	team: 0,
	dateSubmitted: new Date(),
	scout: '',
	notes: '',
	bot_preformed: 'well',
	auto: {
		scored: false,
		leftStartingZone: false,
		speakerScore: 0,
		ampScore: 0,
	},
	teleop: {
		ampScore: 0,

		speakerScore: 0,
		amplifiedSpeakerScore: 0,

		parkOnStage: false,
		hangOnChain: false,
		hangInHarmony: false,
		trapScore: 0,

		thrownNoteScore: false,
		thrownNoteAmount: 0,
	},
};

export type DisplayedLogsType = {
	score: number;
	autoScore: number;
	teleopScore: number;
	team: number;
	match: number;
	rankingPoints: number;
	dateSubmitted: Date;
	id: string;
};
export type ScoringTypes = {
	autoScore: number;
	teleopScore: number;
	averageAuto: number;
	averageTeleop: number;
	averageTotal: number;
};

export type FormInputType = {
	type: string;
	title?: string;
	toggled?: boolean;
	value?: string | number;
	description?: string;
	onClick?: (e: any) => void;
	checkbox?: boolean;
	incrementButtons?: boolean;
	increment?: Function;
	decrease?: Function;
	className?: string;
	showChildren?: boolean;
	children?: Array<FormInputType>;
	variant?: string;
	onChange?: (e: any) => void;
	placeholder?: string;
};
