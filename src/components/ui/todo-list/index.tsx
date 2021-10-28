import { memo, useContext, useEffect } from 'react';
import { useROTransaction } from 'hooks/use-ro-transaction';
import type { Todo } from 'helpers/create-todo';
import { TodoStoreActions, TodoStoreContext } from 'components/store-context';
import { TodoItem } from 'components/ui/todo-item';

export const TodoList = memo(function TodoList() {
  const { state, dispatch } = useContext(TodoStoreContext);
  const { getAll } = useROTransaction<Todo>();

  useEffect(() => {
    getAll().then(todos => {
      dispatch({ type: TodoStoreActions.INIT_TODOS, payload: todos });
    });
  }, [dispatch, getAll]);

  return (
    <ul>
      {state.todos.map(todo => (
        <li key={todo.key}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
});
