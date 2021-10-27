import { IndexedDBContext } from 'components/indexed-db-context';
import { useCallback, useContext } from 'react';
import { createTransaction } from 'store/create-transaction';

export function useRWTransaction<T>(): { add: (value: T) => Promise<IDBValidKey> } {
  const { store } = useContext(IndexedDBContext);

  const add = useCallback(
    (value: T): Promise<IDBValidKey> => {
      const transaction = createTransaction({ store, type: 'readwrite' });
      const request = transaction.add(value);

      return new Promise((resolve, reject) => {
        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(request.error);
        };
      });
    },
    [store],
  );

  return { add };
}
