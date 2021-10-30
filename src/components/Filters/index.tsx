import { memo, useContext, useEffect } from 'react';
import { Filters as FiltersEnum, TodoStoreActions, TodoStoreContext } from 'components/store-context';
import { Radio } from './radio';

export const Filters = memo(function Filters() {
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
        <Radio value={FiltersEnum.All} label="Show All" />
        <Radio value={FiltersEnum.Completed} label="Show Completed" />
        <Radio value={FiltersEnum.NotCompleted} label="Show Not Completed" />
      </div>
    </div>
  );
});
