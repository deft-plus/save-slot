import * as idb from 'idb-keyval';

const dbStore = idb.createStore('app-state', 'checklists');

export const db = {
  get: async (key: IDBValidKey) => idb.get(key, dbStore) as unknown as AppChecklistState,
  set: async (key: IDBValidKey, value: unknown) => idb.set(key, value, dbStore),
  delete: async (key: IDBValidKey) => idb.del(key, dbStore),
  keys: async () => idb.keys(dbStore),
  entries: async () => idb.entries(dbStore) as unknown as [IDBValidKey, AppChecklistState][],
  values: async () => idb.values(dbStore) as unknown as AppChecklistState[],
};
