import { Todo } from 'helpers/create-todo';
import { useRWTransaction } from 'hooks/use-rw-transaction';
import { memo, useCallback, useState, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';

export type TodoItemProps = {
  todo: Todo;
};

type FormValues = {
  desc: string;
};

export const TodoItem = memo(function Todo({ todo }: TodoItemProps) {
  const { put } = useRWTransaction<Todo>();
  const [readOnly, setReadOnly] = useState(true);

  const { register, getValues } = useForm<FormValues>({
    defaultValues: {
      desc: todo.desc,
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

  return (
    <div>
      <input
        type="text"
        {...register('desc', { required: true, minLength: 5, maxLength: 20 })}
        onDoubleClick={startEditing}
        onKeyPress={startEditingByPressEnter}
        onBlur={saveChanges}
        readOnly={readOnly}
      />
    </div>
  );
});
