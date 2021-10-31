import { memo, useContext, useEffect } from 'react';
import type { Todo } from 'helpers/create-todo';
import { TodoItem } from 'components/todo-item';
import { useROTransaction } from 'hooks/use-ro-transaction';
import { Filters, TodoStoreActions, TodoStoreContext } from 'contexts/todo-store-context';

export type TodoListProps = {
  parent: string;
};

export const TodoList = memo(function TodoList({ parent }: TodoListProps) {
  const {
    state: { todos, searchQuery, filter },
    dispatch,
  } = useContext(TodoStoreContext);

  const { getAll } = useROTransaction<Todo>('todos');

  useEffect(() => {
    getAll(parent)
      .then((todos = []) => {
        dispatch({ type: TodoStoreActions.INIT_TODOS, payload: { parent, todos } });
      })
      .catch(console.error);
  }, [dispatch, getAll, parent]);

  return (
    <ul className="grid grid-flow-row gap-y-3 w-full max-w-xl justify-self-center ">
      {(todos[parent] ?? [])
        .filter(({ desc }: Todo) => desc.includes(searchQuery))
        .filter(({ completed }: Todo) => {
          switch (filter) {
            case Filters.Completed:
              return completed;

            case Filters.NotCompleted:
              return !completed;

            default:
              return true;
          }
        })
        .map(todo => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
    </ul>
  );
});
