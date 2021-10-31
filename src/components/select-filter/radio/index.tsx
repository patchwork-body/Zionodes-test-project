import { Filters, TodoStoreActions, TodoStoreContext } from 'contexts/todo-store-context';
import { memo, useCallback, useContext } from 'react';

export type RadioProps = {
  value: Filters;
  label: string;
};

export const Radio = memo(function Radio({ value, label }: RadioProps) {
  const {
    state: { filter },
    dispatch,
  } = useContext(TodoStoreContext);

  const click = useCallback(() => {
    dispatch({ type: TodoStoreActions.SET_FILTER, payload: value });
    sessionStorage.setItem('filter', value);
  }, [dispatch, value]);

  return (
    <label className="grid grid-cols-auto/1fr items-center gap-x-2 text-xs text-gray-900 hover:text-yellow-500 focus-within:text-yellow-500">
      <input onChange={click} type="radio" name="filter" value={value} checked={value === filter} />
      {label}
    </label>
  );
});
