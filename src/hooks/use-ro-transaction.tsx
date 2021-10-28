import { IndexedDBContext } from 'components/indexed-db-context';
import { promisify } from 'helpers/promisify';
import { useCallback, useContext } from 'react';
import { createTransaction } from 'indexed-db/create-transaction';

export function useROTransaction<T>(): { getAll: () => Promise<T[]> } {
  const { store } = useContext(IndexedDBContext);

  const getAll = useCallback((): Promise<T[]> => {
    const transaction = createTransaction({ store, type: 'readonly' });
    const request = transaction.getAll();
    return promisify(request);
  }, [store]);

  return { getAll };
}
