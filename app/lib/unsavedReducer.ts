import { FormItems } from '@/lib/formTypes';

const initState: any = [];

const enum REDUCER_ACTION_TYPE {
	ADDED_LOG,
	REMOVED_LOG,
	UPDATED_LOG,
	SET_LOG
}

type ReducerAction = {
	type: REDUCER_ACTION_TYPE | string;
	payload: FormItems;
};

const unsavedReducer = (state: typeof initState, action: ReducerAction): typeof initState => {
	switch (action.type) {
		case "added":
		case REDUCER_ACTION_TYPE.ADDED_LOG:
			console.log('ADDED_LOG');
			return [...state, action.payload];
		case "removed":
		case REDUCER_ACTION_TYPE.REMOVED_LOG:
			console.log('REMOVED_LOG');
			return state.filter((log: any) => log.id !== action.payload.id);
		case "updated":
		case REDUCER_ACTION_TYPE.UPDATED_LOG:
			console.log('UPDATED_LOG');
			return state.map((log: any) => {
				if (log.id === action.payload.id) {
					return action.payload;
				} else {
					return log;
				}
			});
		case "set":
		case REDUCER_ACTION_TYPE.SET_LOG || "set":
			return action.payload

		default:
			console.log(action.type)
			return state
	}
};

export { unsavedReducer, REDUCER_ACTION_TYPE };
