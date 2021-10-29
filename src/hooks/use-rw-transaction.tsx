import { IndexedDBContext } from 'components/indexed-db-context';
import { promisify } from 'helpers/promisify';
import { useCallback, useContext } from 'react';
import { createTransaction } from 'indexed-db/create-transaction';

export function useRWTransaction<T extends Record<string, any>>(): {
  add: (value: T) => Promise<IDBValidKey>;
  put: (value: T) => Promise<IDBValidKey>;
  remove: (id: any) => void;
} {
  const { store } = useContext(IndexedDBContext);

  const add = useCallback(
    (value: T): Promise<IDBValidKey> => {
      const transaction = createTransaction({ store, type: 'readwrite' });
      const request = transaction.add(value);
      return promisify<IDBValidKey>(request);
    },
    [store],
  );

  const put = useCallback(
    (value: T): Promise<IDBValidKey> => {
      const transaction = createTransaction({ store, type: 'readwrite' });
      const request = transaction.put(value);
      return promisify<IDBValidKey>(request);
    },
    [store],
  );

  const remove = useCallback(
    async (id: any) => {
      const transaction = createTransaction({ store, type: 'readwrite' });
      await promisify(transaction.delete(id));

      const request = transaction.index('parent_index').openKeyCursor(IDBKeyRange.only(id));

      const cursor = await promisify<IDBCursor>(request);
      while (cursor) {
        try {
          await promisify(transaction.delete(cursor.primaryKey));
          await remove(cursor.primaryKey);

          cursor.continue();
        } catch (error) {
          if (error instanceof DOMException) {
            break;
          }

          throw error;
        }
      }
    },
    [store],
  );

  return { add, put, remove };
}
