import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export type CreateTransactionParams = {
  store: IDBDatabase;
  databaseName: string;
};

export const createRWTransaction = ({ store }: CreateTransactionParams) => {
  return store.transaction(publicRuntimeConfig.STORE_NAME, 'readwrite').objectStore(publicRuntimeConfig.STORE_NAME);
};
