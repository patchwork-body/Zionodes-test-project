export type CreateStoreParams = {
  name: string;
  version: number;
  init: (databaseInstance: IDBDatabase) => void;
};

export const createStore = ({ name, version, init }: CreateStoreParams): Promise<IDBDatabase> => {
  const IndexedDBOpenRequest = indexedDB.open(name, version);

  IndexedDBOpenRequest.onupgradeneeded = () => {
    init(IndexedDBOpenRequest.result);
  };

  return new Promise((resolve, reject) => {
    IndexedDBOpenRequest.onsuccess = () => {
      resolve(IndexedDBOpenRequest.result);
    };

    IndexedDBOpenRequest.onerror = () => {
      reject(IndexedDBOpenRequest.error);
    };
  });
};
