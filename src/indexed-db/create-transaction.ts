export type CreateTransactionParams = {
  store: IDBDatabase;
  name: 'todos' | 'filters';
  type: IDBTransactionMode;
};

export const createTransaction = ({ store, type, name }: CreateTransactionParams) => {
  return store.transaction(name, type).objectStore(name);
};
