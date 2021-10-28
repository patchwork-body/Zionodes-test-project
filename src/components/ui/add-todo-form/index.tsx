import { memo, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRWTransaction } from 'hooks/use-rw-transaction';
import { createTodo, Todo } from 'helpers/create-todo';
import { ReducerActions, StoreContext } from 'components/store-context';

type FormValues = {
  desc: string;
};

export const AddTodoForm = memo(function AddTodoForm() {
  const { dispatch } = useContext(StoreContext);
  const { add } = useRWTransaction<Partial<Todo>>();

  const { register, handleSubmit, reset, formState } = useForm<FormValues>({
    defaultValues: {
      desc: '',
    },

    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
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
          return;
        }

        throw error;
      }
    },
    [add, dispatch, reset],
  );

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input type="text" {...register('desc', { required: true, maxLength: 20, minLength: 5 })} />
      {formState.errors.desc && (
        <p>
          {formState.errors.desc.type === 'required' && 'Todo desc is Required field'}
          {formState.errors.desc.type === 'minLength' && 'Todo desc too short, must be at least 5 chars long'}
          {formState.errors.desc.type === 'maxLength' && 'Todo desc too long, must not be longer than 20 chars'}
        </p>
      )}
    </form>
  );
});
