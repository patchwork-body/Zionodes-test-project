import { createContext, memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { createStore, CreateStoreParams } from 'store';
import getConfig from 'next/config';
import { nanoid } from 'nanoid';

const { publicRuntimeConfig } = getConfig();
const DB_NAME_SESSION_STORAGE_KEY = 'databaseName';

export type StoreContextValue = {
  loading: boolean;
  error: DOMException | null;
  store: IDBDatabase | null;
};

export const StoreContext = createContext<StoreContextValue>({
  loading: true,
  error: null,
  store: null,
});

export type StoreContextProviderProps = {
  init: CreateStoreParams['init'];
  children: ReactNode;
};

export const StoreContextProvider = memo(function StoreContextProvider({ init, children }: StoreContextProviderProps) {
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState<IDBDatabase | null>(null);
  const [error, setError] = useState<DOMException | null>(null);

  const initStore = useCallback(
    async (databaseName: string | null) => {
      setLoading(true);

      try {
        setStore(await createStore({ name: databaseName ?? nanoid(), version: publicRuntimeConfig.DB_VERSION, init }));
      } catch (error) {
        if (error instanceof DOMException) {
          setError(error);
        } else {
          throw error;
        }
      }

      setLoading(false);
    },
    [init],
  );

  useEffect(() => {
    initStore(sessionStorage.getItem(DB_NAME_SESSION_STORAGE_KEY));
  }, [initStore]);

  return <StoreContext.Provider value={{ loading, error, store }}>{children}</StoreContext.Provider>;
});
