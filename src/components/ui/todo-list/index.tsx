import { memo, useContext, useEffect } from 'react';
import { useROTransaction } from 'hooks/use-ro-transaction';
import type { Todo } from 'helpers/create-todo';
import { ReducerActions, StoreContext } from 'components/store-context';
import { TodoItem } from 'components/ui/todo-item';

export const TodoList = memo(function TodoList() {
  const { state, dispatch } = useContext(StoreContext);
  const { getAll } = useROTransaction<Todo>();

  useEffect(() => {
    getAll().then(todos => {
      dispatch({ type: ReducerActions.INIT_TODOS, payload: todos });
    });
  }, [dispatch, getAll]);

  return (
    <ul>
      {state.todos.map(todo => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
});
