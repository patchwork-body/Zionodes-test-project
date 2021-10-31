import { TodoStoreActions, TodoStoreContext } from 'components/store-context';
import { ChangeEvent, memo, useCallback, useContext, useEffect } from 'react';

const SESSION_STORAGE_KEY = 'searchQuery';

export const Search = memo(function Search() {
  const {
    state: { searchQuery },
    dispatch,
  } = useContext(TodoStoreContext);

  const search = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      sessionStorage.setItem(SESSION_STORAGE_KEY, value);
      dispatch({ type: TodoStoreActions.SET_SEARCH_QUERY, payload: value });
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch({ type: TodoStoreActions.SET_SEARCH_QUERY, payload: sessionStorage.getItem(SESSION_STORAGE_KEY) ?? '' });
  }, [dispatch]);

  return (
    <div className="w-full">
      <label className="text-sm text-gray-500">
        Search:
        <input
          value={searchQuery}
          onChange={search}
          className="w-full p-2 border border-gray-700 focus:border-blue-400 rounded-md outline-none"
          type="search"
        />
      </label>
    </div>
  );
});
