import type { AppProps } from 'next/app';
import { useCallback } from 'react';
import { IndexedDBContextProvider } from 'components/indexed-db-context';
import getConfig from 'next/config';
import { TodoStoreContextProvider } from 'components/store-context';

const { publicRuntimeConfig } = getConfig();

function App({ Component, pageProps }: AppProps) {
  const init = useCallback((dbInstance: IDBDatabase) => {
    dbInstance.createObjectStore(publicRuntimeConfig.STORE_NAME, { keyPath: 'id', autoIncrement: true });
  }, []);

  return (
    <IndexedDBContextProvider init={init}>
      <TodoStoreContextProvider>
        <Component {...pageProps} />
      </TodoStoreContextProvider>
    </IndexedDBContextProvider>
  );
}

export default App;
