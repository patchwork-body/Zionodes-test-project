import { memo, useCallback, useContext, useMemo } from 'react';
import { TodoStoreActions, TodoStoreContext, Filters } from 'contexts/todo-store-context';
import { FilterWithId } from 'helpers/create-filter';
import classNames from 'classnames';
import { RemoveButton } from 'components/remove-button';
import { useRWTransaction } from 'hooks/use-rw-transaction';
import { FilterPresetStoreActions, FilterPresetStoreContext } from 'contexts/filter-preset-context';

export type ItemProps = {
  preset: FilterWithId;
};

export const Item = memo(function Item({ preset }: ItemProps) {
  const {
    state: { searchQuery, filter },
    dispatch,
  } = useContext(TodoStoreContext);
  const { dispatch: filterDispatch } = useContext(FilterPresetStoreContext);

  const { remove } = useRWTransaction('filters');

  const activatePreset = useCallback(() => {
    dispatch({ type: TodoStoreActions.SET_SEARCH_QUERY, payload: preset.searchQuery });
    dispatch({ type: TodoStoreActions.SET_FILTER, payload: preset.filterName });
  }, [dispatch, preset.filterName, preset.searchQuery]);

  const removePreset = useCallback(async () => {
    await remove(preset.id);
    filterDispatch({ type: FilterPresetStoreActions.REMOVE_FILTER_PRESET, payload: preset.id });
    dispatch({ type: TodoStoreActions.SET_SEARCH_QUERY, payload: '' });
    dispatch({ type: TodoStoreActions.SET_FILTER, payload: Filters.All });
  }, [dispatch, filterDispatch, preset.id, remove]);

  const activePreset = useMemo(
    () => preset.searchQuery === searchQuery && preset.filterName === filter,
    [filter, preset.filterName, preset.searchQuery, searchQuery],
  );

  return (
    <div
      className={classNames('grid grid-cols-1fr/auto border-2 transition-colors items-center rounded-md pr-5', {
        'border-transparent': !activePreset,
        'border-yellow-400': activePreset,
      })}
    >
      <button
        className="flex py-2 pl-5 text-left text-xs sm:text-sm text-gray-800"
        aria-label="set preset"
        onClick={activatePreset}
      >
        <span>
          <span className="text-gray-500">Search: </span>&nbsp;
          <span>{preset.searchQuery}</span>&nbsp;
        </span>

        <span className="ml-5">
          <span className="text-gray-500">Filter:</span>&nbsp;
          <span>
            {preset.filterName === Filters.All
              ? 'Show All'
              : preset.filterName === Filters.Completed
              ? 'Show Completed'
              : 'Show Not Completed'}
          </span>
          &nbsp;
        </span>
      </button>

      <RemoveButton click={removePreset} />
    </div>
  );
});
