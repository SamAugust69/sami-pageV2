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
		totalScored: number;
		scoredSpeaker: boolean;
		speakerScore: number;
		scoredAmp: boolean;
		ampScore: number;
	};
	teleop: {
		scoredAmp: boolean;
		ampActivatedAmount: number;
		ampScore: number;

		scoredSpeaker: boolean;
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
		leftStartingZone: false,
		scored: false,
		totalScored: 0,
		scoredSpeaker: false,
		speakerScore: 0,
		scoredAmp: false,
		ampScore: 0,
	},
	teleop: {
		scoredAmp: false,
		ampActivatedAmount: 0,
		ampScore: 0,

		scoredSpeaker: false,
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
