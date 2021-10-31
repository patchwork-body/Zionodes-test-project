import { FormEvent, memo, useCallback, useEffect, useState } from 'react';

const SESSION_STORAGE_KEY = 'workspaceName';
const DEFAULT_VALUE = 'Enter Your Workspace Name';

export const WorkspaceName = memo(function WorkspaceName() {
  const [value, setValue] = useState('');

  const input = useCallback((event: FormEvent<HTMLInputElement>) => {
    const nextValue = event.currentTarget.value;
    document.title = nextValue;
    sessionStorage.setItem(SESSION_STORAGE_KEY, nextValue);
    setValue(nextValue);
  }, []);

  const restore = useCallback(() => {
    setValue(DEFAULT_VALUE);
  }, []);

  useEffect(() => {
    const defaultValue = sessionStorage.getItem(SESSION_STORAGE_KEY) || DEFAULT_VALUE;
    document.title = defaultValue;
    setValue(defaultValue);
  }, []);

  return (
    <div className="min-w-max mb-7">
      <label className="text-gray-500 font-semibold grid text-center uppercase text-xl">
        Workspace Name
        <input
          onInput={input}
          onBlur={restore}
          className="text-center text-gray-800 outline-none border-2 border-transparent focus:border-blue-400 hover:border-blue-400 rounded-md p-2 w-full font-bold text-xl"
          type="text"
          value={value}
        />
      </label>
    </div>
  );
});
