const initState: any = [];

const enum REDUCER_ACTION_TYPE {
	ADDED_LOG,
	REMOVED_LOG,
	UPDATED_LOG,
}

type ReducerAction = {
	type: REDUCER_ACTION_TYPE;
	payload?: any;
};

const unsavedReducer = (
	state: typeof initState,
	action: ReducerAction
): typeof initState => {
	switch (action.type) {
		case REDUCER_ACTION_TYPE.ADDED_LOG:
			console.log("ADDED_LOG");
			return [...state, action.payload];

		case REDUCER_ACTION_TYPE.REMOVED_LOG:
			console.log("REMOVED_LOG");
			return state.filter((log: any) => log.id !== action.payload.id);

		case REDUCER_ACTION_TYPE.UPDATED_LOG:
			console.log("UPDATED_LOG");
			return state.map((log: any) => {
				if (log.id === action.payload.id) {
					return action.payload;
				} else {
					return log;
				}
			});

		default:
			throw new Error();
	}
};

export { unsavedReducer, REDUCER_ACTION_TYPE };
