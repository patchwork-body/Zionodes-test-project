import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useRWTransaction } from 'hooks/use-rw-transaction';
import { createTodo } from 'helpers/create-todo';

type FormValues = {
  desc: string;
};

export const AddTodoForm = memo(function AddTodoForm() {
  const { add } = useRWTransaction();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      desc: '',
    },

    mode: 'onChange',
  });

  const submit = useCallback(
    async ({ desc }: FormValues) => {
      try {
        await add(createTodo(desc));
      } catch (error) {
        if (error instanceof DOMException) {
          console.error(error);
        }

        throw error;
      }
    },
    [add],
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="text" {...register('desc', { required: true, maxLength: 20, minLength: 5 })} />
    </form>
  );
});
