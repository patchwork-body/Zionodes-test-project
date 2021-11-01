import { memo, useCallback, useState, KeyboardEvent, useContext, DragEvent } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { Todo } from 'helpers/create-todo';
import { useRWTransaction } from 'hooks/use-rw-transaction';
import { TodoStoreActions, TodoStoreContext } from 'contexts/todo-store-context';
import { TodoForm } from 'components/todo-form';
import { TodoList } from 'components/todo-list';
import { RemoveButton } from 'components/remove-button';

export type TodoItemProps = {
  todo: Todo;
};

type FormValues = {
  desc: string;
  completed: boolean;
};

export const TodoItem = memo(function Todo({ todo }: TodoItemProps) {
  const { put, remove } = useRWTransaction<Todo>('todos');
  const [readOnly, setReadOnly] = useState(true);
  const [draggable, setDraggable] = useState(false);
  const [isSubTodosShown, setIsSubTodosShown] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const {
    state: { draggableTodo, todos },
    dispatch,
  } = useContext(TodoStoreContext);

  const { register, getValues, watch } = useForm<FormValues>({
    defaultValues: {
      desc: todo.desc,
      completed: todo.completed,
    },
  });

  const startEditing = useCallback(() => {
    setReadOnly(false);
  }, []);

  const toggleReadOnlyOnPressEnter = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setReadOnly(previous => !previous);
    }
  }, []);

  const saveChanges = useCallback(() => {
    const nextTodo = { ...todo, desc: getValues('desc') };
    setReadOnly(true);
    put(nextTodo);
    dispatch({ type: TodoStoreActions.UPDATE_TODO, payload: nextTodo });
  }, [dispatch, getValues, put, todo]);

  const deleteTodo = useCallback(() => {
    remove(todo.id);
    dispatch({ type: TodoStoreActions.REMOVE_TODO, payload: { parent: todo.parent, self: todo.id } });
  }, [dispatch, remove, todo.id, todo.parent]);

  const toggleCheckbox = useCallback(() => {
    const nextTodo = { ...todo, completed: !getValues('completed') };
    put(nextTodo);
    dispatch({ type: TodoStoreActions.UPDATE_TODO, payload: nextTodo });
  }, [dispatch, getValues, put, todo]);

  const startDragging = useCallback(() => {
    dispatch({ type: TodoStoreActions.SET_DRAGGABLE_TODO, payload: todo });
  }, [dispatch, todo]);

  const endDragging = useCallback(() => {
    dispatch({ type: TodoStoreActions.SET_DRAGGABLE_TODO, payload: null });
  }, [dispatch]);

  const dragEnter = useCallback((event: DragEvent<HTMLLIElement>) => {
    event.preventDefault();
  }, []);

  const dragOver = useCallback((event: DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setIsDraggedOver(true);
  }, []);

  const dragLeave = useCallback((event: DragEvent<HTMLLIElement>) => {
    event.preventDefault();
    setIsDraggedOver(false);
  }, []);

  const drop = useCallback(
    async (event: DragEvent<HTMLLIElement>) => {
      event.preventDefault();

      if (draggableTodo && todo.order !== draggableTodo.order && todo.parent === draggableTodo.parent) {
        const currentTodo = { ...draggableTodo, order: todo.order };
        const targetTodo = { ...todo, order: draggableTodo.order };
        await put(currentTodo);
        await put(targetTodo);
        dispatch({ type: TodoStoreActions.UPDATE_TODO, payload: currentTodo });
        dispatch({ type: TodoStoreActions.UPDATE_TODO, payload: targetTodo });
      }

      setIsDraggedOver(false);
    },

    [dispatch, draggableTodo, put, todo],
  );

  const toggleSubTodos = useCallback(() => {
    setIsSubTodosShown(previous => !previous);
  }, []);

  return (
    <li
      className={classNames('grid grid-flow-row items-center gap-y-3 bg-gray-100 rounded-md p-2 border border-dashed', {
        'border-transparent': !isDraggedOver,
        'border-gray-700': isDraggedOver,
      })}
      draggable={draggable}
      onDragStartCapture={startDragging}
      onDragEndCapture={endDragging}
      onDragEnterCapture={dragEnter}
      onDragOverCapture={dragOver}
      onDragLeaveCapture={dragLeave}
      onDropCapture={drop}
    >
      <div className="grid grid-flow-col gap-x-2 items-center">
        <div className="justify-self-center w-10">
          <span className="truncate">{todos[todo.id]?.length || ''}</span>
          <button
            className={classNames('ml-2 transform transition-transform', {
              'rotate-0': !isSubTodosShown,
              'rotate-90': isSubTodosShown,
            })}
            onClick={toggleSubTodos}
          >
            <span>&gt;</span>
          </button>
        </div>

        <div className="relative grid place-content-center">
          <input
            className={classNames(
              'outline-none appearance-none border hover:border-4 focus:border-4 border-yellow-300 rounded-full w-5 h-5 transition-colors',
              { 'bg-yellow-300': watch('completed') },
            )}
            type="checkbox"
            {...register('completed', { onChange: toggleCheckbox })}
          />

          <span
            className={classNames(
              'absolute inset-0 grid place-content-center opacity-0 transition-opacity pointer-events-none',
              {
                'opacity-0': !watch('completed'),
                'opacity-100': watch('completed'),
              },
            )}
          >
            <Image width="7" height="7" src="/check.svg" alt="checkmark" />
          </span>
        </div>

        <input
          className={classNames(
            'p-2 w-full outline-none border border-transparent rounded-md transition-colors bg-gray-100',
            { 'line-through text-gray-500': watch('completed') },
            {
              'hover:border-gray-500 focus:border-gray-500': readOnly,
              'border-blue-400': !readOnly,
            },
          )}
          type="text"
          {...register('desc', { required: true, minLength: 5, maxLength: 20 })}
          onDoubleClick={startEditing}
          onKeyPress={toggleReadOnlyOnPressEnter}
          onBlur={saveChanges}
          readOnly={readOnly}
        />

        <RemoveButton click={deleteTodo} />

        <Image
          className="cursor-grab"
          draggable={false}
          onMouseEnter={() => setDraggable(true)}
          onMouseLeave={() => setDraggable(false)}
          width="15"
          height="15"
          src="/drag.svg"
          alt="drag indicator"
        />
      </div>

      {isSubTodosShown && (
        <div className="grid grid-flow-row pl-10 gap-y-3">
          <TodoForm parent={todo.id} />
          <TodoList parent={todo.id} />
        </div>
      )}
    </li>
  );
});
