import { FilterWithId } from 'helpers/create-filter';
import { useROTransaction } from 'hooks/use-ro-transaction';
import { memo, useEffect, useState } from 'react';
import { Item } from './item';

export const FilterPresetList = memo(function FilterPresetList() {
  const [presets, setPresets] = useState<FilterWithId[]>([]);
  const { getAll } = useROTransaction<FilterWithId>('filters');

  useEffect(() => {
    getAll()
      .then((presets = []) => {
        setPresets(presets);
      })
      .catch(console.error);
  });

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
