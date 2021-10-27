import { IndexedDBContext } from 'components/indexed-db-context';
import { useCallback, useContext } from 'react';
import { createTransaction } from 'store/create-transaction';

export function useROTransaction(): { getAll: () => Promise<any[]> } {
  const { store } = useContext(IndexedDBContext);

  const getAll = useCallback((): Promise<any[]> => {
    const transaction = createTransaction({ store, type: 'readonly' });
    const request = transaction.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }, [store]);

  return { getAll };
}
