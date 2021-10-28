import { IndexedDBContext } from 'components/indexed-db-context';
import { promisify } from 'helpers/promisify';
import { useCallback, useContext } from 'react';
import { createTransaction } from 'indexed-db/create-transaction';

export function useROTransaction<T>(): { getAll: (parent: IDBValidKey | IDBKeyRange) => Promise<T[]> } {
  const { store } = useContext(IndexedDBContext);

  const getAll = useCallback(
    (parent: IDBValidKey | IDBKeyRange): Promise<T[]> => {
      const transaction = createTransaction({ store, type: 'readonly' });
      const request = transaction.index('parent_index').getAll(parent);
      return promisify(request);
    },

    [store],
  );

  return { getAll };
}
