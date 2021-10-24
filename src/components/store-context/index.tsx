import { createContext, memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { createStore, CreateStoreParams } from 'store';
import getConfig from 'next/config';
import { nanoid } from 'nanoid';

const { publicRuntimeConfig } = getConfig();
const DB_NAME_SESSION_STORAGE_KEY = 'databaseName';

export type StoreContextValue = {
  store: IDBDatabase;
};

export const StoreContext = createContext<StoreContextValue>({
  store: {} as IDBDatabase,
});

export type StoreContextProviderProps = {
  init: CreateStoreParams['init'];
  children: ReactNode;
};

export const StoreContextProvider = memo(function StoreContextProvider({ init, children }: StoreContextProviderProps) {
  const [store, setStore] = useState<IDBDatabase | null>(null);
  const [error, setError] = useState<DOMException | null>(null);

  const initStore = useCallback(
    async (databaseName: string | null) => {
      try {
        setStore(await createStore({ name: databaseName ?? nanoid(), version: publicRuntimeConfig.DB_VERSION, init }));
      } catch (error) {
        if (error instanceof DOMException) {
          setError(error);
        } else {
          throw error;
        }
      }
    },
    [init],
  );

  useEffect(() => {
    initStore(sessionStorage.getItem(DB_NAME_SESSION_STORAGE_KEY));
  }, [initStore]);

  if (!store) {
    return null;
  }

  if (error) {
    console.error(error);
    return <p>{error.message}</p>;
  }

  return <StoreContext.Provider value={{ store }}>{children}</StoreContext.Provider>;
});
