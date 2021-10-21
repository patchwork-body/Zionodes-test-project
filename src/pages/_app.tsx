import { StoreContextProvider } from 'components/StoreContext'
import type { AppProps } from 'next/app'
import { useCallback } from 'react'

function App({ Component, pageProps }: AppProps) {
  const init = useCallback((dbInstance: IDBDatabase) => {
    dbInstance.createObjectStore('todos', {keyPath: 'id'})
  }, [])

  return <StoreContextProvider name="todoList" version={1} init={init}>
    <Component {...pageProps} />
  </StoreContextProvider>
}

export default App
