import { memo, useContext, useEffect } from 'react';
import { useROTransaction } from 'hooks/use-ro-transaction';
import type { Todo } from 'helpers/create-todo';
import { TodoStoreActions, TodoStoreContext } from 'components/store-context';
import { TodoList } from 'components/ui/todo-list';

export const RootTodoList = memo(function RootTodoList() {
  const {
    state: { todos },
    dispatch,
  } = useContext(TodoStoreContext);
  const { getAll } = useROTransaction<Todo>();

  useEffect(() => {
    getAll()
      .then(todos => {
        dispatch({ type: TodoStoreActions.INIT_TODOS, payload: todos });
      })
      .catch(console.error);
  }, [dispatch, getAll]);

  return <TodoList todos={todos} />;
});
