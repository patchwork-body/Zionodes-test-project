import { FormEvent, memo, useCallback, useEffect, useState } from 'react';

const SESSION_STORAGE_KEY = 'workspaceName';

export const WorkspaceName = memo(function WorkspaceName() {
  const [value, setValue] = useState('');

  const input = useCallback((event: FormEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    sessionStorage.setItem(SESSION_STORAGE_KEY, nextValue);
    setValue(nextValue);
  }, []);

  useEffect(() => {
    const defaultValue = sessionStorage.getItem(SESSION_STORAGE_KEY) || 'Enter Your Workspace Name';
    setValue(defaultValue);
  }, []);

  return (
    <div className="min-w-max mb-7">
      <label className="text-gray-500 font-semibold grid text-center uppercase text-xl">
        Workspace Name
        <input
          onInput={input}
          className="text-center text-gray-800 outline-none border-2 border-transparent focus:border-blue-400 hover:border-blue-400 rounded-md p-2 w-full font-bold text-xl"
          type="text"
          value={value}
        />
      </label>
    </div>
  );
});
