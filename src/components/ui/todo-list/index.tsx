import { memo, useContext, useEffect } from 'react';
import { useROTransaction } from 'hooks/use-ro-transaction';
import type { Todo } from 'helpers/create-todo';
import { ReducerActions, StoreContext } from 'components/store-context';

export const TodoList = memo(function TodoList() {
  const { state, dispatch } = useContext(StoreContext);
  const { getAll } = useROTransaction();

  useEffect(() => {
    getAll().then((todos: Todo[]) => {
      todos.sort((left, right) => Number(new Date(left.createdAt)) - Number(new Date(right.createdAt)));
      dispatch({ type: ReducerActions.INIT_TODOS, payload: todos });
    });
  }, [dispatch, getAll]);

  return (
    <ul>
      {state.todos.map(todo => (
        <li key={todo.id}>
          {todo.createdAt} - {todo.desc}
        </li>
      ))}
    </ul>
  );
});
