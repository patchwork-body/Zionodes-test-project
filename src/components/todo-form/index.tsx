import { TodoStoreActions, TodoStoreContext } from 'components/store-context';
import { createTodo, Todo } from 'helpers/create-todo';
import { useRWTransaction } from 'hooks/use-rw-transaction';
import { memo, useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';

type FormValues = {
  desc: string;
};

export type TodoFormProps = {
  parent: string;
};

export const TodoForm = memo(function TodoForm({ parent }: TodoFormProps) {
  const {
    state: { todos },
    dispatch,
  } = useContext(TodoStoreContext);

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
      const targetTodos = todos[parent];
      const nextOrder = (targetTodos[targetTodos.length - 1]?.order ?? 0) + 1;
      const todo = createTodo({ desc, order: nextOrder, parent });

      await add(todo);
      dispatch({ type: TodoStoreActions.ADD_TODO, payload: { parent, todo } });

      reset();
    },

    [add, dispatch, parent, reset, todos],
  );

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
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
