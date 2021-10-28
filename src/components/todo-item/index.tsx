import { memo, useCallback, useState, KeyboardEvent, useContext, DragEvent } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { Todo } from 'helpers/create-todo';
import { useRWTransaction } from 'hooks/use-rw-transaction';
import { TodoStoreActions, TodoStoreContext } from 'components/store-context';
import { TodoForm } from 'components/todo-form';
import { TodoList } from 'components/todo-list';

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
  const [draggable, setDraggable] = useState(false);
  const [isSubTodosShown, setIsSubTodosShown] = useState(false);

  const {
    state: { draggableTodo },
    dispatch,
  } = useContext(TodoStoreContext);

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
    dispatch({ type: TodoStoreActions.REMOVE_TODO, payload: { parent: todo.parent, self: todo.id } });
  }, [dispatch, remove, todo.id, todo.parent]);

  const toggleCheckbox = useCallback(() => {
    put({ ...todo, completed: !getValues('completed') });
  }, [getValues, put, todo]);

  const startDragging = useCallback(() => {
    dispatch({ type: TodoStoreActions.SET_DRAGGABLE_TODO, payload: todo });
  }, [dispatch, todo]);

  const endDragging = useCallback(() => {
    dispatch({ type: TodoStoreActions.SET_DRAGGABLE_TODO, payload: null });
  }, [dispatch]);

  const dragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const dragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const dragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const drop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (draggableTodo && todo.order !== draggableTodo.order) {
        const currentTodo = { ...draggableTodo, order: todo.order };
        const targetTodo = { ...todo, order: draggableTodo.order };
        await put(currentTodo);
        await put(targetTodo);
        dispatch({ type: TodoStoreActions.UPDATE_TODO, payload: currentTodo });
        dispatch({ type: TodoStoreActions.UPDATE_TODO, payload: targetTodo });
      }
    },

    [dispatch, draggableTodo, put, todo],
  );

  const toggleSubTodos = useCallback(() => {
    setIsSubTodosShown(previous => !previous);
  }, []);

  return (
    <div
      draggable={draggable}
      onDragStart={startDragging}
      onDragEnd={endDragging}
      onDragEnter={dragEnter}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDrop={drop}
    >
      <button onClick={toggleSubTodos}>&gt;</button>

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

      <Image
        draggable={false}
        onMouseEnter={() => setDraggable(true)}
        onMouseLeave={() => setDraggable(false)}
        width="10"
        height="10"
        src="/drag.svg"
        alt="cross"
      />

      {isSubTodosShown && (
        <div>
          <TodoForm parent={todo.id} />
          <TodoList parent={todo.id} />
        </div>
      )}
    </div>
  );
});
