import type { AppProps } from 'next/app';
import { useCallback } from 'react';
import { StoreContextProvider } from 'components/store-context';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function App({ Component, pageProps }: AppProps) {
  const init = useCallback((dbInstance: IDBDatabase) => {
    dbInstance.createObjectStore(publicRuntimeConfig.STORE_NAME, { keyPath: 'id' });
  }, []);

  return (
    <StoreContextProvider init={init}>
      <Component {...pageProps} />
    </StoreContextProvider>
  );
}

export default App;
