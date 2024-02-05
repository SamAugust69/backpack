import { v4 } from 'uuid';

// objective data, take data and
export type FormItems = {
	id: string;
	completed: boolean;
	match: number;
	team: number;
	scout: string;
	dateAdded: Date;
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
		ampActivatedAmount: number;
		ampScore: number;

		speakerScore: number;
		amplifiedSpeakerScore: number;

		hangOnChain: boolean;
		hangInHarmony: boolean; // is big bulky, or bad at coordination
		scoredTrap: boolean;

		thrownNoteScore: boolean;
		thrownNoteAmount: number;
	};
};

export const initialValues: FormItems = {
	id: v4(),
	completed: false,
	match: 0,
	team: 0,
	dateAdded: new Date(),
	scout: 'Sam',
	notes: '',
	bot_preformed: 'well',
	auto: {
		scored: false,
		leftStartingZone: false,
		speakerScore: 0,
		ampScore: 0,
	},
	teleop: {
		ampActivatedAmount: 0,
		ampScore: 0,

		speakerScore: 0,
		amplifiedSpeakerScore: 0,

		hangOnChain: false,
		hangInHarmony: false,
		scoredTrap: false,

		thrownNoteScore: false,
		thrownNoteAmount: 0,
	},
};

export type FormInputType = {
	type: string;
	title?: string;
	toggled?: boolean;
	description?: string;
	onClick?: (e: any) => void;
	checkbox?: boolean;
	className?: string;
	showChildren?: boolean;
	children?: Array<FormInputType>;
	variant?: string;
	onChange?: (e: any) => void;
	placeholder?: string;
};
