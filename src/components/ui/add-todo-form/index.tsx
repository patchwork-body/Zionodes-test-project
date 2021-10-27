import { memo, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRWTransaction } from 'hooks/use-rw-transaction';
import { createTodo } from 'helpers/create-todo';
import { ReducerActions, StoreContext } from 'components/store-context';

type FormValues = {
  desc: string;
};

export const AddTodoForm = memo(function AddTodoForm() {
  const { dispatch } = useContext(StoreContext);
  const { add } = useRWTransaction();

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      desc: '',
    },

    mode: 'onChange',
  });

  const submit = useCallback(
    async ({ desc }: FormValues) => {
      try {
        const todo = createTodo(desc);
        await add(todo);
        dispatch({ type: ReducerActions.ADD_TODO, payload: todo });
        reset();
      } catch (error) {
        if (error instanceof DOMException) {
          console.error(error);
        }

        throw error;
      }
    },
    [add, dispatch, reset],
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="text" {...register('desc', { required: true, maxLength: 20, minLength: 5 })} />
    </form>
  );
});
