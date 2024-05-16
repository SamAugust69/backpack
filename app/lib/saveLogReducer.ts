import { LogType, EventDataType } from '@/lib/formTypes';

const initState: any = [];

type data = LogType & EventDataType;

const enum REDUCER_ACTION_TYPE {
	ADDED_LOG,
	ADDED_EVENT,
	REMOVED_LOG,
}

type ReducerAction = {
	type: REDUCER_ACTION_TYPE | string;
	payload: EventDataType | LogType | data | any;
};

const insertLog = (payload: data | any, state: typeof initState) => {
	console.log('Payload', payload[1]);
	console.log('state', state);
	state.map((event: EventDataType, i: number) => {
		if (event.name == payload[0].name && event.year == payload[0].year) {
			return [...state[i].logs, payload[1]];
		}
		return [state];
	});
};

const dataReducer = (state: typeof initState, action: ReducerAction): typeof initState => {
	switch (action.type) {
		case 'ADDED_LOG':
		case REDUCER_ACTION_TYPE.ADDED_LOG:
			let fart = structuredClone(state);

			fart.map((event: EventDataType, i: number) => {
				if (event.name == action.payload[0].name && event.year == action.payload[0].year) {
					fart[i].logs = [...fart[i].logs, action.payload[1]];
				}
			});

			console.log(fart);

			return fart;
		case 'ADDED_EVENT':
		case REDUCER_ACTION_TYPE.ADDED_EVENT:
			console.log('THINKING', action.payload);
			return [...state, action.payload];
		// case 'REMOVED_LOG':
		// case REDUCER_ACTION_TYPE.REMOVED_LOG:
		// 	console.log('REMOVED_LOG');
		// 	return state.filter((log: any) => log.id !== action.payload.id);
		default:
			console.error(action.type, 'invalid action');
			return state;
	}
};

export { dataReducer, REDUCER_ACTION_TYPE };
