import { memo, useCallback, useContext, useMemo } from 'react';
import Image from 'next/image';
import { TodoStoreActions, TodoStoreContext } from 'components/store-context';
import { FilterWithId } from 'helpers/create-filter';
import classNames from 'classnames';

export type ItemProps = {
  preset: FilterWithId;
};

export const Item = memo(function Item({ preset }: ItemProps) {
  const {
    state: { searchQuery, filter },
    dispatch,
  } = useContext(TodoStoreContext);

  const click = useCallback(() => {
    dispatch({ type: TodoStoreActions.SET_SEARCH_QUERY, payload: preset.searchQuery });
    dispatch({ type: TodoStoreActions.SET_FILTER, payload: preset.filterName });
  }, [dispatch, preset.filterName, preset.searchQuery]);

  const activePreset = useMemo(
    () => preset.searchQuery === searchQuery && preset.filterName === filter,
    [filter, preset.filterName, preset.searchQuery, searchQuery],
  );

  return (
    <div
      className={classNames('grid grid-cols-1fr/auto border-2 transition-colors rounded-md', {
        'border-transparent': !activePreset,
        'border-yellow-400': activePreset,
      })}
    >
      <button className="flex py-2 pl-5 text-left text-sm text-gray-800" aria-label="set preset" onClick={click}>
        {preset.searchQuery} - {preset.filterName}
      </button>

      <button
        className="bg-red-500 px-2 rounded-full flex justify-center items-center my-2 mr-5"
        aria-label="remove preset"
      >
        <Image width="5" height="5" src="/cross.svg" alt="cross sign" />
      </button>
    </div>
  );
});
