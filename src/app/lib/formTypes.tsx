export type formItems = {
	id: string;
	completed: boolean;
	match: number;
	team: number;
	scout: string;
	notes: string;
	bot_preformed: string;
	auto: {
		moved: boolean;
		scored: boolean;
		left_community: boolean;
		docked: boolean;
		engaged_station: boolean;
		cones_scored: number;
		cubes_scored: number;
	};
	teleop: {
		cones_attempted: number;
		cones_scored: number;
		cubes_attempted: number;
		cubes_scored: number;
		docked: boolean;
		engaged_station: boolean;
	};
};
