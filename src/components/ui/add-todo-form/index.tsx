import { StoreContext } from 'components/store-context';
import { memo, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import getConfig from 'next/config';
import { nanoid } from 'nanoid';

const { publicRuntimeConfig } = getConfig();

type FormValues = {
  desc: string;
};

export const AddTodoForm = memo(function AddTodoForm() {
  const { store, loading } = useContext(StoreContext);

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      desc: '',
    },

    mode: 'onChange',
  });

  const submit = useCallback(
    async (values: FormValues) => {
      if (!loading && store) {
        const objectStore = store
          .transaction(publicRuntimeConfig.STORE_NAME, 'readwrite')
          .objectStore(publicRuntimeConfig.STORE_NAME);

        const request = objectStore.add({ id: nanoid(), desc: values.desc });

        request.onsuccess = () => {
          console.log(request.result);
        };
      }
    },
    [loading, store],
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="text" {...register('desc', { required: true, maxLength: 20, minLength: 5 })} />
    </form>
  );
});
