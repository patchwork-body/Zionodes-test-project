import { IndexedDBContext } from 'components/indexed-db-context';
import { promisify } from 'helpers/promisify';
import { useCallback, useContext } from 'react';
import { createTransaction } from 'store/create-transaction';

export function useRWTransaction<T extends Record<string, any>>(): {
  add: (value: T) => Promise<IDBValidKey>;
  put: (value: T) => Promise<IDBValidKey>;
} {
  const { store } = useContext(IndexedDBContext);

  const add = useCallback(
    (value: T): Promise<IDBValidKey> => {
      const transaction = createTransaction({ store, type: 'readwrite' });
      const request = transaction.add(value);
      return promisify(request);
    },
    [store],
  );

  const put = useCallback(
    (value: T): Promise<IDBValidKey> => {
      const transaction = createTransaction({ store, type: 'readwrite' });
      const request = transaction.put(value);
      return promisify(request);
    },
    [store],
  );

  return { add, put };
}
