import Dexie, { Table, type EntityTable } from 'dexie';
import { EventDataType } from './formTypes';

interface BackpackDatabase extends Dexie {
	events: Table<EventDataType>;
}

const db = new Dexie('BackpackDatabase') as BackpackDatabase;

// Schema declaration:
db.version(1).stores({
	events: 'id,name,week,year,event_code,event_type,schedule,logs,statistics', // primary key "id" (for the runtime!)
});

export { db };
