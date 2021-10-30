import classNames from 'classnames';
import { TodoStoreContext } from 'components/store-context';
import { createFilter, Filter } from 'helpers/create-filter';
import { useRWTransaction } from 'hooks/use-rw-transaction';
import { memo, useCallback, useContext } from 'react';

export const SaveFilterPreset = memo(function SaveFilterPreset() {
  const {
    state: { filter, searchQuery },
  } = useContext(TodoStoreContext);
  const { add } = useRWTransaction<Filter>('filters');

  const click = useCallback(async () => {
    if (searchQuery) {
      console.log(searchQuery);
      await add(createFilter({ filterName: filter, searchQuery }));
    }
  }, [add, filter, searchQuery]);

  return (
    <button
      aria-label="save filter"
      className={classNames(
        'flex items-center self-end border border-gray-700 hover:border-blue-400',
        'focus:border-blue-400 bg-white px-7 py-5 h-10 rounded-md text-sm text-gray-800',
      )}
      onClick={click}
    >
      save
    </button>
  );
});
