import { v4 } from 'uuid';

export type formItems = {
	id: string;
	completed: boolean;
	match: number;
	team: number;
	scout: string;
	notes: string;
	bot_preformed: string;
	auto: {
		leftStartingZone: boolean
		scored: boolean
		totalScored: number
		scoredSpeaker: boolean
		speakerScore: number
		scoredAmp: boolean
		ampScore: number
	}
	teleop: {
		cones_attempted: number;
		cones_scored: number;
		cubes_attempted: number;
		cubes_scored: number;
		docked: boolean;
		engaged_station: boolean;
	};
};


export const initialValues: formItems = {
	id: v4(),
	completed: false,
	match: 0,
	team: 0,
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
		ampScore: 0
	},
	teleop: {
		cones_attempted: 0,
		cones_scored: 0,
		cubes_attempted: 0,
		cubes_scored: 0,
		docked: false,
		engaged_station: false,
	},
};