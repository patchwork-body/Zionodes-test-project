import { useCallback, useEffect, useState } from "react";
import { createStore, CreateStoreParams } from "store";

export const useStore = ({name, version, init}: CreateStoreParams) => {
  const [loading, setLoading] = useState(false)
  const [store, setStore] = useState<IDBDatabase | null>(null)
  const [error, setError] = useState(null)

  const initStore = useCallback(async () => {
    setLoading(true)

    try {
      setStore(await createStore({name, version, init}))
    }catch(error: any) {
      setError(error)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    initStore()
  }, [])

  return {error, loading, store}
}