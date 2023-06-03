import { v4 } from "uuid";

const blankLog = {
	id: v4(),
	disabled: false,
	info: { match: ["0"], team: ["0"], scout: [""], notes: [""] },
	auto: {
		move: [false],
		score: [false],
		leave: [false],
		dock: [false],
		engage: [false],
		cones: [0],
		cubes: [0],
		scoreLocations: [
			[["10"], ["00"], ["10"], ["10"], ["00"], ["10"], ["10"], ["00"], ["10"]],
			[["10"], ["00"], ["10"], ["10"], ["00"], ["10"], ["10"], ["00"], ["10"]],
			[["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"]],
		],
	},
	teleop: {
		conesAttempted: [0],
		cones: [0],
		cubes: [0],
		cubesAttempted: [0],
		dock: [false],
		engage: [false],
		scoreLocations: [
			[["10"], ["00"], ["10"], ["10"], ["00"], ["10"], ["10"], ["00"], ["10"]],
			[["10"], ["00"], ["10"], ["10"], ["00"], ["10"], ["10"], ["00"], ["10"]],
			[["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"], ["20"]],
		],
	},
};

export default blankLog;
