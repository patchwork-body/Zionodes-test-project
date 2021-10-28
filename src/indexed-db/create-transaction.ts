import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export type CreateTransactionParams = {
  store: IDBDatabase;
  type: IDBTransactionMode;
};

export const createTransaction = ({ store, type }: CreateTransactionParams) => {
  return store.transaction(publicRuntimeConfig.STORE_NAME, type).objectStore(publicRuntimeConfig.STORE_NAME);
};
