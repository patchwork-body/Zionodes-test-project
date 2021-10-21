import { useStore } from 'hooks/use-store'
import {createContext, memo, ReactNode} from 'react'
import { CreateStoreParams } from 'store'

export type StoreContextValue = {
  store: IDBDatabase | null
}

export const StoreContext = createContext<StoreContextValue>({
  store: null
})

export type StoreContextProviderProps = {
  children: ReactNode
} & CreateStoreParams

export const StoreContextProvider = memo(function StoreContextProvider({
  name, version, init, children
}: StoreContextProviderProps) {
  const {store} = useStore({name, version, init})

  return <StoreContext.Provider value={{store}}>
    {children}
  </StoreContext.Provider>
})
