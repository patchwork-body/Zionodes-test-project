import { memo, useContext, useEffect } from 'react';
import type { Todo } from 'helpers/create-todo';
import { TodoItem } from 'components/todo-item';
import { useROTransaction } from 'hooks/use-ro-transaction';
import { TodoStoreActions, TodoStoreContext } from 'components/store-context';

export type TodoListProps = {
  parent: string;
};

export const TodoList = memo(function TodoList({ parent }: TodoListProps) {
  const {
    state: { todos, searchQuery },
    dispatch,
  } = useContext(TodoStoreContext);

  const { getAll } = useROTransaction<Todo>();

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
        .map(todo => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
    </ul>
  );
});
