import { memo, useContext, useEffect } from 'react';
import { Filters, TodoStoreActions, TodoStoreContext } from 'contexts/todo-store-context';
import { Radio } from './radio';

export const SelectFilter = memo(function SelectFilter() {
  const { dispatch } = useContext(TodoStoreContext);

  useEffect(() => {
    const savedValue = sessionStorage.getItem('filter');
    if (savedValue) {
      dispatch({ type: TodoStoreActions.SET_FILTER, payload: savedValue });
    }
  }, [dispatch]);

  return (
    <div className="grid grid-flow-row items-center gap-y-1">
      <span className="text-sm text-gray-500">Filters:</span>

      <div className="grid grid-flow-col self-start">
        <Radio value={Filters.All} label="Show All" />
        <Radio value={Filters.Completed} label="Show Completed" />
        <Radio value={Filters.NotCompleted} label="Show Not Completed" />
      </div>
    </div>
  );
});
