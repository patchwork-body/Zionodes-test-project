import { FilterPresetStoreActions, FilterPresetStoreContext } from 'contexts/filter-preset-context';
import { FilterWithId } from 'helpers/create-filter';
import { useROTransaction } from 'hooks/use-ro-transaction';
import { memo, useContext, useEffect } from 'react';
import { Item } from './item';

export const FilterPresetList = memo(function FilterPresetList() {
  const { state: presets, dispatch } = useContext(FilterPresetStoreContext);
  const { getAll } = useROTransaction<FilterWithId>('filters');

  useEffect(() => {
    getAll()
      .then((presets = []) => {
        dispatch({ type: FilterPresetStoreActions.INIT_FILTER_PRESET, payload: presets });
      })
      .catch(console.error);
  }, [dispatch, getAll]);

  return (
    <ul className="grid grid-flow-row gap-y-2">
      {presets.map(preset => (
        <li className="bg-gray-100 rounded-md" key={preset.id}>
          <Item preset={preset} />
        </li>
      ))}
    </ul>
  );
});
