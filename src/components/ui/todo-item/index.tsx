import { Todo } from 'helpers/create-todo';
import Image from 'next/image';
import { useRWTransaction } from 'hooks/use-rw-transaction';
import { memo, useCallback, useState, KeyboardEvent, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ReducerActions, StoreContext } from 'components/store-context';

export type TodoItemProps = {
  todo: Todo;
};

type FormValues = {
  desc: string;
  completed: boolean;
};

export const TodoItem = memo(function Todo({ todo }: TodoItemProps) {
  const { put, remove } = useRWTransaction<Todo>();
  const [readOnly, setReadOnly] = useState(true);
  const { dispatch } = useContext(StoreContext);

  const { register, getValues } = useForm<FormValues>({
    defaultValues: {
      desc: todo.desc,
      completed: todo.completed,
    },
  });

  const startEditing = useCallback(() => {
    setReadOnly(false);
  }, []);

  const startEditingByPressEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        startEditing();
      }
    },
    [startEditing],
  );

  const saveChanges = useCallback(() => {
    setReadOnly(true);
    put({ ...todo, desc: getValues('desc') });
  }, [getValues, put, todo]);

  const deleteTodo = useCallback(() => {
    remove(todo.id);
    dispatch({ type: ReducerActions.REMOVE_TODO, payload: todo.id });
  }, [dispatch, remove, todo.id]);

  const toggleCheckbox = useCallback(() => {
    put({ ...todo, completed: !getValues('completed') });
  }, [getValues, put, todo]);

  return (
    <div>
      <input type="checkbox" {...register('completed', { onChange: toggleCheckbox })} />

      <input
        type="text"
        {...register('desc', { required: true, minLength: 5, maxLength: 20 })}
        onDoubleClick={startEditing}
        onKeyPress={startEditingByPressEnter}
        onBlur={saveChanges}
        readOnly={readOnly}
      />

      <button onClick={deleteTodo} aria-label="delete todo">
        <Image width="5" height="5" src="/cross.svg" alt="cross" />
      </button>
    </div>
  );
});
